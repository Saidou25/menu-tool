import { useEffect, useState } from "react";
import { Field, MenuCategory, StyleFormType } from "../data/types";
import SelectedCategoryItems from "./SelectedCategoryItems";
import CategoryItems from "./CategoryItems";
import PreviewMenu from "./PreviewMenu";
import SmallTittles from "./SmallTittles";
import FinalStep from "./FinalStep";
import DropDown from "./DropDown";
import PreviewTools from "./PreviewTools";
import Logo from "./Logo";
import CustomCategoryItems from "./CustomCategoryItems";

import "./Categories.css";
import CustomCategoryForm from "./CustomCategoryForm";
import SelectedCustomCategoryItems from "./SelectedCustomCategoryItem";

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
  const [categoryIndexList, setShowCategoryIndexList] = useState([]);
  const [customCategories, setCustomCategories] = useState<
    { categoryItem: string }[]
  >([]);
  const [showSelect, setShowSelect] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showItems, setShowItems] = useState<number[]>([]);
  // const [showItems, setShowItems] = useState<string[]>([]);

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
  const [menuPreview, setMenuPreview] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showDecorations, setShowDecorations] = useState("");
  const [joinedCategories, setJoinedCategories] = useState<
    Record<string, boolean>
  >({});
  const [localSelectedCategoryItems, setLocalSelectedCategoryItems] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});
  const [
    localSelectedCustomCategoryItems,
    setLocalSelectedCustomCategoryItems,
  ] = useState<Record<string, { subtitle?: string; items: Field[] }>>({});
  const [
    // localCustomSelectedCategoryItems,
    // setLocalCustomSelectedCategoryItems,
  ] = useState<Record<string, { subtitle?: string; items: Field[] }>>({});
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
  });
  // console.log(customCategories);

  const handleClick = (item: string) => {
    const newCustomCategories = customCategories.filter(
      (category) => category.categoryItem !== item
    );
    setCustomCategories(newCustomCategories);
  };

  const handleShowItems = (categoryIndex: number) => {
    setShowItems((prev) => {
      if (prev.includes(categoryIndex)) {
        // Remove the item if it exists
        return prev.filter((item) => item !== categoryIndex);
      } else {
        // Add the item if it doesn't exist
        return [...prev, categoryIndex];
      }
    });
  };

  // console.log(showItems);

  const setShowSelectCreate = (item: string) => {
    if (item === "select") {
      setShowSelect(true);
      setShowCreate(false);
    } else {
      setShowSelect(false);
      setShowCreate(true);
    }
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

  // Update price in localSelectedCategoryItems
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedCategoryItems((prev) => {
      // Iterate over categories to find the one containing the item
      const updatedCategories = Object.keys(prev).reduce(
        (acc, categoryTitle) => {
          const updatedItems = prev[categoryTitle].items.map((item) =>
            item.label === name
              ? { ...item, price: { ...item.price, value } }
              : item
          );

          acc[categoryTitle] = {
            subtitle: prev[categoryTitle].subtitle, // Preserve existing subtitle
            items: updatedItems,
          };
          return acc;
        },
        {} as Record<string, { subtitle?: string; items: Field[] }>
      );

      return updatedCategories;
    });
  };

  // Update selected category items when a selection is made in a category
  const showCategoryItems = (
    categoryTitle: string,
    updatedSelectedCategoryItems: Field[]
  ) => {
    setLocalSelectedCategoryItems((prevState) => ({
      ...prevState,
      [categoryTitle]: {
        subtitle: prevState[categoryTitle]?.subtitle || "", // Preserve existing subtitle
        items: updatedSelectedCategoryItems, // Update selected items
      },
    }));
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

  if (menuPreview) {
    return (
      <PreviewMenu
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
          setView={setView}
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
    <>
      <Logo
        className="restart"
        h1ClassName="restart-tool"
        title=""
        subtitle="Restart"
        setCategoriesList={setCategoriesList}
      />
      <Logo
        className="preview-btn"
        h1ClassName="preview-tool"
        title=""
        subtitle="Preview menu"
        setMenuPreview={setMenuPreview}
        menuPreview={menuPreview}
      />
      <div className="d-flex pb-5 ps-5">
        <input
          type="checkbox"
          checked={showSelect}
          onChange={() => setShowSelectCreate("select")}
        />
        <h1 className="">Select categories and items for your menu:</h1>
      </div>

      {showSelect && !showCreate && (
        <div className="row">
          {categoriesList.map((category, index) => (
            <div className="col-3 categories ps-5 ms-5" key={index}>
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
          <div></div>
        </div>
      )}

      <br />
      <div className="d-flex pb-5 ps-5">
        <input
          type="checkbox"
          checked={showCreate}
          onChange={() => setShowSelectCreate("create")}
        />
        <h1 className="">Create categories and items from scratch:</h1>
      </div>
      {showCreate && !showSelect && (
        <CustomCategoryForm
          setCustomCategories={setCustomCategories}
          customCategories={customCategories}
        />
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* {showCreate && !showSelect && ( */}
      <>
        {customCategories &&
          customCategories.map((customCategory, categoryIndex) => (
            <div key={`${customCategory}-${categoryIndex}`}>
              <div className="row">
                <div className="col-4">
                  <span>{customCategory.categoryItem}</span>
                  <input
                    type="checkbox"
                    onChange={() => handleShowItems(categoryIndex)}
                    checked={showItems.includes(categoryIndex)} // Checkbox state
                  />
                  check to select items
                  <button
                    type="button"
                    value={customCategory.categoryItem}
                    onClick={() => handleClick(customCategory.categoryItem)}
                  >
                    remove
                  </button>
                  {/* {showItems &&
                      customCategoryList.map((Category, index) => (
                        <div key={index}>
                          <SelectedCustomCategoryItems
                            customCategoryList={customCategoryList}
                            selectedCustomCategoryItems={
                              localSelectedCategoryItems[Category.title]
                                ?.items || []
                            }
                            handlePriceChange={handlePriceChange}
                            fadeInOut={fadeInOut}
                          />
                        </div>
                      ))} */}
                </div>
                <div className="col-8 d-flex">
                  <div className="row">
                    {/* Only render if categoryIndex is selected */}
                    {showItems.includes(categoryIndex) &&
                        customCategoryList.map((Category) => (
                          <CustomCategoryItems
                            selectedCategoryItems={
                              localSelectedCategoryItems[Category.title]
                                ?.items || []
                            }
                            fields={Category.items}
                            title={Category.title}
                            showCategoryItemsFunc={(updatedItems) =>
                              showCategoryItems(Category.title, updatedItems)
                            }
                            fadeInOutFunc={funcFadeInOut}
                          ></CustomCategoryItems>
                        ))
                      }
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>

      <div className="categories-titles ps-5 ms-5 pt-2">
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
      <br />
      <div className="categories-titles ps-5 ms-5 pt-3">
        <input
          className="checkbox-category"
          id="preview-menu"
          type="checkbox"
          onChange={() => setMenuPreview((prev) => !prev)}
          checked={menuPreview}
          name="disclaimer"
        />
        <SmallTittles label="Preview menu" />
      </div>
      <br />
      <br />
      <br />
    </>
  );
}
