import { useEffect, useState } from "react";
import { Field, saladsList } from "../data/salads";
import Label from "./Label";
import PreviewItems from "./PreviewItems";

type Props = {
  readyForPreview: (selectedSalads: Field[]) => void;
  selectedSalads: Field[]; // prop to maintain the state
};

export default function Salads({ readyForPreview, selectedSalads }: Props) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [localSelectedSalads, setLocalSelectedSalads] =
    useState<Field[]>(selectedSalads);

  const { fields, title } = saladsList;
  // console.log(fields);

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
  };

  const selectedSalad = (salad: Field) => {
    setLocalSelectedSalads((prev) => {
      const isPresent = prev.some((item) => item.label === salad.label);
      if (isPresent) {
        // Remove the item if it's already selected
        return prev.filter((item) => item.label !== salad.label);
      }
      // Add the new salad item to the array
      return [...prev, salad];
    });
  };

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
      <input
        className="checkbox-check"
        id={title}
        type="checkbox"
        onChange={handleSelectTitle}
        checked={titleSelected}
        name={title}
      />
      <Label label={title} htmlFor={title} />
      {fields &&
        titleSelected &&
        fields.map((salad) => (
          <div className="checkbox-container" key={salad.label}>
            {salad.type === "checkbox" && (
              <div className="checkbox">
                <input
                  className="checkbox-check"
                  id={salad.label}
                  type={salad.type}
                  onChange={() => selectedSalad(salad)}
                  checked={localSelectedSalads.some(
                    (item) => item.label === salad.label
                  )}
                  name={salad.label}
                />
                <Label label={salad.label} htmlFor={salad.label} />
              </div>
            )}
            {salad.type === "number" && (
              <div className="checkbox">
                <input
                  id={salad.label}
                  type="number"
                  value={
                    localSelectedSalads.find(
                      (item) => item.label === salad.label
                    )?.price.value || ""
                  }
                  onChange={(e) =>
                    handlePriceChange(salad.label, +e.target.value)
                  }
                  name={salad.label}
                />
                <Label label={salad.label} htmlFor={salad.label} />
              </div>
            )}
          </div>
        ))}
      <br />
      {localSelectedSalads?.length ? (
        <PreviewItems
          selectedSalads={localSelectedSalads}
          handlePriceChange={handlePriceChange}
        />
      ) : null}
    </div>
  );
}
