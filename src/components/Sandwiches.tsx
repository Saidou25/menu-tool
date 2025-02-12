import { useEffect, useState } from "react";
import { Field, sandwichesList } from "../data/sandwiches";
import PreviewItems from "./PreviewItems";
import GenericCategories from "./GenericCategories";

type Props = {
  readyForPreview: (selecteSandwiches: Field[]) => void;
  selectedSandwiches: Field[]; // prop to maintain the state
};

export default function Sharables({
  readyForPreview,
  selectedSandwiches,
}: Props) {
  const [localSelectedSandwiches, setLocalSelectedSandwiches] =
    useState<Field[]>(selectedSandwiches);

  const { fields: fieldsItems, title } = sandwichesList;


  const showCategoryItems = (updatedItems: Field[]) => {
    setLocalSelectedSandwiches(updatedItems)
    }

  // **Directly update price in localSelectedSandwiches**
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedSandwiches((prev) =>
      prev.map((item) =>
        item.label === name
          ? { ...item, price: { ...item.price, value } }
          : item
      )
    );
  };

  // Trigger the parent (App) with the updated sharables
  useEffect(() => {
    readyForPreview(localSelectedSandwiches); // Pass the updated sharables back to App
  }, [localSelectedSandwiches]);

  useEffect(() => {
    // Sync the localSelectedSandwiches with props.selectedSandwiches when returning to Sharables
    setLocalSelectedSandwiches(selectedSandwiches);
  }, [selectedSandwiches]);

  return (
    <div>
     <GenericCategories
             selectedCategoryItems={localSelectedSandwiches}
             fields={fieldsItems}
             title={title}
             showCategoryItemsFunc={showCategoryItems}
           >
             <PreviewItems
               selectedCategoryItems={localSelectedSandwiches} // Pass updated sharables here
               handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
             />
           </GenericCategories>
    </div>
  );
}
