import { useEffect, useState } from "react";
import { Field, wingsList } from "../data/wings";
import Label from "./Label";
import PreviewItems from "./PreviewItems";

type Props = {
    readyForPreview: (selectedWings: Field[]) => void;
  selectedWings: Field[]; // prop to maintain the state
};

export default function Wings({
    readyForPreview,
  selectedWings,
}: Props) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [localSelectedWings, setLocalSelectedWings] =
    useState<Field[]>(selectedWings);

  const { fields, title } = wingsList;

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
  };

  const selectWing = (wing: Field) => {
    setLocalSelectedWings((prev) => {
      const isPresent = prev.some((item) => item.label === wing.label);
      if (isPresent) {
        // Remove the item if it's already selected
        return prev.filter((item) => item.label !== wing.label);
      }
      // Add the new wing item to the array
      return [...prev, wing];
    });
  };

  // **Directly update price in localSelectedWings**
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedWings((prev) =>
      prev.map((item) =>
        item.label === name
          ? { ...item, price: { ...item.price, value } }
          : item
      )
    );
  };

  // Trigger the parent (App) with the updated sharables
  useEffect(() => {
    readyForPreview(localSelectedWings); // Pass the updated sharables back to App
  }, [localSelectedWings]);

  useEffect(() => {
    // Sync the localSelectedWings with props.selectedWings when returning to Wings
    setLocalSelectedWings(selectedWings);
  }, [selectedWings]);

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
        fields.map((wing) => (
          <div className="checkbox-container" key={wing.label}>
            {wing.type === "checkbox" && (
              <div className="checkbox">
                <input
                  className="checkbox-check"
                  id={wing.label}
                  type={wing.type}
                  onChange={() => selectWing(wing)}
                  checked={selectedWings.some(
                    (item) => item.label === wing.label
                  )}
                  name={wing.label}
                />
                <Label label={wing.label} htmlFor={wing.label} />
              </div>
            )}
            {wing.type === "number" && (
              <div className="checkbox">
                <input
                  id={wing.label}
                  type="number"
                  value={
                    localSelectedWings.find(
                      (item) => item.label === wing.label
                    )?.price.value || ""
                  }
                  onChange={() => selectWing(wing)}
                  name={wing.label}
                />
                <Label label={wing.label} htmlFor={wing.label} />
              </div>
            )}
          </div>
        ))}
      <br />
      {localSelectedWings?.length ? (
        <PreviewItems
          selectedWings={localSelectedWings} // Pass updated sharables here
          handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
        />
      ) : null}
    </div>
  );
}
