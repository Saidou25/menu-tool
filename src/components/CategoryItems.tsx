import { useState } from "react";
import { Field } from "../data/wings"; // Field is the same in all data files
import Label from "./Label";
import SmallTittles from "./SmallTittles";

import "./CategoryItems.css";

type CategoriesProps = {
  fields: Field[]; // Fields data from the parent component used to display in the current the component
  title: string; // Title data from the parent component used to display in the current component
  children: React.ReactNode; // This prop accepts the child components
  selectedCategoryItems: Field[]; // prop to maintain the state in parent component
  showCategoryItemsFunc: (updatedSelectedCategoryItems: Field[]) => void;
  fadeInOutFunc: (newState: boolean) => void;
};

export default function CategoryItems({
  fields,
  title,
  children,
  selectedCategoryItems,
  showCategoryItemsFunc,
  fadeInOutFunc,
}: CategoriesProps) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [fadeInOut, setFadeInOut] = useState(false);

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
    fadeInOutFunc(newState);
    setFadeInOut(newState);
  };

  const selectCategoryItem = (item: Field) => {
    const isPresent = selectedCategoryItems.some(
      (existingItem) => existingItem.label === item.label
    );

    // Only modify the selected items for this category
    const updatedSelectedCategoryItems = isPresent
      ? selectedCategoryItems.filter(
          (existingItem) => existingItem.label !== item.label
        )
      : [...selectedCategoryItems, item];

    // Update the selected items in the parent component
    showCategoryItemsFunc(updatedSelectedCategoryItems);
  };

  return (
    <div className="category-items-container">
      <div className="categories-titles">
        <input
          className="checkbox-category"
          id={title}
          type="checkbox"
          onChange={handleSelectTitle}
          checked={titleSelected}
          name={title}
        />
        <SmallTittles label={title} />
      </div>
      <div className={fadeInOut ? "fields-div" : "fields-div-out"}>
        {fields &&
          titleSelected &&
          fields.map((item) => (
            <div key={item.label}>
              {item.type === "checkbox" && (
                <>
                  <input
                    className={
                      fadeInOut
                        ? "checkbox-category-item-in"
                        : "checkbox-category-item-out"
                    }
                    id={item.label}
                    type={item.type}
                    onChange={() => selectCategoryItem(item)}
                    checked={selectedCategoryItems.some(
                      (existingItem) => existingItem.label === item.label
                    )}
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
      {children}
    </div>
  );
}
