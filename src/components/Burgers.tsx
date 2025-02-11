import { useEffect, useState } from "react";
import { Field, burgersList } from "../data/burgers";
import Label from "./Label";
import PreviewItems from "./PreviewItems";

type Props = {
  readyForPreview: (selectedBurgers: Field[]) => void;
  selectedBurgers: Field[]; // prop to maintain the state
};

export default function Sharables({
  readyForPreview,
  selectedBurgers,
}: Props) {
  const [titleSelected, setTitleSelected] = useState(false);
  const [localSelectedBurgers, setLocalSelectedBurgers] =
    useState<Field[]>(selectedBurgers);

  const { fields, title } = burgersList;

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
  };

  const selectBurger = (burger: Field) => {
    setLocalSelectedBurgers((prev) => {
      const isPresent = prev.some((item) => item.label === burger.label);
      if (isPresent) {
        // Remove the item if it's already selected
        return prev.filter((item) => item.label !== burger.label);
      }
      // Add the new burger item to the array
      return [...prev, burger];
    });
  };

  // **Directly update price in localSelectedBurgers**
  const handlePriceChange = (name: string, value: number) => {
    setLocalSelectedBurgers((prev) =>
      prev.map((item) =>
        item.label === name
          ? { ...item, price: { ...item.price, value } }
          : item
      )
    );
  };

  // Trigger the parent (App) with the updated sharables
  useEffect(() => {
    readyForPreview(localSelectedBurgers); // Pass the updated sharables back to App
  }, [localSelectedBurgers]);

  useEffect(() => {
    // Sync the localSelectedBurgers with props.selectedBurgers when returning to Sharables
    setLocalSelectedBurgers(selectedBurgers);
  }, [selectedBurgers]);

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
        fields.map((burger) => (
          <div className="checkbox-container" key={burger.label}>
            {burger.type === "checkbox" && (
              <div className="checkbox">
                <input
                  className="checkbox-check"
                  id={burger.label}
                  type={burger.type}
                  onChange={() => selectBurger(burger)}
                  checked={selectedBurgers.some(
                    (item) => item.label === burger.label
                  )}
                  name={burger.label}
                />
                <Label label={burger.label} htmlFor={burger.label} />
              </div>
            )}
            {burger.type === "number" && (
              <div className="checkbox">
                <input
                  id={burger.label}
                  type="number"
                  value={
                    localSelectedBurgers.find(
                      (item) => item.label === burger.label
                    )?.price.value || ""
                  }
                  onChange={(e) => handlePriceChange(burger.label, +e.target.value)}
                  name={burger.label}
                />
                <Label label={burger.label} htmlFor={burger.label} />
              </div>
            )}
          </div>
        ))}
      <br />
      {localSelectedBurgers?.length ? (
        <PreviewItems
          selectedBurgers={localSelectedBurgers} // Pass updated sharables here
          handlePriceChange={handlePriceChange} // Pass the handlePriceChange function
        />
      ) : null}
    </div>
  );
}
