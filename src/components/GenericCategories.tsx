import { useState } from "react";
import Label from "./Label";
import { Field } from "../data/wings"; // Field is the same in all data files
import SmallTittles from "./SmallTittles";

// import "./GnericCategories.css";

type Props = {
  fields: Field[];
  title: string;
  children: React.ReactNode;  // This prop accepts the child components
  selectedCategoryItems: Field[]; // prop to maintain the state
  showCategoryItemsFunc: (updatedItems: Field[]) => void;
};

export default function GnericCategories(
  {
  fields,
  title,
  children,
  selectedCategoryItems,
  showCategoryItemsFunc,
}: Props
) {
  const [titleSelected, setTitleSelected] = useState(false);


  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
  };

  const selectedCategoryItem = (item: Field) => {
    const isPresent = selectedCategoryItems.some(
      (selectedItem) => selectedItem.label === item.label
    );
  
    const updatedItems = isPresent
      ? selectedCategoryItems.filter((selectedItem) => selectedItem.label !== item.label)
      : [...selectedCategoryItems, item];
  
      showCategoryItemsFunc(updatedItems);
  };
  

  // **Directly update price in localSelectedCategoryItem**
  // const handlePriceChange = (name: string, value: number) => {
  //   setLocalSelectedCategoryItem((prev) =>
  //     prev.map((item) =>
  //       item.label === name
  //         ? { ...item, price: { ...item.price, value } }
  //         : item
  //     )
  //   );
  // };

  // Trigger the parent (App) with the updated sharables
  // useEffect(() => {
  //   readyForPreview(localSelectedCategoryItem); // Pass the updated sharables back to App
  // }, [localSelectedCategoryItem]);

  // useEffect(() => {
  //   // Sync the localSelectedCategoryItem with props.selectedCategoryItem when returning to GnericCategories
  //   // showCategoryItemsFunc(selectedCategoryItems);
  //   console.log(selectedCategoryItems)
  // }, [selectedCategoryItems]);

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
                  onChange={() => selectedCategoryItem(item)}
                  checked={selectedCategoryItems.some(
                    (selectedItem) => selectedItem.label === item.label
                  )}
                  name={item.label}
                />
                <Label label={item.label} htmlFor={item.label} />
              </div>
            )}
            {item.type === "number" && (
              <div className="checkbox">
                <input
                  id={item.label}
                  type="number"
                  value={
                    selectedCategoryItems.find(
                      (selectedItem) => selectedItem.label === item.label
                    )?.price.value || ""
                  }
                  // onChange={(e) =>
                  //   handlePriceChange(item.label, +e.target.value)
                  // }
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
