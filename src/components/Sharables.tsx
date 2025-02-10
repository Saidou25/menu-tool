import { useState } from "react";
import { Field, SharableObj, sharablesList } from "../data/sharables";

import Label from "./Label";
import PreviewItems from "./PreviewItems";

export default function Sharables() {
  const [titleSelected, setTitleSelected] = useState(false);
  const [selectedSharables, setSelectedSharables] = useState<Field[]>([]);

  console.log(titleSelected);

  const { fields, title } = sharablesList;

  const handleSelectTitle = () => {
    const newState = titleSelected ? false : true;
    setTitleSelected(newState);
  };

  const selectSharable = (sharable: Field) => {
    setSelectedSharables((prev) => {
      const isPresent = prev.some((item) => item.label === sharable.label);
      if (isPresent) {
        // Remove the item if it's already selected
        return prev.filter((item) => item.label !== sharable.label);
      }
      // Add the new sharable item to the array
      return [...prev, sharable];
    });
  };
  

  console.log(selectedSharables);

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
      {/* <PreviewItem selectedSharables={selectedSharables} /> */}
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
                //   className="checkbox-check"
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
          </div>
        ))}
      <br />
      <br />
      <br />
      {selectedSharables.length ? (
        <PreviewItems selectedSharables={selectedSharables} />
      ) : null}
    </div>
  );
}
