import { useEffect, useState } from "react";
import { Field, saladsList } from "../data/salads";

import PreviewItems from "./PreviewItems";
import GenericCategories from "./GenericCategories";

type Props = {
  readyForPreview: (selectedSalads: Field[]) => void;
  selectedSalads: Field[]; // prop to maintain the state
};

export default function Salads({ readyForPreview, selectedSalads }: Props) {
  const [localSelectedSalads, setLocalSelectedSalads] =
    useState<Field[]>(selectedSalads);

  const { fields: fieldsItems, title } = saladsList;
 
  // **Directly update price in localSelectedSalads**
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedSalads((prev) =>
      prev.map((item) =>
        item.label === name
          ? { ...item, price: { ...item.price, value } }
          : item
      )
    );
  };

  const showCategoryItems = (updatedItems: Field[]) => {
    setLocalSelectedSalads(updatedItems);
    };
  

  // Trigger the parent (App) with the updated sharables
  useEffect(() => {
    readyForPreview(localSelectedSalads); // Pass the updated sharables back to App
  }, [localSelectedSalads]);

  useEffect(() => {
    // Sync the localSelectedSalads with props.selectedSalads when returning to Salads
    setLocalSelectedSalads(selectedSalads);
  }, [selectedSalads]);

  return (
    <div>
      <GenericCategories
        selectedCategoryItems={localSelectedSalads}
        fields={fieldsItems}
        title={title}
        showCategoryItemsFunc={showCategoryItems}
      >
        <PreviewItems
          selectedCategoryItems={localSelectedSalads} // Pass updated sharables here
          handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
        />
      </GenericCategories>
    </div>
  );
}
