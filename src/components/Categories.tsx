import { useState } from "react";
import { Field } from "../data/sharables";
import SelectedCategoryItems from "./SelectedCategoryItems";
import CategoryItems from "./CategoryItems";

import "./Sharables.css";
type Obj = any;

type Props = {
  categoriesList: Obj[];
};

export default function Categories({ categoriesList }: Props) {
  const [localSelectedCategoryItems, setLocalSelectedCategoryItems] = useState<
    Record<string, Field[]>
  >({});

  //   **Directly update price in localSelectedCategoryItems**
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedCategoryItems((prev) => {
      // Iterate over categories to find the one containing the item
      const updatedCategories = Object.keys(prev).reduce(
        (acc, categoryTitle) => {
          acc[categoryTitle] = prev[categoryTitle].map((item) =>
            item.label === name
              ? { ...item, price: { ...item.price, value } }
              : item
          );
          return acc;
        },
        {} as Record<string, Field[]>
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
      [categoryTitle]: updatedSelectedCategoryItems, // Update the selected items for the current category
    }));
  };

  return (
    <div className="row">
      <br />
      <br />
      <br />
      {categoriesList &&
        categoriesList.map((category, index) => {
          // Get selected category items for the current category title
          return (
            <div className="col-3" key={index}>
              <CategoryItems
                selectedCategoryItems={
                  localSelectedCategoryItems[category.title] || []
                } // Pass category-specific selected items
                fields={category.fields} // Pass fields for this category
                title={category.title} // Pass category title
                showCategoryItemsFunc={(updatedItems) =>
                  showCategoryItems(category.title, updatedItems)
                } // Update selected items for specific category
              >
                <SelectedCategoryItems
                  selectedCategoryItems={
                    localSelectedCategoryItems[category.title] || []
                  } // Pass selected items for this category
                  handlePriceChange={handlePriceChange} // Assume category-specific price change handler
                />
              </CategoryItems>
            </div>
          );
        })}
    </div>
  );
}
