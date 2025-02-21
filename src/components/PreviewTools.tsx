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
    subLabels: [
      "title text",
      "category",
      "menu item and price",
      "menu item description",
      "footer text",
    ],
  },
  {
    label: "Margin bottom",
    subLabels: [
      "title",
      "category block",
      "menu item and price block",
      "menu item description block",
      "footer",
    ],
  },
  {
    label: "Custom title at the top",
    subLabels: ["text top"],
  },
  {
    label: "Custom footer at the bottom",
    subLabels: ["text bottom"],
  },
  {
    label: "Add Guy' s logo at the top",
    subLabels: ["logo top", "top logo size"],
  },
  {
    label: "Add an image or a logo at the top",
    subLabels: ["top", "top image size"],
  },
  {
    label: "Add an image or a logo at the bottom",
    subLabels: ["bottom", "bottom image size"],
  },
  {
    label: "Add Guy' s logo at the bottom",
    subLabels: ["logo bottom", "bottom logo size"],
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
    "menu item and price": "itemFontSize",
    "menu item description": "descriptionFontSize",
    "category block": "categoryMarginBottom",
    "menu item and price block": "itemMarginBottom",
    "menu item description block": "descriptionMarginBottom",
    "top": "topImage",
    "bottom": "bottomImage",
    "top image size": "topImageSize",
    "bottom image size": "bottomImageSize",
    "logo top": "guyTop", // Logo file for top
    "top logo size": "guyTopSize", // Size for top logo
    "logo bottom": "guyBottom", // Logo file for bottom
    "bottom logo size": "guyBottomSize", // Size for bottom logo
    "text top": "title",
    "text bottom": "footer",
    "title text": "titleSize",
    "footer text": "footerSize",
    "title": "titleMarginBottom",
    "footer": "footerMarginBottom"
  };

  const getInputType = (item: string): "file" | "text" | "number" => {
    if (["top", "bottom", "logo top", "logo bottom"].includes(item))
      return "file";
    if (item.includes("text top") || item.includes("text bottom"))
      return "text";
    return "number";
  };

  const getPlaceholderType = (item: string) => {
    if (["top", "bottom", "logo top", "logo bottom"].includes(item))
      return "file";
    if (item.includes("text top") || item.includes("text bottom"))
      return "Enter text";
    return "0";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const keyToUpdate = keyMap[name as keyof typeof keyMap];

    if (!keyToUpdate) return;

    // Determine the new value based on the input type
    let newValue: string | number;
    if (
      keyToUpdate === "topImage" ||
      keyToUpdate === "bottomImage" ||
      keyToUpdate === "guyTop" ||
      keyToUpdate === "guyBottom"
    ) {
      // Handle file inputs
      newValue = files?.[0]
        ? URL.createObjectURL(files[0])
        : localStyleForm[keyToUpdate];
    } else if (typeof value === "string") {
      // Handle text inputs
      newValue = value; // Directly take the value for text inputs
    } else {
      // Handle number inputs
      const numValue = Number(value);
      newValue = isNaN(numValue) ? 0 : Math.max(0, numValue);
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
      <h2 className="confirm-title no-print">Preview Tool</h2>
      {displayLabels.map((displayLabel) => (
        <div key={displayLabel.label} className="label-container">
          <span>{displayLabel.label}: </span>
          {displayLabel.subLabels.map((item) => (
            <ul className="line" key={item}>
              <li className="li">{item}</li>
              <input
                type={getInputType(item)}
                placeholder={getPlaceholderType(item)}
                min={0} // Minimum value for number inputs
                value={
                  ["top", "bottom", "logo bottom", "logo top"].includes(item)
                    ? undefined
                    : String(
                        localStyleForm[keyMap[item as keyof typeof keyMap]] ||
                          ""
                      ) // Default to empty string
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
