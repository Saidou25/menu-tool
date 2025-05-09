import { useState } from "react";
import { Field, MenuCustomCategory } from "../data/types";
import Input from "./Input";

import "./CategoryItems.css";

type CategoriesProps = {
  newArr: any;
  newCustomArray: MenuCustomCategory[];
  setNewCustomArray: React.Dispatch<React.SetStateAction<MenuCustomCategory[]>>;
  selectedData: Record<string, { subtitle?: string; items: Field[] }>; // Update here
  fields: Field[]; // Fields data from the parent component used to display in the current the component
  title: string; // Title data from the parent component used to display in the current component
  children?: React.ReactNode; // This prop accepts the child components
  selectedCategoryItems: Field[]; // prop to maintain the state in parent component
};

export default function CustomCategoryItems({
  newArr,
  newCustomArray,
  setNewCustomArray,
  fields,
  title,
  children,
}: // fadeInOutFunc,
CategoriesProps) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [fadeInOut, setFadeInOut] = useState(false);

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
    // fadeInOutFunc(newState);
    setFadeInOut(newState);
  };

  const selectCustomCategoryItem = (
    categoryTitle: string,
    item: Field,
    title: string
  ) => {
    if (!Array.isArray(newCustomArray)) {
      console.error(
        "newCustomArray is not an array or is undefined:",
        newCustomArray
      );
      return;
    }

    const updatedCustomArray = newCustomArray.map((category) => {
      if (category.title === categoryTitle) {
        let updatedSubCategories = category.subCategories.map((subCategory) => {
          if (subCategory.subCategoryTitle === title) {
            // Remove item if already present
            let updatedItems = subCategory.items.filter(
              (existingItem) => existingItem.label !== item.label
            );

            // If the item was NOT removed, it means it wasn't there, so we add it
            if (updatedItems.length === subCategory.items.length) {
              updatedItems.push(item);
            }

            return { ...subCategory, items: updatedItems };
          }
          return subCategory; // Keep unchanged subcategories
        });

        // Remove empty subcategories
        updatedSubCategories = updatedSubCategories.filter(
          (subCategory) => subCategory.items.length > 0
        );

        // If the subcategory doesn’t exist, add it
        if (
          !category.subCategories.some((sub) => sub.subCategoryTitle === title)
        ) {
          updatedSubCategories.push({ subCategoryTitle: title, items: [item] });
        }

        return { ...category, subCategories: updatedSubCategories };
      }
      return category; // Keep other categories unchanged
    });

    // Update state with the new array
    setNewCustomArray(updatedCustomArray);
  };

  return (
    <div>
      <div className="categories-titles">
        <Input
          type="checkbox"
          className="checkbox-category"
          id={title}
          onChange={handleSelectTitle}
          checked={titleSelected}
          name={title}
          smallTitle={title}
        />
      </div>
      <div className={fadeInOut ? "fields-div" : "fields-div-out"}>
        {fields &&
          titleSelected &&
          fields.map((item) => (
            <div key={item.label}>
              {item.type === "checkbox" && (
                <Input
                  type="checkbox"
                  className={
                    fadeInOut
                      ? "checkbox-category-item-in"
                      : "checkbox-category-item-out"
                  }
                  id={`${newArr.title}-${item.label}`} // Ensure unique ID
                  onChange={() =>
                    selectCustomCategoryItem(newArr.title, item, title)
                  }
                  checked={
                    newCustomArray
                      .find((category) => category.title === newArr.title) // Find category
                      ?.subCategories.find(
                        (sub) => sub.subCategoryTitle === title
                      ) // Find subcategory
                      ?.items.some(
                        (existingItem) => existingItem.label === item.label
                      ) || false // Check if item exists
                  }
                  name={item.label}
                  label={item.label}
                  htmlFor={`${newArr.title}-${item.label}`}
                  // fadeInOut={fadeInOut}
                />
              )}
            </div>
          ))}
      </div>
      {children}
    </div>
  );
}
