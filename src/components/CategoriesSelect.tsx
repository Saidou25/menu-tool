import { Field } from "../data/types";
import { useAppState } from "../hooks/useAppState";

import CategoryItems from "./CategoryItems";
import Label from "./Label";
import SelectedCategoryItems from "./SelectedCategoryItems";
import SmallTittles from "./SmallTittles";

type Props = {
  categoriesList: Array<{ title: string; subtitle?: string; items: Field[] }>;
};

export default function CategoriesSelect({ categoriesList }: Props) {
  const {
    localSelectedCategoryItems,
    showDisclaimer,
    setShowDisclaimer,
    setLocalSelectedCategoryItems,
    setFadeInOut,
    fadeInOut,
  } = useAppState();

  const handleDisclaimer = () => {
    setShowDisclaimer(!showDisclaimer);
  };

  const funcFadeInOut = (newState: boolean) => {
    setFadeInOut(newState);
  };

  const showCategoryItems = (
    categoryTitle: string,
    updatedSelectedCategoryItems: Field[]
  ) => {
    setLocalSelectedCategoryItems((prevState: any) => {
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

  // Updates price in localSelectedCategoryItems
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedCategoryItems((prev: any) => {
      // Iterates over categories to find the one containing the item
      const updatedCategories = Object.keys(prev).reduce(
        (acc, categoryTitle) => {
          const updatedItems = prev[categoryTitle].items.map((item: any) =>
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

  return (
    <div className="col-11">
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
          &nbsp;&nbsp;&nbsp;&nbsp;
          <SmallTittles label="Select to add FDA disclaimer to the bottom of your menu" />
        </div>
      </div>
    </div>
  );
}
