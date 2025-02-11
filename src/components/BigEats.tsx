import { useEffect, useState } from "react";
import { Field, bigEatsList } from "../data/bigEats";
import Label from "./Label";
import PreviewItems from "./PreviewItems";

type Props = {
  readyForPreview: (selectedBigEats: Field[]) => void;
  selectedBigEats: Field[]; // prop to maintain the state
};

export default function BigEats({
  readyForPreview,
  selectedBigEats,
}: Props) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [localSelectedBigEat, setLocalSelectedBigEats] =
    useState<Field[]>(selectedBigEats);

  const { fields, title } = bigEatsList;

  const handleSelectTitle = () => {
  const newState = titleSelected ? false : true;
  setTitleSelected(newState);
  };

  const selectBigEat = (bigEat: Field) => {
    setLocalSelectedBigEats((prev) => {
      const isPresent = prev.some((item) => item.label === bigEat.label);
      if (isPresent) {
        // Remove the item if it's already selected
        return prev.filter((item) => item.label !== bigEat.label);
      }
      // Add the new bigEat item to the array
      return [...prev, bigEat];
    });
  };

  // **Directly update price in localSelectedBigEat**
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedBigEats((prev) =>
      prev.map((item) =>
        item.label === name
          ? { ...item, price: { ...item.price, value } }
          : item
      )
    );
  };

  // Trigger the parent (App) with the updated sharables
  useEffect(() => {
    readyForPreview(localSelectedBigEat); // Pass the updated sharables back to App
  }, [localSelectedBigEat]);

  useEffect(() => {
    // Sync the localSelectedBigEat with props.selectedBigEats when returning to BigEats
    setLocalSelectedBigEats(selectedBigEats);
  }, [selectedBigEats]);

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
        fields.map((bigEat) => (
          <div className="checkbox-container" key={bigEat.label}>
            {bigEat.type === "checkbox" && (
              <div className="checkbox">
                <input
                  className="checkbox-check"
                  id={bigEat.label}
                  type={bigEat.type}
                  onChange={() => selectBigEat(bigEat)}
                  checked={selectedBigEats.some(
                    (item) => item.label === bigEat.label
                  )}
                  name={bigEat.label}
                />
                <Label label={bigEat.label} htmlFor={bigEat.label} />
              </div>
            )}
            {bigEat.type === "number" && (
              <div className="checkbox">
                <input
                  id={bigEat.label}
                  type="number"
                  value={
                    localSelectedBigEat.find(
                      (item) => item.label === bigEat.label
                    )?.price.value || ""
                  }
                  onChange={(e) => handlePriceChange(bigEat.label, +e.target.value)}
                  name={bigEat.label}
                />
                <Label label={bigEat.label} htmlFor={bigEat.label} />
              </div>
            )}
          </div>
        ))}
      <br />
      {localSelectedBigEat?.length ? (
        <PreviewItems
          selectedBigEats={localSelectedBigEat} // Pass updated sharables here
          handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
        />
      ) : null}
    </div>
  );
}
