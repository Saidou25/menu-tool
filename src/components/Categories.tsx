import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Field,
  MenuCategory,
  MenuCustomCategory,
  // StyleFormType,
} from "../data/types";
import { IoMdAddCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
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
import { useAppState } from "../hooks/useAppState";

type Props = {
  reset: () => void;
  setCustomCategoryList: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  customCategoryList: Array<{
    title: string;
    subtitle?: string;
    items: Field[];
  }>;
  custom: boolean;
  categoriesList: Array<{ title: string; subtitle?: string; items: Field[] }>;
  // setCategoriesList: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  selectedData: Record<string, { subtitle?: string; items: Field[] }>; // Update here
  menuSampleDataFunc: (
    localSelectedCategoryItems: Record<
      string,
      { subtitle?: string; items: Field[] }
    >
  ) => void;
};

export default function Categories({
  reset,
  custom,
  selectedData,
  menuSampleDataFunc,
  // setCategoriesList,
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
  const [showCategoryImage, setShowCategoryImage] = useState(false);
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
  const [showDecorationCheckboxes, setShowDecorationCheckboxes] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fadeInOut, setFadeInOut] = useState(false);
  // const [fadeLogoInOut, setFadeLogoInOut] = useState(false);
  const [menuPreview, setMenuPreview] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showDecorations, setShowDecorations] = useState("");
  const [joinedCategories, setJoinedCategories] = useState<
    Record<string, boolean>
  >({});
  const [localSelectedCategoryItems, setLocalSelectedCategoryItems] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});
  const [newCustomArray, setNewCustomArray] = useState<MenuCustomCategory[]>(
    []
  );
  const [flatItemsCategories, setFlatItemsCategories] = useState<
    MenuCategory[]
  >([]);
  const [consolidatedView, setConsolitedView] = useState<
    {
      item: boolean;
      title: string;
    }[]
  >([]);
  const [showSubtitleInput, setShowSubtitleInput] = useState(""); // Toggles subtitle inputs
  const [subtitle, setSubtitle] = useState("");

