import { useEffect, useState } from "react";
import { Field, sharablesList } from "../data/sharables";
import Label from "./Label";
import PreviewItems from "./PreviewItems";

type Props = {
  readyForPreview: (selectedSharables: Field[]) => void;
  selectedSharables: Field[]; // prop to maintain the state
};

export default function Sharables({
  readyForPreview,
  selectedSharables,
}: Props) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [localSelectedSharables, setLocalSelectedSharables] =
    useState<Field[]>(selectedSharables);

  const { fields, title } = sharablesList;

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
  };

  const selectSharable = (sharable: Field) => {
    setLocalSelectedSharables((prev) => {
      const isPresent = prev.some((item) => item.label === sharable.label);
      if (isPresent) {
        // Remove the item if it's already selected
        return prev.filter((item) => item.label !== sharable.label);
      }
      // Add the new sharable item to the array
      return [...prev, sharable];
    });
  };

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

  // Trigger the parent (App) with the updated sharables
  useEffect(() => {
    readyForPreview(localSelectedSharables); // Pass the updated sharables back to App
  }, [localSelectedSharables]);

  useEffect(() => {
    // Sync the localSelectedSharables with props.selectedSharables when returning to Sharables
    setLocalSelectedSharables(selectedSharables);
  }, [selectedSharables]);

  return (
    <div className={titleSelected ? "sharables-container" : ""}>
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
        fields.map((sharable) => (
          <div className="checkbox-container" key={sharable.label}>
            {sharable.type === "checkbox" && (
              <div className="checkbox">
                <input
                  className="checkbox-check"
                  id={sharable.label}
                  type={sharable.type}
                  onChange={() => selectSharable(sharable)}
                  checked={selectedSharables.some(
                    (item) => item.label === sharable.label
                  )}
                  name={sharable.label}
                />
                <Label label={sharable.label} htmlFor={sharable.label} />
              </div>
            )}
            {sharable.type === "number" && (
              <div className="checkbox">
                <input
                  id={sharable.label}
                  type="number"
                  value={
                    localSelectedSharables.find(
                      (item) => item.label === sharable.label
                    )?.price.value || ""
                  }
                  onChange={(e) =>
                    handlePriceChange(sharable.label, +e.target.value)
                  }
                  name={sharable.label}
                />
                <Label label={sharable.label} htmlFor={sharable.label} />
              </div>
            )}
          </div>
        ))}
      <br />
      {localSelectedSharables?.length ? (
        <div>
          <br />
          <PreviewItems
            selectedSharables={localSelectedSharables} // Pass updated sharables here
            handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
          />
        </div>
      ) : null}
    </div>
  );
}
