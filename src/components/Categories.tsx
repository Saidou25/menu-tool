import { useEffect, useState } from "react";
import { Field } from "../data/types";
import SelectedCategoryItems from "./SelectedCategoryItems";
import CategoryItems from "./CategoryItems";
import PreviewMenu from "./PreviewMenu";
import DropDown from "./DropDown";
import SmallTittles from "./SmallTittles";

import "./Categories.css";

type Props = {
  categoriesList: Array<{ title: string; subtitle?: string; items: Field[] }>;
  selectedData: Record<string, { subtitle?: string; items: Field[] }>; // Update here
  menuSampleDataFunc: (
    localSelectedCategoryItems: Record<
      string,
      { subtitle?: string; items: Field[] }
    >
  ) => void;
};

export default function Categories({
  selectedData,
  menuSampleDataFunc,
  categoriesList,
}: Props) {
  const [fadeInOut, setFadeInOut] = useState(false);
  const [menuPreview, setMenuPreview] = useState(false);
  const [menuFormat, setMenuFormat] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [localSelectedCategoryItems, setLocalSelectedCategoryItems] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});

  const handleDisclaimer = () => {
    setShowDisclaimer((prev) => !prev);
  };

  const selectMenuFormat = (item: string) => {
    setMenuFormat(item);
  };

  const funcFadeInOut = (newState: boolean) => {
    setFadeInOut(newState);
  };

  const handleGoBack = () => {
    setMenuPreview(false);
    setMenuFormat("");
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

  if (menuPreview || menuFormat) {
    return (
      <PreviewMenu
        menuFormat={menuFormat}
        goBack={handleGoBack}
        onConfirm={handleConfirm}
        message="Confirm printing or continue editing"
        showDisclaimer={showDisclaimer}
        dataSample={localSelectedCategoryItems}
      />
    );
  }

  return (
    <>
      <div className="row">
        <h1>Categories for your menu</h1>
        {categoriesList.map((category, index) => (
          <div className="col-3 categories" key={index}>
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
      <br />
      <div className="categories-titles">
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
      <br />
      <br />
      <DropDown selectDropDownItem={selectMenuFormat} message="formats" />
    </>
  );
}