const { styleForm, setStyleForm } = useAppState();

  const handleAddSubtitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value); // Store the latest subtitle input
  };

  const handleRemoveSubtitle = (title: string) => {
    setNewCustomArray((prev) =>
      prev.map((item) =>
        item.title === title ? { ...item, subtitle: "" } : item
      )
    );
  };

  const handleSubtitleClick = () => {
    setNewCustomArray((prevArray) =>
      prevArray.map((item) =>
        item.title === showSubtitleInput ? { ...item, subtitle } : item
      )
    );

    setShowSubtitleInput(""); // Hide input field
    setSubtitle(""); // Clear input
  };

  const handleClick = (item: string) => {
    const updatedNewArray = newCustomArray.filter(
      (newArr) => newArr.title !== item
    );
    setNewCustomArray(updatedNewArray);
  };
  const handleShowItems = (title: string) => {
    setShowItems((prev) => {
      if (prev.includes(title)) {
        // Remove the item if it exists
        return prev.filter((item) => item !== title);
        // Add the item if it doesn't exist
      } else {
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

  const handleCustomPriceChange = (
    newArrTitle: string,
    name: string,
    value: string
  ) => {
    setNewCustomArray((prev) =>
      prev.map(
        (category) =>
          category.title === newArrTitle // Only update if title matches
            ? {
                ...category,
                subCategories: category.subCategories.map((sub) => ({
                  ...sub,
                  items: sub.items.map((item) =>
                    item.label === name
                      ? { ...item, price: { ...item.price, value: +value } }
                      : item
                  ),
                })),
              }
            : category // Keep other categories unchanged
      )
    );
  };

  const render = (newArrTitle: string) => {
    const category = newCustomArray.find((item) => item.title === newArrTitle);
    if (!category) return <span>No items found</span>;

    const flatArr = category.subCategories.flatMap((sub) => sub.items); // Flattens the array
    return (
      <>
        {flatArr.length > 0 ? (
          flatArr.map((flat, index) => (
            <div key={`${flat.label}-${index}`} className="col-6 pe-3">
              <div className="row g-0">
                <span className="col-7 gap-1">{flat.label}</span>
                <div className="col-5 d-flex gap-1">
                  <span>$&nbsp;</span>
                  <input
                    className="container-fluid price-input"
                    placeholder={flat.price.placeholder}
                    name={flat.label}
                    value={flat.price.value === 0 ? "" : flat.price.value} // Show placeholder if value is 0
                    type="number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleCustomPriceChange(
                        newArrTitle,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>No items available</span>
        )}
      </>
    );
  };

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
        setShowDecorationCheckboxes={setShowDecorationCheckboxes}
        showPaddingCategoriesTop={showPaddingCategoriesTop}
        showMarginCategoriesTop={showMarginCategoriesTop}
        view={view}
        setView={setView}
        setShowImagesDeleteButtons={setShowImagesDeleteButtons}
        showImagesDeleteButtons={showImagesDeleteButtons}
        showCategoryImage={showCategoryImage}
        setShowCategoryImage={setShowCategoryImage}
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
          setShowDecorationCheckboxes={setShowDecorationCheckboxes}
          showPaddingCategoriesTop={showPaddingCategoriesTop}
          setShowPaddingCategoriesTop={setShowPaddingCategoriesTop}
          setShowMarginCategoriesTop={setShowMarginCategoriesTop}
          showMarginCategoriesTop={showMarginCategoriesTop}
          setShowImagesDeleteButtons={setShowImagesDeleteButtons}
          showImagesDeleteButtons={showImagesDeleteButtons}
          showCategoryImage={showCategoryImage}
          setShowCategoryImage={setShowCategoryImage}
        />
      </PreviewMenu>
    );
  }

  return (
    <div className="row app-container g-0">
      <div className="col-1 pt-3">
        <>
          <Logo
            className="restart"
            h1ClassName="restart-tool"
            title=""
            subtitle="Restart"
            // setCategoriesList={setCategoriesList}
            // fadeLogoInOut={fadeLogoInOut}
            reset={reset}
          />
          <Logo
            className="preview-btn"
            h1ClassName="preview-tool"
            title=""
            subtitle="Preview menu"
            setMenuPreview={setMenuPreview}
            menuPreview={menuPreview}
            // fadeLogoInOut={fadeLogoInOut}
          />
        </>
      </div>
      <div className="col-11">
        {custom ? (
          <>
            <div className="d-flex pb-5 pt-5">
              {/* "Create custom menu categories and select items:" */}
              <Label
                title="Create custom menu categories and select items:"
                fadeInOut={true}
              />
            </div>
            <CustomCategoryForm
              setCustomCategories={setCustomCategories}
              customCategories={customCategories}
              newCustomCategories={NewCustomCategories}
              setNewCustomCategories={setNewCustomCategories}
              setNewArray={setNewArray}
              newArray={newArray}
              setNewCustomArray={setNewCustomArray}
              newCustomArray={newCustomArray}
              // customArrTitles={customArrTitles}
              // setCustomArrTitles={setCustomArrTitles}
              setFadeInOut={setFadeInOut}
              // fadeInOut={fadInOut}
            />
            {newCustomArray &&
              newCustomArray.map((newArr, categoryIndex) => (
                <div key={`${newArr}-${categoryIndex}`} id={newArr.title}>
                  <div className="row mb-3">
                    <div className="col-2">
                      <Label title={newArr.title} fadeInOut={fadeInOut} />
                      <br />
                      <br />
                      {showSubtitleInput === newArr.title ? (
                        <div className="io-container">
                          <Input
                            type="text"
                            onChange={handleAddSubtitle}
                            label="add subtitle"
                            htmlFor={newArr.title}
                          />
                          <br />
                          <br />
                          <Button
                            type="button"
                            onClick={handleSubtitleClick}
                            children="submit"
                          />
                        </div>
                      ) : newArr.subtitle ? (
                        <>
                          <span
                            style={{ fontSize: "20px", fontStyle: "italic" }}
                          >
                            {newArr.subtitle}{" "}
                          </span>
                          <br />
                          <br />
                          <IoCloseOutline
                            className="close-io"
                            onClick={() => handleRemoveSubtitle(newArr.title)}
                          />{" "}
                          &nbsp;&nbsp;remove subtitle
                          <br />
                        </>
                      ) : (
                        <div className="io-container">
                          <IoMdAddCircle
                            className="io"
                            id={newArr.title}
                            onClick={() => setShowSubtitleInput(newArr.title)}
                          />
                          &nbsp;&nbsp; add subtitle
                        </div>
                      )}
                      {/* <br /> */}
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
                      &nbsp;&nbsp;
                      <br />
                      <Input
                        type="checkbox"
                        className="consolited-view"
                        id="consolited-view"
                        onChange={() => handleConsolidatedView(newArr.title)}
                        checked={consolidatedView.some(
                          (item) => item.title === newArr.title
                        )} // .some() is more efficient than .find() because it directly returns true or false without needing extra conversion.
                        label="compact view"
                        htmlFor="consolited view"
                        // fadeInOut={fadeInOut}
                      />
                      {/* &nbsp; */}
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
                        remove category
                      </Button>
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>

                    {newCustomArray.length > 0 &&
                    consolidatedView.some(
                      (item) => item.title === newArr.title
                    ) ? (
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
                                  setNewCustomArray={setNewCustomArray}
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
                                                  key={
                                                    subCategory.subCategoryTitle
                                                  }
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
                                                          <span>
                                                            {item.label}
                                                          </span>
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
              <div
                className="ps-2"
                style={{ marginLeft: "17%", marginTop: "5%" }}
              >
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
          </>
        ) : (
          <>
            <div className="d-flex pb-5 pt-5">
              <Label
                label=""
                title="Select categories and items for your menu:"
                fadeInOut={true}
              />
            </div>
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
          </>
        )}

        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
