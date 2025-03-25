import { useState } from "react";
import { Field, MenuCategory, MenuCustomCategory } from "../data/types";
import Label from "./Label";
import SmallTittles from "./SmallTittles";
import Checkbox from "./Checkbox";

import "./CategoryItems.css";

type CategoriesProps = {
  newArr: any;
    newCustomArray: MenuCustomCategory[];
    setNewCustomArray: React.Dispatch<React.SetStateAction<MenuCustomCategory[]>>;
  newArray: MenuCategory[]; // Accept newArray from parent
  setNewArray: React.Dispatch<React.SetStateAction<MenuCategory[]>>; // Accept setNewArray from parent
  selectedData: Record<string, { subtitle?: string; items: Field[] }>; // Update here
  consolidatedView: { item: boolean, title: string };
  fields: Field[]; // Fields data from the parent component used to display in the current the component
  title: string; // Title data from the parent component used to display in the current component
  children?: React.ReactNode; // This prop accepts the child components
  selectedCategoryItems: Field[]; // prop to maintain the state in parent component
  // showCustomCategoryItemsFunc: (categoryTitle: string, item: Field) => void;
  // Define the function type in the props fadeInOutFunc: (newState: boolean) => void;
};

export default function CustomCategoryItems({
  newArr,
  newCustomArray,
  setNewCustomArray,
  newArray,
  setNewArray,
  // consolidatedView,
  fields,
  title,
  children,
  // showCustomCategoryItemsFunc,
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

  const selectCustomCategoryItem = (categoryTitle: string, item: Field, title: string) => {

    if (!Array.isArray(newArray)) {
      console.error("newArr is not an array or is undefined:", newArr);
      return;
    }
  
    const updatedArray = newArray.map((category) => {
      // console.log("category", category);
      if (category.title === categoryTitle) {
        // Check if the item is already in the category's items array
        const updatedItems = category.items.filter(
          (existingItem) => existingItem.label !== item.label // Remove item if it's already present
        );
  
        // If the item is not already in the array, add it
        if (updatedItems.length === category.items.length) {
          updatedItems.push(item); // Item wasn't found, so we add it
        }
        return { ...category, items: updatedItems };
      }
      return category; // Keep other categories unchanged
    });
    // Update state with the new array
    setNewArray(updatedArray);


    const updatedCustomArray = newCustomArray.map((category) => {
      
      if (category.title === categoryTitle) {
      let updatedSubCategories = category.subCategories.map((subCategory) => {
        if (subCategory.subCategoryTitle === title) {
          // Remove item if already present
          const updatedItems = subCategory.items.filter((existingItem) => existingItem.label !== item.label);
          updatedItems.push(item); // Add new item

          return { ...subCategory, items: updatedItems };
        }
        return subCategory; // Keep other subcategories unchanged
      });

      // If the subcategory doesn't exist, add it
      if (!category.subCategories.some((sub) => sub.subCategoryTitle === title)) {
        updatedSubCategories = [
          ...category.subCategories,
          { subCategoryTitle: title, items: [item] },
        ];
      }

      return { ...category, subCategories: updatedSubCategories };
    }
    return category; // Keep other categories unchanged
  });

  // Update state with the new array
  setNewCustomArray(updatedCustomArray);
  };

  // console.log(newCustomArray);

  return (
    <div>
      {/* {consolidatedView && ( */}

      <div className="categories-titles">
        <Checkbox
          className="checkbox-category"
          id={title}
          onChange={handleSelectTitle}
          checked={titleSelected}
          name={title}
        />
        <SmallTittles label={title} />
      </div>
      {/* )} */}

      {/* {consolidatedView && ( */}
      <div className={fadeInOut ? "fields-div" : "fields-div-out"}>
        {fields &&
          titleSelected &&
          fields.map((item) => (
            <div key={item.label}>
              {item.type === "checkbox" && (
                <>
                  <Checkbox
                    className={
                      fadeInOut
                        ? "checkbox-category-item-in"
                        : "checkbox-category-item-out"
                    }
                    id={`${newArr.title}-${item.label}`} // Ensure unique ID
                    onChange={() =>
                      selectCustomCategoryItem(newArr.title, item, title)
                    } 
                    checked={newArray
                      .find((category) => category.title === newArr.title) // Find the category by title
                      ?.items.some((existingItem) => existingItem.label === item.label) || false}
                    
                    name={item.label}
                  />

                  <Label
                    label={item.label}
                    htmlFor={item.label}
                    fadeInOut={fadeInOut}
                  />
                </>
              )}
            </div>
          ))}
      </div>
      {/* )} */}
      {children}
    </div>
  );
}
