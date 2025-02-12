import { useState } from "react";
import { Field } from "../data/wings"; // Field is the same in all data files
import Label from "./Label";
import SmallTittles from "./SmallTittles";

// import "./CategoryItems.css";

type Props = {
  fields: Field[]; // Fields data from the parent component used to display in the current the component
  title: string; // Title data from the parent component used to display in the current component
  children: React.ReactNode; // This prop accepts the child components
  selectedCategoryItems: Field[]; // prop to maintain the state in parent component
  showCategoryItemsFunc: (updatedSelectedCategoryItems: Field[]) => void;
};

export default function CategoryItems({
  fields,
  title,
  children,
  selectedCategoryItems,
  showCategoryItemsFunc,
}: Props) {
  const [titleSelected, setTitleSelected] = useState(false);

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
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
    <div className="sharables-container">
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
      <div className="fields-div">
        {fields &&
          titleSelected &&
          fields.map((item) => (
            <div className="checkbox-container" key={item.label}>
              {item.type === "checkbox" && (
                <div className="checkbox">
                  <input
                    className="checkbox-check"
                    id={item.label}
                    type={item.type}
                    onChange={() => selectCategoryItem(item)}
                    checked={selectedCategoryItems.some(
                      (existingItem) => existingItem.label === item.label
                    )}
                    name={item.label}
                  />
                  <Label label={item.label} htmlFor={item.label} />
                </div>
              )}
            </div>
          ))}
      </div>
      {children}
    </div>
  );
}
