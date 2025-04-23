import { useAppState } from "../hooks/useAppState";
import { Field } from "../data/types";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { ChangeEvent, useEffect } from "react";
import Button from "./Button";
import CustomCategoryForm from "./CustomCategoryForm";
import Input from "./Input";
import Label from "./Label";
import CustomCategoryItems from "./CustomCategoryItems";
import SmallTittles from "./SmallTittles";

import "./Categories.css";

type Props = {
  selectedData: Record<string, { subtitle?: string; items: Field[] }>; 
  categoriesList: Array<{ title: string; subtitle?: string; items: Field[] }>;
};
export default function CustomCategoriesSelect({
  selectedData,
  categoriesList,
}: Props) {
  const {
    setCustomCategories,
    customCategories,
    setNewCustomCategories,
    setNewArray,
    newArray,
    setNewCustomArray,
    newCustomArray,
    fadeInOut,
    showSubtitleInput,
    showItems,
    consolidatedView,
    customCategoryList,
    localSelectedCategoryItems,
    showDisclaimer,
    setSubtitle,
    subtitle,
    setShowSubtitleInput,
    setShowItems,
    setConsolidatedView,
    setIsDesserts,
    setShowDisclaimer,
  } = useAppState();

  const handleAddSubtitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value); // Store the latest subtitle input
  };

  const handleDisclaimer = () => {
    setShowDisclaimer(!showDisclaimer);
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

  const handleShowItems = (title: string) => {
    setShowItems((prev: any) => {
      if (prev.includes(title)) {
        // Remove the item if it exists
        return prev.filter((item: any) => item !== title);
        // Add the item if it doesn't exist
      } else {
        return [...prev, title];
      }
    });
  };

  const handleClick = (item: string) => {
    const updatedNewArray = newCustomArray.filter(
      (newArr) => newArr.title !== item
    );
    setNewCustomArray(updatedNewArray);
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

  const handleConsolidatedView = (title: string) => {
    setConsolidatedView((prevState: any) => {
      const itemExists = prevState.some((item: any) => item.title === title);

      if (itemExists) {
        // Remove the item if it exists
        return prevState.filter((item: any) => item.title !== title);
      } else {
        // Add the item if it doesn't exist
        return [...prevState, { item: true, title }];
      }
    });
  };

  useEffect(() => {
    if (categoriesList.length === 1) {
      setIsDesserts(true);
    }
  }, []);

  const render = (newArrTitle: string) => {
    const category = newCustomArray.find((item) => item.title === newArrTitle);
    if (!category) return <span>No items found</span>;

    const flatArr = category.subCategories.flatMap((sub) => sub.items); // Flattens the array
    return (
      <>
        {flatArr.length > 0 ? (
          flatArr.map((flat, index) => (
            <div key={`${flat.label}-${index}`} className="col-6 pe-3">
              <div className="row g-0 align-items-center">
                <span className="col-7 gap-1">{flat.label}</span>
                <div className="col-5 d-flex gap-1">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    $&nbsp;
                  </span>
                  <input
                    className="container-fluid price-input"
                    placeholder={flat.price.placeholder}
                    name={flat.label}
                    value={
                      flat.price.value === 0 ? "" : flat.price.value?.toFixed(2)
                    } // Show placeholder if value is 0
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

  return (
    <div className="col-11">
      <div className="d-flex pb-5 pt-5">
        <Label
          title="Create custom menu categories and select items:"
          fadeInOut={true}
        />
      </div>
      <CustomCategoryForm
        setCustomCategories={setCustomCategories}
        customCategories={customCategories}
        newCustomCategories={customCategories}
        setNewCustomCategories={setNewCustomCategories}
        setNewArray={setNewArray}
        newArray={newArray}
        setNewCustomArray={setNewCustomArray}
        newCustomArray={newCustomArray}
        // customArrTitles={customArrTitles}
        // setCustomArrTitles={setCustomArrTitles}
        // setFadeInOut={setFadeInOut}
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
                    <span style={{ fontSize: "20px", fontStyle: "italic" }}>
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
                    (item:any) => item.title === newArr.title
                  )} // .some() is more efficient than .find() because it directly returns true or false without needing extra conversion.
                  label="compact view"
                  htmlFor="consolited view"
                  // fadeInOut={fadeInOut}
                />
                {/* &nbsp; */}
                <br />
                <Button
                  className={
                    fadeInOut ? "button label-fade-in" : "button label-fade-out"
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
              consolidatedView.some((item: any) => item.title === newArr.title) ? (
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
          &nbsp;&nbsp;&nbsp;&nbsp;
          <SmallTittles label="Select to add FDA disclaimer to the bottom of your menu" />
        </div>
      ) : null}
    </div>
  );
}
