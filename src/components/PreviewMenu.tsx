import { useEffect, useState } from "react";
import { Field, MenuCategory, StyleFormType } from "../data/types";

import FrontMenu from "./FrontMenu";
import BackMenu from "./BackMenu";
import CustomMenu from "./CustomMenu";
import View from "./View";
import CustomCategoriesMenu from "./CustomCategoriesMenu";
import CustomMenuView from "./CustomMenuView";

import "./PreviewMenu.css";

type ModalProps = {
  flatItemsCategories: MenuCategory[];
  setFlatItemsCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  newCustomArray: any[];
  showImagesDeleteButtons: boolean;
  setShowImagesDeleteButtons: (item: boolean) => void;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  view: boolean;
  custom: boolean;
  showJoinInputs: boolean;
  setShowJoinInputs: (item: boolean) => void;
  showColorInputs: boolean;
  showFinalStep: boolean;
  showDecorations: string;
  setShowDecorations: (category: string) => void;
  showDecorationCheckboxes: boolean;
  showCategoryImage: boolean;
  setShowCategoryImage: (item: boolean) => void;
  setShowDecorationCheckboxes: (item: boolean) => void;
  showPaddingCategoriesTop: boolean;
  showMarginCategoriesTop: boolean;
  hidePrices: boolean;
  children: React.ReactNode[];
  showDisclaimer: boolean;
  message: string;
  onConfirm: () => void;
  goBack: () => void;
  dataSample: Record<string, { subtitle?: string; items: Field[] }>;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
  joinedCategories: Record<string, boolean>;
  setJoinedCategories: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

const PreviewMenu = ({
  flatItemsCategories,
  setFlatItemsCategories,
  newCustomArray,
  setView,
  custom,
  showJoinInputs,
  showColorInputs,
  showFinalStep,
  hidePrices,
  showDecorations,
  children,
  showDisclaimer,
  dataSample,
  styleForm,
  showImagesDeleteButtons,
  showDecorationCheckboxes,
  showPaddingCategoriesTop,
  showMarginCategoriesTop,
  setStyleForm,
  joinedCategories,
  setJoinedCategories,
  setShowDecorations,
  setShowDecorationCheckboxes,
  showCategoryImage,
  setShowCategoryImage,
  view,
}: ModalProps) => {
  const [organizedData, setOrganizedData] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});

  const categoryOrder = Object.keys(dataSample).includes("Sharables")
    ? [
        "Sharables",
        "Ain't no thing butta chicken wing...",
        "Salads",
        "Soups",
        "Signature sandwiches",
        "Big bite burgers",
        "Big eats",
        "Sides",
      ]
    : Object.keys(dataSample);

  useEffect(() => {
    const orderedData: Record<string, { subtitle?: string; items: Field[] }> =
      {};
    categoryOrder.forEach((category) => {
      if (dataSample[category]) {
        orderedData[category] = dataSample[category]; // Keep the new structure (subtitle + items)
      }
    });

    // Only set state if orderedData has changed
    if (JSON.stringify(orderedData) !== JSON.stringify(organizedData)) {
      setOrganizedData(orderedData);
    }
  }, [dataSample, categoryOrder, organizedData]); // Include organizedData in dependencies for comparison

  // Split the categories into two parts
  // const firstCategories = categoryOrder.slice(0, 5);
  const extraCategories = categoryOrder.slice(5);

  // Define secondPageData based on categories with data
  const secondPageData: Record<string, { subtitle?: string; items: Field[] }> =
    {};
  extraCategories.forEach((category) => {
    if (organizedData[category]?.items.length > 0) {
      secondPageData[category] = organizedData[category]; // Keep the new structure
    }
  });

  //   const animation = `
  //   @keyframes menuSizeAnimation {
  //     from {
  //       width: 0;
  //       height: 0;
  //     }
  //     to {
  //       width: ${styleForm.menuWidth}mm;
  //       height: 100%;
  //     }
  //   }
  // `;

  if (view && newCustomArray.length) {
    return (
      <CustomMenuView
        flatItemsCategories={flatItemsCategories}
        styleForm={styleForm}
        showDisclaimer={showDisclaimer}
        joinedCategories={joinedCategories}
        hidePrices={hidePrices}
        showDecorations={showDecorations}
        setView={setView}
      />
    );
  }
  if (view && !newCustomArray.length) {
    return (
      <View
        setView={setView}
        categoryOrder={categoryOrder}
        organizedData={organizedData}
        styleForm={styleForm}
        setStyleForm={setStyleForm}
        showColorInputs={showColorInputs}
        showJoinInputs={showJoinInputs}
        showDisclaimer={showDisclaimer}
        joinedCategories={joinedCategories}
        setJoinedCategories={setJoinedCategories}
        hidePrices={hidePrices}
        showDecorations={showDecorations}
        setShowDecorations={setShowDecorations}
        showDecorationCheckboxes={showDecorationCheckboxes}
        setShowDecorationCheckboxes={setShowDecorationCheckboxes}
        showPaddingCategoriesTop={showPaddingCategoriesTop}
        showMarginCategoriesTop={showMarginCategoriesTop}
      />
    );
  }

  if (newCustomArray?.length) {
    return (
      <div className="container-final-step">
        <div
          className={`${
            showFinalStep ? "final-step-show" : "final-step-hidden"
          }`}
          // style={{ animation: "menuSizeAnimation 0.5s linear forwards" }}
        >
          {children[0]} {/* Renders FinalStep*/}
          {Object.keys(secondPageData).length > 0 && !custom && (
            <h3 className="no-print">Menu front</h3>
          )}
          {newCustomArray?.length && (
            <CustomCategoriesMenu
              flatItemsCategories={flatItemsCategories}
              setFlatItemsCategories={setFlatItemsCategories}
              newCustomArray={newCustomArray}
              styleForm={styleForm}
              setStyleForm={setStyleForm}
              showColorInputs={showColorInputs}
              showJoinInputs={showJoinInputs}
              showDisclaimer={showDisclaimer}
              joinedCategories={joinedCategories}
              setJoinedCategories={setJoinedCategories}
              hidePrices={hidePrices}
              showDecorations={showDecorations}
              setShowDecorations={setShowDecorations}
              showDecorationCheckboxes={showDecorationCheckboxes}
              setShowDecorationCheckboxes={setShowDecorationCheckboxes}
              showPaddingCategoriesTop={showPaddingCategoriesTop}
              showMarginCategoriesTop={showMarginCategoriesTop}
              showImagesDeleteButtons={showImagesDeleteButtons}
              showCategoryImage={showCategoryImage}
              setShowCategoryImage={setShowCategoryImage}
              // view={view}
              // setView={setView}
            />
          )}
        </div>
        <div className="tool-section no-print">
          {children[1]} {/* Renders dropdown*/}
          {children[2]} {/* Renders preview tools*/}
        </div>
      </div>
    );
  }

  return (
    // <>
    <div className="container-final-step">
      {/* <style>{animation}</style> */}
      <div
        className={`${showFinalStep ? "final-step-show" : "final-step-hidden"}`}
        // style={{ animation: "menuSizeAnimation 0.5s linear forwards" }}
      >
        {children[0]} {/* Renders FinalStep*/}
        {Object.keys(secondPageData).length > 0 && !custom && (
          <h3 className="no-print">Menu front</h3>
        )}
        {custom && !newCustomArray.length ? (
          <CustomMenu
            categoryOrder={categoryOrder}
            organizedData={organizedData}
            styleForm={styleForm}
            setStyleForm={setStyleForm}
            showColorInputs={showColorInputs}
            showJoinInputs={showJoinInputs}
            showDisclaimer={showDisclaimer}
            joinedCategories={joinedCategories}
            setJoinedCategories={setJoinedCategories}
            hidePrices={hidePrices}
            showDecorations={showDecorations}
            setShowDecorations={setShowDecorations}
            showDecorationCheckboxes={showDecorationCheckboxes}
            setShowDecorationCheckboxes={setShowDecorationCheckboxes}
            showPaddingCategoriesTop={showPaddingCategoriesTop}
            showMarginCategoriesTop={showMarginCategoriesTop}
            showImagesDeleteButtons={showImagesDeleteButtons}
          />
        ) : (
          <>
            {/* Render the first set of categories: Front menu */}
            <FrontMenu
              // animation={animation}
              styleForm={styleForm}
              setStyleForm={setStyleForm}
              showColorInputs={showColorInputs}
              showJoinInputs={showJoinInputs}
              showDisclaimer={showDisclaimer}
              joinedCategories={joinedCategories}
              setJoinedCategories={setJoinedCategories}
              hidePrices={hidePrices}
              showDecorations={showDecorations}
              setShowDecorations={setShowDecorations}
              showDecorationCheckboxes={showDecorationCheckboxes}
              showPaddingCategoriesTop={showPaddingCategoriesTop}
              showMarginCategoriesTop={showMarginCategoriesTop}
              showImagesDeleteButtons={showImagesDeleteButtons}
              organizedData={organizedData}
              showCategoryImage={showCategoryImage}
              setShowCategoryImage={setShowCategoryImage}
            />
            {/* Render BackMenu only if there are additional categories */}
            {Object.keys(secondPageData).length > 0 && (
              <BackMenu
                styleForm={styleForm}
                categoryOrder={extraCategories}
                secondPageData={secondPageData}
                showDisclaimer={showDisclaimer}
              />
            )}
          </>
        )}
        {/* )} */}
      </div>
      <div className="tool-section no-print">
        {children[1]} {/* Renders dropdown*/}
        {children[2]} {/* Renders preview tools*/}
      </div>
    </div>
    // </>
  );
};

export default PreviewMenu;
