import { useEffect, useState } from "react";
import { Field, soupsList } from "../data/soups";
import Label from "./Label";
import PreviewItems from "./PreviewItems";

type Props = {
    readyForPreview: (selectedSoups: Field[]) => void;
  selectedSoups: Field[]; // prop to maintain the state
};

export default function Wings({
    readyForPreview,
  selectedSoups,
}: Props) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [localSelectedSoups, setLocalSelectedSoups] =
    useState<Field[]>(selectedSoups);

  const { fields, title } = soupsList;

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
  };

  const selectWing = (soup: Field) => {
    setLocalSelectedSoups((prev) => {
      const isPresent = prev.some((item) => item.label === soup.label);
      if (isPresent) {
        // Remove the item if it's already selected
        return prev.filter((item) => item.label !== soup.label);
      }
      // Add the new soup item to the array
      return [...prev, soup];
    });
  };

  // **Directly update price in localSelectedSoups**
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedSoups((prev) =>
      prev.map((item) =>
        item.label === name
          ? { ...item, price: { ...item.price, value } }
          : item
      )
    );
  };

  // Trigger the parent (App) with the updated sharables
  useEffect(() => {
    readyForPreview(localSelectedSoups); // Pass the updated sharables back to App
  }, [localSelectedSoups]);

  useEffect(() => {
    // Sync the localSelectedSoups with props.selectedSoups when returning to Wings
    setLocalSelectedSoups(selectedSoups);
  }, [selectedSoups]);

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
        fields.map((soup) => (
          <div className="checkbox-container" key={soup.label}>
            {soup.type === "checkbox" && (
              <div className="checkbox">
                <input
                  className="checkbox-check"
                  id={soup.label}
                  type={soup.type}
                  onChange={() => selectWing(soup)}
                  checked={selectedSoups.some(
                    (item) => item.label === soup.label
                  )}
                  name={soup.label}
                />
                <Label label={soup.label} htmlFor={soup.label} />
              </div>
            )}
            {soup.type === "number" && (
              <div className="checkbox">
                <input
                  id={soup.label}
                  type="number"
                  value={
                    localSelectedSoups.find(
                      (item) => item.label === soup.label
                    )?.price.value || ""
                  }
                  onChange={() => selectWing(soup)}
                  name={soup.label}
                />
                <Label label={soup.label} htmlFor={soup.label} />
              </div>
            )}
          </div>
        ))}
      <br />
      {localSelectedSoups?.length ? (
        <PreviewItems
          selectedSoups={localSelectedSoups} // Pass updated sharables here
          handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
        />
      ) : null}
    </div>
  );
}
