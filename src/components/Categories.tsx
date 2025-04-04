import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Field,
  MenuCategory,
  MenuCustomCategory,
  StyleFormType,
} from "../data/types";
import SelectedCategoryItems from "./SelectedCategoryItems";
import CategoryItems from "./CategoryItems";
import PreviewMenu from "./PreviewMenu";
import SmallTittles from "./SmallTittles";
import FinalStep from "./FinalStep";
import DropDown from "./DropDown";
import PreviewTools from "./PreviewTools";
import Logo from "./Logo";
import CustomCategoryItems from "./CustomCategoryItems";
import CustomCategoryForm from "./CustomCategoryForm";
import Label from "./Label";
import Button from "./Button";
import Input from "./Input";

import "./Categories.css";

type Props = {
  setCustomCategoryList: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  customCategoryList: Array<{
    title: string;
    subtitle?: string;
    items: Field[];
  }>;
  custom: boolean;
  categoriesList: Array<{ title: string; subtitle?: string; items: Field[] }>;
  setCategoriesList: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  selectedData: Record<string, { subtitle?: string; items: Field[] }>; // Update here
  menuSampleDataFunc: (
    localSelectedCategoryItems: Record<
      string,
      { subtitle?: string; items: Field[] }
    >
  ) => void;
};

export default function Categories({
  custom,
  selectedData,
  menuSampleDataFunc,
  setCategoriesList,
  categoriesList,
  // setCustomCategoryList,
  customCategoryList,
}: Props) {
  const [newArray, setNewArray] = useState<MenuCategory[]>([]); 
  const [customCategories, setCustomCategories] = useState<
    { categoryItem: string }[]
  >([]);
  const [NewCustomCategories, setNewCustomCategories] = useState<
    { categoryItem: string }[]
  >([]);
  const [showSelect, setShowSelect] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showItems, setShowItems] = useState<string[]>([]);
  const [view, setView] = useState(false);
  const [showImagesDeleteButtons, setShowImagesDeleteButtons] = useState(false);
  const [showPaddingCategoriesTop, setShowPaddingCategoriesTop] =
    useState(false);
  const [showMarginCategoriesTop, setShowMarginCategoriesTop] = useState(false);
  const [showJoinInputs, setShowJoinInputs] = useState(false);
  const [hidePrices, setHidePrices] = useState(false);
  const [showColorInputs, setShowColorInputs] = useState(false);
  const [showFinalStep, setShowfinalStep] = useState(false);
  const [showDecorationCheckboxes, setShowDecorationsCheckboxes] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fadeInOut, setFadeInOut] = useState(false);
  const [fadeLogoInOut, setFadeLogoInOut] = useState(false);
  const [menuPreview, setMenuPreview] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showDecorations, setShowDecorations] = useState("");
  const [joinedCategories, setJoinedCategories] = useState<
    Record<string, boolean>
  >({});
  const [localSelectedCategoryItems, setLocalSelectedCategoryItems] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});
  const [newCustomArray, setNewCutomArray] = useState<MenuCustomCategory[]>([]); // Use correct type
  // const [customArrTitles, setCustomArrTitles] = useState<string[]>([]);
  const [styleForm, setStyleForm] = useState<StyleFormType>({
    menuWidth: 0,
    menuHeight: 0,
    backgroundImage: "",
    topImage: "",
    topImageSize: 50,
    bottomImage: "",
    bottomImageSize: 20,
    pagePaddingTopAndBottom: 0,
    pagePaddingLeftAndRight: 0,
    categoryFontSize: 30,
    categoriesMarginBottom: 0,
    categoryMarginBottom: 0,
    itemFontSize: 20,
    itemMarginBottom: 0,
    descriptionFontSize: 15,
    descriptionMarginBottom: 0,
    guyTop: "",
    guyBottom: "",
    guyTopSize: 50,
    guyBottomSize: 50,
    guyTopMarginBottom: 0,
    guyBottomMarginBottom: 0,
    title: "",
    titleSize: 20,
    titlePaddingBottom: 0,
    titlePaddingTop: 0,
    titleBackgroundColor: "",
    footerSize: 20,
    footer: "",
    titleMarginBottom: 0,
    footerMarginBottom: 0,
    pageBackground: "",
    sectionBackground: [],
    descriptionLetterColor: [],
    titleColor: "",
    categoryColor: "",
    priceColor: "",
    priceSize: 15,
    menuItemColor: "",
    menuItemDescriptionColor: "",
    textTopColor: "",
    textBottomColor: "",
    footerTextColor: "",
    subtitleFontSize: 15,
    subtitleFontColor: [],
    subtitlePaddingBottom: 0,
    decoration: "",
    gapTextTop: -11,
    contentContainerWidth: 45,
    paddingCategoriesLeftRight: 0,
    paddingCategoriesTop: [],
    marginCategoriesTop: [],
    paddingDecoration: 0,
    decorationWidth: 90,
    footerPaddingPaddingTop: 0,
    footerPaddingBottom: 0,
  });
  const [flatItemsCategories, setFlatItemsCategories] = useState<
    MenuCategory[]
  >([]);
  const [consolidatedView, setConsolitedView] = useState<
    {
      item: boolean;
      title: string;
    }[]
  >([]);

  const handleClick = (item: string) => {
    const updatedNewArray = newCustomArray.filter(
      (newArr) => newArr.title !== item
    );
    setNewCutomArray(updatedNewArray);
  };

  const handleShowItems = (title: string) => {
    setShowItems((prev) => {
      if (prev.includes(title)) {
        // Remove the item if it exists
        return prev.filter((item) => item !== title);
      } else {
        // Add the item if it doesn't exist
        return [...prev, title];
      }
    });
  };

  const handleDisclaimer = () => {
    setShowDisclaimer((prev) => !prev);
  };

  const funcFadeInOut = (newState: boolean) => {
    setFadeInOut(newState);
  };

  const handleGoBack = () => {
    setMenuPreview(false);
  };

  const handleConfirm = () => {
    setMenuPreview(false);
  };

  // Updates price in localSelectedCategoryItems
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedCategoryItems((prev) => {
      // Iterates over categories to find the one containing the item
      const updatedCategories = Object.keys(prev).reduce(
        (acc, categoryTitle) => {
          const updatedItems = prev[categoryTitle].items.map((item) =>
            item.label === name
              ? { ...item, price: { ...item.price, value } }
              : item
          );

          acc[categoryTitle] = {
            subtitle: prev[categoryTitle].subtitle, // Preserves existing subtitle
            items: updatedItems,
          };
          return acc;
        },
        {} as Record<string, { subtitle?: string; items: Field[] }>
      );

      return updatedCategories;
    });
  };
  const showCategoryItems = (
    categoryTitle: string,
    updatedSelectedCategoryItems: Field[]
  ) => {
    setLocalSelectedCategoryItems((prevState) => {
      const updatedState = { ...prevState };

      if (updatedSelectedCategoryItems.length) {
        // Updates category with selected items
        updatedState[categoryTitle] = {
          ...prevState[categoryTitle], // Preserves other fields (like subtitle)
          items: updatedSelectedCategoryItems,
        };
      } else {
        // Removes category from state if no items remain
        delete updatedState[categoryTitle];
      }

      return updatedState;
    });
  };

  useEffect(() => {
    if (Object.keys(localSelectedCategoryItems).length > 0) {
      menuSampleDataFunc(localSelectedCategoryItems);
    }
  }, [localSelectedCategoryItems, menuSampleDataFunc]);

  // Runs every time selectedData or categoriesList changes
  useEffect(() => {
    if (categoriesList.length > 0 && Object.keys(selectedData).length > 0) {
      const updatedData = Object.fromEntries(
        Object.entries(selectedData).map(([category, { items }]) => {
          const matchedCategory = categoriesList.find(
            (c) =>
              c.title.trim().toLowerCase() === category.trim().toLowerCase()
          );
          return [
            category,
            {
              subtitle: matchedCategory?.subtitle || "",
              items,
            },
          ];
        })
      );

      // Prevent infinite loop by checking if state has actually changed
      setLocalSelectedCategoryItems((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(updatedData)) {
          return updatedData;
        }
        return prev;
      });
    }
  }, [selectedData, categoriesList]); // Runs only when dependencies change

  const handleConsolidatedView = (title: string) => {
    setConsolitedView((prevState) => {
      const itemExists = prevState.some((item) => item.title === title);

      if (itemExists) {
        // Remove the item if it exists
        return prevState.filter((item) => item.title !== title);
      } else {
        // Add the item if it doesn't exist
        return [...prevState, { item: true, title }];
      }
    });
  };

  const render = (newArrTitle: string) => {
    const flatArr = [];
    const firstLevel = newCustomArray.find(
      (item) => item.title === newArrTitle
    );
    const subCat = firstLevel?.subCategories;
    if (subCat) {
      for (let subCategory of subCat) flatArr.push(subCategory.items);
    }

    return (
      <>
        {flatArr.flat().length > 0 ? (
          flatArr.flat().map((flat, index) => (
            <div key={`${flat}-${index}`} className="col-6 pe-3">
              <div className="row g-0">
                <span className="col-7 gap-1">{flat.label}</span>
                <div className="col-5 d-flex gap-1">
                  <span>$&nbsp;</span>
                  <input
                    className="container-fluid price-input"
                    placeholder={flat.price.placeholder}
                    //  name={item.label} // Use label as item identifier
                    value={flat.price.value === 0 ? "" : flat.price.value} // Show placeholder if value is 0
                    type="number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handlePriceChange(e.target.name, +e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>No items found</span>
        )}
      </>
    );
  };

  // console.log("localSelectedCategoryItems", localSelectedCategoryItems);

  if (menuPreview) {
    return (
      <PreviewMenu
        flatItemsCategories={flatItemsCategories}
        setFlatItemsCategories={setFlatItemsCategories}
        newCustomArray={newCustomArray}
        custom={custom}
        goBack={handleGoBack}
        onConfirm={handleConfirm}
        message="Confirm printing or continue editing"
        showDisclaimer={showDisclaimer}
        dataSample={localSelectedCategoryItems}
        styleForm={styleForm}
        setStyleForm={setStyleForm}
        showFinalStep={showFinalStep}
        showColorInputs={showColorInputs}
        setShowJoinInputs={setShowJoinInputs}
        showJoinInputs={showJoinInputs}
        joinedCategories={joinedCategories}
        setJoinedCategories={setJoinedCategories}
        hidePrices={hidePrices}
        showDecorations={showDecorations}
        setShowDecorations={setShowDecorations}
        showDecorationCheckboxes={showDecorationCheckboxes}
        setShowDecorationCheckboxes={setShowDecorationsCheckboxes}
        showPaddingCategoriesTop={showPaddingCategoriesTop}
        showMarginCategoriesTop={showMarginCategoriesTop}
        view={view}
        setView={setView}
        setShowImagesDeleteButtons={setShowImagesDeleteButtons}
        showImagesDeleteButtons={showImagesDeleteButtons}
      >
        <FinalStep
          goBack={handleGoBack}
          // onConfirm={handleConfirm}
          message="Confirm printing or continue editing"
          view={view}
          // setView={setView}
        />
        <DropDown
          setShowfinalStep={setShowfinalStep}
          setShowModal={setShowModal}
          showModal={showModal}
          setStyleForm={setStyleForm}
          styleForm={styleForm}
          message="formats"
          width="100"
        />
        <PreviewTools
          setStyleForm={setStyleForm}
          styleForm={styleForm}
          setShowColorInputs={setShowColorInputs}
          setShowJoinInputs={setShowJoinInputs}
          showColorInputs={showColorInputs}
          showJoinInputs={showJoinInputs}
          hidePrices={hidePrices}
          setHidePrices={setHidePrices}
          showDecorations={showDecorations}
          // setShowDecorations={setShowDecorations}
          showDecorationCheckboxes={showDecorationCheckboxes}
          setShowDecorationCheckboxes={setShowDecorationsCheckboxes}
          showPaddingCategoriesTop={showPaddingCategoriesTop}
          setShowPaddingCategoriesTop={setShowPaddingCategoriesTop}
          setShowMarginCategoriesTop={setShowMarginCategoriesTop}
          showMarginCategoriesTop={showMarginCategoriesTop}
          setShowImagesDeleteButtons={setShowImagesDeleteButtons}
          showImagesDeleteButtons={showImagesDeleteButtons}
        />
      </PreviewMenu>
    );
  }

  return (
    <div className="row app-container g-0">
      <div className="col-1 pt-4">
        {(showCreate || showSelect) && (
          <>
            <Logo
              className="restart"
              h1ClassName="restart-tool"
              title=""
              subtitle="Restart"
              setCategoriesList={setCategoriesList}
              fadeLogoInOut={fadeLogoInOut}
            />
            <Logo
              className="preview-btn"
              h1ClassName="preview-tool"
              title=""
              subtitle="Preview menu"
              setMenuPreview={setMenuPreview}
              menuPreview={menuPreview}
              fadeLogoInOut={fadeLogoInOut}
            />
          </>
        )}
      </div>
      <div className="col-11">
        {!showCreate && (
          <div className="d-flex pb-5 pt-5">
            <Input
              type="checkbox"
              className="select-check"
              id="select"
              checked={showSelect}
              onChange={() => {
                setShowSelect(!showSelect);
                setFadeLogoInOut(!fadeLogoInOut);
              }}
              title="Select categories and items for your menu:"
              htmlFor="select"
            />
          </div>
        )}

        {showSelect && !showCreate && (
          <div className="row">
            {categoriesList.map((category, index) => (
              <div className="col-3 categories ps-5" key={index}>
                <CategoryItems
                  selectedCategoryItems={
                    localSelectedCategoryItems[category.title]?.items || []
                  }
                  fields={category.items}
                  title={category.title}
                  showCategoryItemsFunc={(updatedItems) =>
                    showCategoryItems(category.title, updatedItems)
                  }
                  fadeInOutFunc={funcFadeInOut}
                >
                  <SelectedCategoryItems
                    selectedCategoryItems={
                      localSelectedCategoryItems[category.title]?.items || []
                    }
                    handlePriceChange={handlePriceChange}
                    fadeInOut={fadeInOut}
                  />
                </CategoryItems>
              </div>
            ))}
            <div className="ps-5" style={{ marginLeft: "3px" }}>
              <input
                className="checkbox-category"
                id="disclaimer"
                type="checkbox"
                onChange={handleDisclaimer}
                checked={showDisclaimer}
                name="disclaimer"
              />
              &nbsp;&nbsp;
              <SmallTittles label="Select to add FDA disclaimer to the bottom of your menu" />
            </div>
          </div>
        )}

        {!showSelect && (
          <div className="d-flex pb-5 pt-5">
            <Input
              type="checkbox"
              className="create-check"
              id="create"
              checked={showCreate}
              onChange={() => {
                setShowCreate(!showCreate);
                setFadeLogoInOut(!fadeLogoInOut);
              }}
              title="Create custom menu categories and select items:"
            />
          </div>
        )}
        {showCreate && !showSelect && (
          <CustomCategoryForm
            setCustomCategories={setCustomCategories}
            customCategories={customCategories}
            newCustomCategories={NewCustomCategories}
            setNewCustomCategories={setNewCustomCategories}
            setNewArray={setNewArray}
            newArray={newArray}
            setNewCustomArray={setNewCutomArray}
            newCustomArray={newCustomArray}
            // customArrTitles={customArrTitles}
            // setCustomArrTitles={setCustomArrTitles}
            setFadeInOut={setFadeInOut}
            // fadeInOut={fadInOut}
          />
        )}
       
        <br />
        <br />
        <br />
        {/* <> */}
        {newCustomArray &&
          newCustomArray.map((newArr, categoryIndex) => (
            <div key={`${newArr}-${categoryIndex}`} id={newArr.title}>
              <div className="row mb-3">
                <div className="col-2">
                  <Label title={newArr.title} fadeInOut={fadeInOut} />
                  <br />
                  <br />
                  <Input
                    type="checkbox"
                    id="select-items"
                    onChange={() => handleShowItems(newArr.title)}
                    checked={showItems.includes(newArr.title)} // Checkbox state
                    label="check to select items"
                    htmlFor="select-items"
                    className="select-items"
                    // fadeInOut={fadeInOut}
                  />
                  &nbsp;
                  <br />
                  <br />
                  <Input
                    type="checkbox"
                    className="consolited-view"
                    id="consolited-view"
                    onChange={() => handleConsolidatedView(newArr.title)}
                    checked={consolidatedView.some(
                      (item) => item.title === newArr.title
                    )}  // .some() is more efficient than .find() because it directly returns true or false without needing extra conversion.
                    label="compact view"
                    htmlFor="consolited view"
                    // fadeInOut={fadeInOut}
                  />
                  &nbsp;
                  <br />
                  <br />
                  <Button
                    className={
                      fadeInOut
                        ? "button label-fade-in"
                        : "button label-fade-out"
                    }
                    type="button"
                    value={newArr.title}
                    onClick={() => handleClick(newArr.title)}
                  >
                    remove
                  </Button>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>

                {newCustomArray.length > 0 &&
                consolidatedView.some((item) => item.title === newArr.title) ? (
                  <div className="col-10">
                    <div className="row preview-item-container g-0">
                      {render(newArr.title)}
                    </div>
                  </div>
                ) : (
                  <div className="col-10 d-flex">
                    <div className="row">
                      {/* Only render if categoryIndex is selected */}
                      {showItems.includes(newArr.title) &&
                        customCategoryList.map((Category, index) => (
                          <div
                            className="col-4 category-items-container"
                            key={index}
                          >
                            <CustomCategoryItems
                              newArr={newArr}
                              newCustomArray={newCustomArray}
                              setNewCustomArray={setNewCutomArray}
                              selectedData={selectedData}
                              // consolidatedView={consolidatedView}
                              selectedCategoryItems={
                                localSelectedCategoryItems[Category.title]
                                  ?.items || []
                              }
                              fields={Category.items}
                              title={Category.title}
                              // fadeInOutFunc={funcFadeInOut}
                            >
                              <div className="row g-0">
                                {newCustomArray &&
                                  newCustomArray.map((customItem) => (
                                    <div
                                      key={customItem.title}
                                      className="preview-items-container"
                                    >
                                      {customItem.subCategories &&
                                        customItem.subCategories.map(
                                          (subCategory) => (
                                            <span
                                              className="col-7"
                                              key={subCategory.subCategoryTitle}
                                            >
                                              {customItem.title ===
                                                newArr.title &&
                                                subCategory.subCategoryTitle ===
                                                  Category.title &&
                                                subCategory.items.length &&
                                                subCategory.items.map(
                                                  (item, index) => (
                                                    <div
                                                      key={index}
                                                      className="item-label"
                                                    >
                                                      <span>{item.label}</span>
                                                    </div>
                                                  )
                                                )}
                                            </span>
                                          )
                                        )}
                                    </div>
                                  ))}
                              </div>
                            </CustomCategoryItems>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        {newCustomArray[0]?.subCategories.length &&
        newCustomArray.length !== consolidatedView.length ? (
          <div className="ps-2" style={{ marginLeft: "17%", marginTop: "5%" }}>
            <input
              className="checkbox-category"
              id="disclaimer"
              type="checkbox"
              onChange={handleDisclaimer}
              checked={showDisclaimer}
              name="disclaimer"
            />
            <SmallTittles label="Select to add FDA disclaimer to the bottom of your menu" />
          </div>
        ) : null}

        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
