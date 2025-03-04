import React, { useEffect, useState } from "react";
import { StyleFormType } from "../data/types";

import "./PreviewTools.css";

type PreviewToolsProps = {
  showColorInputs: boolean;
  setShowColorInputs: (item: boolean) => void;
  showJoinInputs: boolean;
  setShowJoinInputs: (item: boolean) => void;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
};

const displayLabels = [
  {
    label: "Add elements to your menu",
    subLabels: [],
  },
  {
    label: "Custom title at the top",
    subLabels: ["text top"],
  },
  {
    label: "Add Guy's logo at the top",
    subLabels: ["top logo"],
  },
  {
    label: "Add an image or a logo at the top",
    subLabels: ["top image"],
  },
  {
    label: "Add an image or a logo at the bottom",
    subLabels: ["bottom image"],
  },
  {
    label: "Add Guy's logo at the bottom",
    subLabels: ["bottom logo"],
  },
  {
    label: "Custom footer at the bottom",
    subLabels: ["text bottom"],
  },

  {
    label: "Adjust fonts and images sizes",
    subLabels: [],
  },
  {
    label: "Fonts sizes",
    subLabels: [
      "title text",
      "categories",
      "subtitles",
      "menu items",
      "prices",
      "menu items' description",
      "footer text",
    ],
  },
  {
    label: "Images sizes",
    subLabels: [
      "top logo size",
      "top image size",
      "bottom logo size",
      "bottom image size",
    ],
  },
  {
    label: "Menu layout",
    subLabels: [],
  },
  {
    label: "Menu padding",
    subLabels: ["padding top and bottom", "padding left and right"],
  },
  {
    label: "Margin bottom",
    subLabels: [
      "title",
      "category blocks",
      "menu item and price blocks",
      "menu item's description blocks",
      "footer",
    ],
  },
  {
    label: "Join categories",
    subLabels: [],
  },
  {
    label: "Colors",
    subLabels: [],
  },
  {
    label: "background color",
    subLabels: ["page background"],
  },
  {
    label: "Texts colors",
    subLabels: [
      "title's color",
      "top text's color",
      "categories' color",
      "subtitles' color",
      "menu items' color",
      "prices' color",
      "menu items' description color",
      "bottom text's color",
      "footer text's color",
    ],
  },
];

