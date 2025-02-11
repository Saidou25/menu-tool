import { useEffect, useState } from "react";
import { Field, sidesList } from "../data/sides";
import Label from "./Label";
import PreviewItems from "./PreviewItems";

type Props = {
  readyForPreview: (selectedSides: Field[]) => void;
  selectedSides: Field[]; // prop to maintain the state
};

export default function Sharables({
  readyForPreview,
  selectedSides,
}: Props) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [localSelectedSides, setLocalSelectedSides] =
    useState<Field[]>(selectedSides);

  const { fields, title } = sidesList;

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
  };

  const selectSharable = (side: Field) => {
    setLocalSelectedSides((prev) => {
      const isPresent = prev.some((item) => item.label === side.label);
      if (isPresent) {
        // Remove the item if it's already selected
        return prev.filter((item) => item.label !== side.label);
      }
      // Add the new side item to the array
      return [...prev, side];
    });
  };

  // **Directly update price in localSelectedSides**
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedSides((prev) =>
      prev.map((item) =>
        item.label === name
          ? { ...item, price: { ...item.price, value } }
          : item
      )
    );
  };

  // Trigger the parent (App) with the updated sharables
  useEffect(() => {
    readyForPreview(localSelectedSides); // Pass the updated sharables back to App
  }, [localSelectedSides]);

  useEffect(() => {
    // Sync the localSelectedSides with props.selectedSides when returning to Sharables
    setLocalSelectedSides(selectedSides);
  }, [selectedSides]);

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
        fields.map((side) => (
          <div className="checkbox-container" key={side.label}>
            {side.type === "checkbox" && (
              <div className="checkbox">
                <input
                  className="checkbox-check"
                  id={side.label}
                  type={side.type}
                  onChange={() => selectSharable(side)}
                  checked={selectedSides.some(
                    (item) => item.label === side.label
                  )}
                  name={side.label}
                />
                <Label label={side.label} htmlFor={side.label} />
              </div>
            )}
            {side.type === "number" && (
              <div className="checkbox">
                <input
                  id={side.label}
                  type="number"
                  value={
                    localSelectedSides.find(
                      (item) => item.label === side.label
                    )?.price.value || ""
                  }
                  onChange={(e) => handlePriceChange(side.label, +e.target.value)}
                  name={side.label}
                />
                <Label label={side.label} htmlFor={side.label} />
              </div>
            )}
          </div>
        ))}
      <br />
      {localSelectedSides?.length ? (
        <PreviewItems
          selectedSides={localSelectedSides} // Pass updated sharables here
          handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
        />
      ) : null}
    </div>
  );
}
