import React, { useEffect, useState } from "react";
import { StyleFormType } from "../data/types";

import "./PreviewTools.css";

type PreviewToolsProps = {
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
};

const displayLabels = [
  {
    label: "Page padding",
    subLabels: ["padding top and bottom", "padding left and right"],
  },
  {
    label: "Font size",
    subLabels: ["category", "item and price", "description"],
  },
  {
    label: "Margin bottom",
    subLabels: ["category block", "item and price block", "description block"],
  },
  {
    label: "Add an image or a logo at the top",
    subLabels: ["top", "top image size"],
  },
  {
    label: "Add an image or a logo at the bottom",
    subLabels: ["bottom", "bottom image size"],
  },
];

export default function PreviewTools({
  styleForm,
  setStyleForm,
}: PreviewToolsProps) {
  const [localStyleForm, setLocalStyleForm] =
    useState<StyleFormType>(styleForm);

  useEffect(() => {
    setLocalStyleForm(styleForm); // Update local state when styleForm changes
  }, [styleForm]);

  const keyMap: { [key: string]: keyof StyleFormType } = {
    "padding top and bottom": "pagePaddingTopAndBottom",
    "padding left and right": "pagePaddingLeftAndRight",
    "category": "categoryFontSize",
    "item and price": "itemFontSize",
    "description": "descriptionFontSize",
    "category block": "categoryMarginBottom",
    "item and price block": "itemMarginBottom",
    "description block": "descriptionMarginBottom",
    "top": "topImage",
    "bottom": "bottomImage",
    "top image size": "topImageSize",
    "bottom image size": "bottomImageSize",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const keyToUpdate = keyMap[name as keyof typeof keyMap];
    if (!keyToUpdate) return;

    // Determine the new value based on the input type
    let newValue: string | number;
    if (keyToUpdate === "topImage" || keyToUpdate === "bottomImage") {
      // Handle file inputs
      newValue = files?.[0]
        ? URL.createObjectURL(files[0])
        : localStyleForm[keyToUpdate];
    } else {
      // Handle number inputs
      const numValue = Number(value); // Convert input value to a number
      newValue = isNaN(numValue) ? 0 : Math.max(0, numValue); // Ensure newValue is not less than 0
    }

    // Update local state
    setLocalStyleForm((prevState) => ({
      ...prevState,
      [keyToUpdate]: newValue,
    }));

    // Update parent state
    setStyleForm((prevState) => ({
      ...prevState,
      [keyToUpdate]: newValue,
    }));
  };

  return (
    <div className="preview-tools-container">
      <h3 className="title">Preview tools</h3>
      {displayLabels.map((displayLabel) => (
        <div key={displayLabel.label} className="label-container">
          <span>{displayLabel.label}: </span>
          {displayLabel.subLabels.map((item) => (
            <ul className="line" key={item}>
              <li className="li">{item}</li>
              <input
                type={item === "top" || item === "bottom" ? "file" : "number"}
                placeholder={
                  String(localStyleForm[keyMap[item as keyof typeof keyMap]]) ||
                  ""
                }
                min={0} // Minimum value for number inputs
                value={
                  item === "top" || item === "bottom"
                    ? undefined
                    : String(
                        localStyleForm[keyMap[item as keyof typeof keyMap]]
                      ) || "0"
                }
                name={item}
                onChange={handleChange}
              />
            </ul>
          ))}
          <br />
        </div>
      ))}
    </div>
  );
}