export default function PreviewTools({
  styleForm,
  setStyleForm,
  showColorInputs,
  setShowColorInputs,
  showJoinInputs,
  setShowJoinInputs,
}: PreviewToolsProps) {
  const [localStyleForm, setLocalStyleForm] =
    useState<StyleFormType>(styleForm);

  useEffect(() => {
    setLocalStyleForm(styleForm); // Update local state when styleForm changes
  }, [styleForm]);

  const keyMap: { [key: string]: keyof StyleFormType } = {
    "padding top and bottom": "pagePaddingTopAndBottom",
    "padding left and right": "pagePaddingLeftAndRight",
    "categories": "categoryFontSize",
    "menu items": "itemFontSize",
    "menu items' description": "descriptionFontSize",
    "category blocks": "categoryMarginBottom",
    "menu item and price blocks": "itemMarginBottom",
    "menu items' description blocks": "descriptionMarginBottom",
    "top image size": "topImageSize",
    "bottom image size": "bottomImageSize",
    "top image": "topImage",
    "bottom image": "bottomImage",
    "top logo": "guyTop", // Logo file for top
    "bottom logo": "guyBottom", // Logo file for bottom
    "top logo size": "guyTopSize", // Size for top logo
    "bottom logo size": "guyBottomSize", // Size for bottom logo
    "text top": "title",
    "text bottom": "footer",
    "title text": "titleSize",
    "footer text": "footerSize",
    title: "titleMarginBottom",
    footer: "footerMarginBottom",
    "page background": "pageBackground",
    // "section background": "sectionBackground",
    "title's color": "titleColor",
    "categories' color": "categoryColor",
    prices: "priceSize",
    "menu items' color": "menuItemColor",
    "prices' color": "priceColor",
    "subtitles' color": "subtitleFontColor",
    "subtitles": "subtitleFontSize",
    "menu items' description color": "menuItemDescriptionColor",
    "top text's color": "textTopColor",
    "bottom text's color": "textBottomColor",
    "footer text's color": "footerTextColor",
  };

  const getInputType = (item: string): "file" | "text" | "number" | "color" => {
    if (["top image", "bottom image", "top logo", "bottom logo"].includes(item))
      return "file";
    if (
      [
        "page background",
        // "section background",
        "title's color",
        "categories' color",
        "prices' color",
        "menu items' color",
        "menu items' description color",
        "subtitles' color",
        "top text's color",
        "bottom text's color",
        "footer text's color",
      ].includes(item)
    ) {
      return "color";
    }
    if (item.includes("text top") || item.includes("text bottom"))
      return "text";
    return "number";
  };

  const getPlaceholderType = (item: string) => {
    if (["top image", "bottom image", "top logo", "bottom logo"].includes(item))
      return "file";
    if (
      [
        "page background",
        // "section background",
        "title's color",
        "categories' color",
        "prices' color",
        "subtitles' color",
        "menu items' color",
        "menu items' description color",
        "top text's color",
        "bottom text's color",
        "footer text's color",
      ].includes(item)
    ) {
      return "color";
    }
    if (item.includes("text top") || item.includes("text bottom"))
      return "Enter text";
    return "0";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const keyToUpdate = keyMap[name as keyof typeof keyMap];
    if (!keyToUpdate) {
      return; // You might want to handle it in another way if needed
    }
    // console.log(`Updating ${keyToUpdate} with value: ${value}`); // Debugging
    // Determine the new value based on the input type
    let newValue: string | number;
    if (
      keyToUpdate === "topImage" ||
      keyToUpdate === "bottomImage" ||
      keyToUpdate === "guyTop" ||
      keyToUpdate === "guyBottom"
    ) {
      // Handle file inputs
      if (files?.[0]) {
        newValue = URL.createObjectURL(files[0]); // Create an object URL for the image
      } else {
        newValue = ""; // No file chosen
      }
    } else if (typeof value === "string") {
      // Handle text inputs
      newValue = e.target.value; // Directly take the value for text inputs // Directly take the value for text inputs
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
    <div className="preview-tools-container no-print">
      <h2 className="confirm-title">Preview Tool</h2>
      <br />
      <div className="lulu">
        {displayLabels.map((displayLabel) => (
          <div key={displayLabel.label} className="label-container">
            {displayLabel.label === "Join categories" ? (
              <span className="li">
                <b>{displayLabel.label}: </b>
                <br />
                <input
                  type="checkbox"
                  onChange={() => setShowJoinInputs(!showJoinInputs)}
                  checked={showJoinInputs}
                />
                Check if you want to show join section checkboxes
              </span>
            ) : (
              <b>{displayLabel.label}: </b>
            )}

            {displayLabel.label === "Colors" && (
              <>
                {/* {displayLabel.label}:{console.log(displayLabel.label)}<br /> */}
                <input
                  type="checkbox"
                  checked={showColorInputs}
                  onChange={() => setShowColorInputs(!showColorInputs)}
                />{" "}
                Check if you want to show color inputs
              </>
            )}
            {displayLabel.subLabels.map((item, index) => (
              <ul className="line" key={item}>
                <li className="li ps-4 d-flex align-items-center">
                  <span>{item}&nbsp;</span>

                  {/* Only display image preview for file inputs */}
                  {getInputType(item) === "file" &&
                    localStyleForm[keyMap[item as keyof typeof keyMap]] && (
                      <img
                        className="selected-image"
                        src={localStyleForm[
                          keyMap[item as keyof typeof keyMap]
                        ].toString()}
                        alt="Uploaded"
                        style={{
                          width: "25px",
                          height: "auto",
                          marginLeft: "5px",
                        }} // Adjust size as needed
                      />
                    )}
                </li>

                {/* Handle File Upload Inputs */}
                {getInputType(item) === "file" ? (
                  <div>
                    <label
                      htmlFor={`file-upload-${item}-${index}`}
                      className="custom-file-upload"
                    >
                      <span id={`file-name-${item}`}>
                        {localStyleForm[keyMap[item as keyof typeof keyMap]]
                          ? "File selected"
                          : "No file chosen"}
                      </span>
                      &nbsp;
                      <button
                        type="button"
                        className="file-button"
                        onClick={() =>
                          document
                            .getElementById(`file-upload-${item}-${index}`)
                            ?.click()
                        }
                      >
                        Choose File
                      </button>
                    </label>
                    <input
                      id={`file-upload-${item}-${index}`}
                      type="file"
                      hidden
                      name={item}
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </div>
                ) : getInputType(item) === "color" ? (
                  // Render color picker input correctly
                  <input
                    type="color"
                    value={
                      keyMap[item as keyof typeof keyMap] ===
                      "sectionBackground"
                        ? localStyleForm.sectionBackground.length > 0
                          ? localStyleForm.sectionBackground[0]
                              ?.backgroundColor || "#000000"
                          : "#000000"
                        : (
                            localStyleForm[
                              keyMap[item as keyof typeof keyMap]
                            ] as string
                          )?.trim() || "#000000"
                    }
                    name={item}
                    onChange={handleChange}
                  />
                ) : (
                  // Render other input types (number, text)
                  <input
                    className="input-style"
                    type={getInputType(item)}
                    placeholder={getPlaceholderType(item)}
                    min={0}
                    value={
                      keyMap[item as keyof typeof keyMap] ===
                      "sectionBackground"
                        ? localStyleForm.sectionBackground.length > 0
                          ? localStyleForm.sectionBackground[0]
                              .backgroundColor || "#000000"
                          : "#000000"
                        : getInputType(item) === "number"
                        ? Number(
                            localStyleForm[keyMap[item as keyof typeof keyMap]]
                          ) || 0
                        : (localStyleForm[
                            keyMap[item as keyof typeof keyMap]
                          ] as string) || ""
                    }
                    name={item}
                    onChange={handleChange}
                  />
                )}
              </ul>
            ))}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
