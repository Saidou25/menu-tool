import { useEffect, useState } from "react";
import { Field, sandwichesList } from "../data/sandwiches";
import Label from "./Label";
import PreviewItems from "./PreviewItems";

type Props = {
  readyForPreview: (selecteSandwiches: Field[]) => void;
  selectedSandwiches: Field[]; // prop to maintain the state
};

export default function Sharables({
  readyForPreview,
  selectedSandwiches,
}: Props) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [localSelectedSandwiches, setLocalSelectedSandwiches] =
    useState<Field[]>(selectedSandwiches);

  const { fields, title } = sandwichesList;

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
  };

  const selectSandwich = (sandwich: Field) => {
    setLocalSelectedSandwiches((prev) => {
      const isPresent = prev.some((item) => item.label === sandwich.label);
      if (isPresent) {
        // Remove the item if it's already selected
        return prev.filter((item) => item.label !== sandwich.label);
      }
      // Add the new sandwich item to the array
      return [...prev, sandwich];
    });
  };

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
        fields.map((sandwich) => (
          <div className="checkbox-container" key={sandwich.label}>
            {sandwich.type === "checkbox" && (
              <div className="checkbox">
                <input
                  className="checkbox-check"
                  id={sandwich.label}
                  type={sandwich.type}
                  onChange={() => selectSandwich(sandwich)}
                  checked={selectedSandwiches.some(
                    (item) => item.label === sandwich.label
                  )}
                  name={sandwich.label}
                />
                <Label label={sandwich.label} htmlFor={sandwich.label} />
              </div>
            )}
            {sandwich.type === "number" && (
              <div className="checkbox">
                <input
                  id={sandwich.label}
                  type="number"
                  value={
                    localSelectedSandwiches.find(
                      (item) => item.label === sandwich.label
                    )?.price.value || ""
                  }
                  onChange={(e) => handlePriceChange(sandwich.label, +e.target.value)}
                  name={sandwich.label}
                />
                <Label label={sandwich.label} htmlFor={sandwich.label} />
              </div>
            )}
          </div>
        ))}
      <br />
      {localSelectedSandwiches?.length ? (
        <PreviewItems
          selectedSandwiches={localSelectedSandwiches} // Pass updated sharables here
          handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
        />
      ) : null}
    </div>
  );
}
