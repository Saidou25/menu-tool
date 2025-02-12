import { useEffect, useState } from "react";
import { Field, sharablesList } from "../data/sharables";
import PreviewItems from "./PreviewItems";
import GenericCategories from "./GenericCategories";

import "./Sharables.css";

type Props = {
  readyForPreview: (selectedSharables: Field[]) => void;
  selectedSharables: Field[]; // prop to maintain the state
};

export default function Sharables({
  readyForPreview,
  selectedSharables,
}: Props) {
  const [localSelectedSharables, setLocalSelectedSharables] =
    useState<Field[]>(selectedSharables);

  const { fields: fieldsItems, title } = sharablesList;

  // **Directly update price in localSelectedSharables**
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedSharables((prev) =>
      prev.map((item) =>
        item.label === name
          ? { ...item, price: { ...item.price, value } }
          : item
      )
    );
  };

  const showCategoryItems = (updatedItems: Field[]) => {
    setLocalSelectedSharables(updatedItems);
  };

  // Trigger the parent (App) with the updated sharables
  useEffect(() => {
    readyForPreview(localSelectedSharables); // Pass the updated sharables back to App
  }, [localSelectedSharables]);

  useEffect(() => {
    // Sync the localSelectedSharables with props.selectedSharables when returning to Sharables
    setLocalSelectedSharables(selectedSharables);
  }, [selectedSharables]);

  return (
    <div className="sharables-container">
      <GenericCategories
        selectedCategoryItems={localSelectedSharables}
        fields={fieldsItems}
        title={title}
        showCategoryItemsFunc={showCategoryItems}
      >
        <PreviewItems
          selectedCategoryItems={localSelectedSharables} // Pass updated sharables here
          handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
        />
      </GenericCategories>
    </div>
  );
}
