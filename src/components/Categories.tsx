import { useEffect, useState } from "react";
import { Field } from "../data/sharables";
import SelectedCategoryItems from "./SelectedCategoryItems";
import CategoryItems from "./CategoryItems";

import "./Categories.css";

type Obj = any;

type Props = {
  categoriesList: Obj[];
  selectedData: Record<string, Field[]>;
  menuSampleDataFunc: (localSelectedCategoryItems: Record<string, Field[]>) => void;
};

export default function Categories({ selectedData,menuSampleDataFunc, categoriesList }: Props) {
  const [fadeInOut, setFadeInOut] = useState(false);
  const [localSelectedCategoryItems, setLocalSelectedCategoryItems] = useState<
    Record<string, Field[]>
  >(selectedData);

  console.log(localSelectedCategoryItems)
  const funcFadeInOut = (newState: boolean) => {
    setFadeInOut(newState);
  };

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

  useEffect(() => {
    if (Object.keys(localSelectedCategoryItems).length > 0) { 
      menuSampleDataFunc(localSelectedCategoryItems);
    }
  }, [localSelectedCategoryItems, menuSampleDataFunc]);
  

  return (
    <div className="row g-0">
      {categoriesList &&
        categoriesList.map((category, index) => {
          // Get selected category items for the current category title
          return (
            <div className="col-3 categories" key={index}>
              <CategoryItems
                selectedCategoryItems={
                  localSelectedCategoryItems[category.title] || []
                } // Pass category-specific selected items
                fields={category.fields} // Pass fields for this category
                title={category.title} // Pass category title
                showCategoryItemsFunc={(updatedItems) =>
                  showCategoryItems(category.title, updatedItems)
                } // Update selected items for specific category
                fadeInOutFunc={funcFadeInOut}
              >
                <SelectedCategoryItems
                  selectedCategoryItems={
                    localSelectedCategoryItems[category.title] || []
                  } // Pass selected items for this category
                  handlePriceChange={handlePriceChange} // Assume category-specific price change handler
                  fadeInOut={fadeInOut}
                />
              </CategoryItems>
            </div>
          );
        })}
    </div>
  );
}
