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

import "./Categories.css";
import CustomCategoryForm from "./CustomCategoryForm";

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
  const [newArray, setNewArray] = useState<MenuCategory[]>([]); // Use correct type
  // const [allItems, setAllItems] = useState<any[]>([]);
  const [consolidatedView, setConsolitedView] = useState<{
    item: boolean;
    title: string;
  }>({ item: false, title: "" });
  const [customCategories, setCustomCategories] = useState<
    { categoryItem: string }[]
  >([]);
  const [NewCustomCategories, setNewCustomCategories] = useState<
    { categoryItem: string }[]
  >([]);
  const [showSelect, setShowSelect] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  // const [showItems, setShowItems] = useState<number[]>([]);
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
  const [customArrTitles, setCustomArrTitles] = useState<string[]>([]);
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
      <div>
        {flatArr.flat().length > 0 ? (
          flatArr.flat().map((flat, index) => (
            <div key={index} className="row preview-item-container g-0">
              <span className="col-7">{flat.label}</span>
              <div className="col-5 d-flex">
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
          ))
        ) : (
          <span>No items found</span>
        )}
      </div>
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
          newCustomCategories={NewCustomCategories}
          setNewCustomCategories={setNewCustomCategories}
          setNewArray={setNewArray}
          newArray={newArray}
          setNewCustomArray={setNewCutomArray}
          newCustomArray={newCustomArray}
          customArrTitles={customArrTitles}
          setCustomArrTitles={setCustomArrTitles}
        />
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <>
        {newCustomArray &&
          newCustomArray.map((newArr, categoryIndex) => (
            <div key={`${newArr}-${categoryIndex}`} id={newArr.title}>
              <div className="row">
                <div className="col-4">
                  <span>{newArr.title}</span>
                  <br />
                  <input
                    type="checkbox"
                    onChange={() => handleShowItems(newArr.title)}
                    checked={showItems.includes(newArr.title)} // Checkbox state
                  />
                  check to select items
                  <br />
                  <input
                    type="checkbox"
                    onChange={() =>
                      setConsolitedView((prevState) => ({
                        item:
                          prevState.title === newArr.title
                            ? !prevState.item
                            : true,
                        title: newArr.title, // Keep the selected title consistent
                      }))
                    }
                    checked={
                      consolidatedView.item &&
                      consolidatedView.title === newArr.title
                    }
                  />
                  consolited view
                  <br />
                  <button
                    type="button"
                    value={newArr.title}
                    onClick={() => handleClick(newArr.title)}
                  >
                    remove
                  </button>
                </div>
                {newCustomArray.length > 0 &&
                consolidatedView.item &&
                consolidatedView.title === newArr.title ? (
                  <div className="col-8 preview-item-container g-0">
                    {render(newArr.title)}
                  </div>
                ) : (
                  <div className="col-8 d-flex">
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
                              consolidatedView={consolidatedView}
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
