import React, { useEffect, useState } from "react";
import { StyleFormType } from "../data/types";

import "./PreviewTools.css";
import Checkbox from "./Checkbox";

type PreviewToolsProps = {
  showColorInputs: boolean;
  setShowColorInputs: (item: boolean) => void;
  showJoinInputs: boolean;
  setShowJoinInputs: (item: boolean) => void;
  hidePrices: boolean;
  setHidePrices: (item: boolean) => void;
  showDecorationCheckboxes: boolean;
  setShowDecorationCheckboxes: (item: boolean) => void;
  showDecorations: string;
  // setShowDecorations: (item: boolean) => void;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
};

const displayTools = [
  {
    title: "Add elements to your menu",
    displayLabels: [
      {
        label: "Prices checkboxes",
        subLabels: [],
      },
      {
        label: "Decorations checkboxes",
        subLabels: ["gap text", "content width"],
      },
      {
        label: "Background image",
        subLabels: ["background image"],
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
    ],
  },
  {
    title: "Adjust fonts and images sizes",
    displayLabels: [
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
          "top image size",
          "top logo size",
          "bottom image size",
          "bottom logo size",
        ],
      },
    ],
  },
  {
    title: "Menu layout",
    displayLabels: [
      {
        label: "Join categories checkboxes",
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
          "categories' section",
          "categories' title",
          "menu item and price blocks",
          "menu items' description blocks",
          "footer",
        ],
      },
    ],
  },
  {
    title: "Texts and background colors",
    displayLabels: [
      {
        label: "Colors checkboxes",
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
  hidePrices,
  setHidePrices,
  // showDecorations,
  // setShowDecorations,
  showDecorationCheckboxes,
  setShowDecorationCheckboxes,
}: PreviewToolsProps) {
  const [showToolItems, setShowToolItem] = useState<string[]>([]);
  const [localStyleForm, setLocalStyleForm] =
    useState<StyleFormType>(styleForm);

  useEffect(() => {
    setLocalStyleForm(styleForm); // Update local state when styleForm changes
  }, [styleForm]);

  const keyMap: { [key: string]: keyof StyleFormType } = {
    "padding top and bottom": "pagePaddingTopAndBottom",
    "padding left and right": "pagePaddingLeftAndRight",
    categories: "categoryFontSize",
    "menu items": "itemFontSize",
    "menu items' description": "descriptionFontSize",
    "categories' title": "categoryMarginBottom",
    "categories' section": "categoriesMarginBottom",
    "menu item and price blocks": "itemMarginBottom",
    "menu items' description blocks": "descriptionMarginBottom",
    "top image size": "topImageSize",
    "bottom image size": "bottomImageSize",
    "background image": "backgroundImage",
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
    subtitles: "subtitleFontSize",
    "menu items' description color": "menuItemDescriptionColor",
    "top text's color": "textTopColor",
    "bottom text's color": "textBottomColor",
    "footer text's color": "footerTextColor",
    "gap text": "gapTextTop",
    "content width": "contentContainerWidth",
  };

  const getInputType = (item: string): "file" | "text" | "number" | "color" => {
    if (
      [
        "background image",
        "top image",
        "bottom image",
        "top logo",
        "bottom logo",
      ].includes(item)
    )
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
    if (
      [
        "background image",
        "top image",
        "bottom image",
        "top logo",
        "bottom logo",
      ].includes(item)
    )
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
      keyToUpdate === "backgroundImage" ||
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

  const handleToolsChecboxes = (item: string) => {
    setShowToolItem((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div>
      <h2 className="preview-tools-title">Preview Tool</h2>
      <div className="preview-tools-container no-print">
        <br />
        {displayTools &&
          displayTools.map((displayTool, index) => (
            <div
              key={`${displayTool.title}-${showToolItems.includes(
                displayTool.title
              )}`}
              className={`tool-title-${index}`}
            >
              <br />
              <Checkbox
                className="checkbox"
                onChange={() => handleToolsChecboxes(displayTool.title)}
                checked={showToolItems.includes(displayTool.title)}
              />
              &nbsp;
              {displayTool.title}
              <br />
              <br />
              {showToolItems.includes(displayTool.title) ? (
                // <div className="lulu-div">
                  <div className="lulu">
                    {displayTool.displayLabels?.map((displayLabel) => (
                      <div key={displayLabel.label} className="label-container">
                        <span>{displayLabel.label}: </span>

                        {/* Only display image preview for file inputs */}
                        {/* Only display image preview for file inputs */}
                        {displayLabel.label === "Background image" &&
                          styleForm.backgroundImage && (
                            <img
                              className="selected-image"
                              src={styleForm.backgroundImage?.toString()}
                              alt="Uploaded"
                              style={{
                                width: "25px",
                                height: "auto",
                                marginLeft: "5px",
                              }} // Adjust size as needed
                            />
                          )}
                        {displayLabel.label ===
                          "Add an image or a logo at the top" &&
                          styleForm.topImage && (
                            <img
                              className="selected-image"
                              src={styleForm.topImage?.toString()}
                              alt="Uploaded"
                              style={{
                                width: "25px",
                                height: "auto",
                                marginLeft: "5px",
                              }} // Adjust size as needed
                            />
                          )}
                        {displayLabel.label === "Add Guy's logo at the top" &&
                          styleForm.guyTop && (
                            <img
                              className="selected-image"
                              src={styleForm.guyTop?.toString()}
                              alt="Uploaded"
                              style={{
                                width: "25px",
                                height: "auto",
                                marginLeft: "5px",
                              }} // Adjust size as needed
                            />
                          )}
                        {displayLabel.label ===
                          "Add an image or a logo at the bottom" &&
                          styleForm.bottomImage && (
                            <img
                              className="selected-image"
                              src={styleForm.bottomImage?.toString()}
                              alt="Uploaded"
                              style={{
                                width: "25px",
                                height: "auto",
                                marginLeft: "5px",
                              }} // Adjust size as needed
                            />
                          )}
                        {displayLabel.label ===
                          "Add Guy's logo at the bottom" &&
                          styleForm.guyBottom && (
                            <img
                              className="selected-image"
                              src={styleForm.guyBottom?.toString()}
                              alt="Uploaded"
                              style={{
                                width: "25px",
                                height: "auto",
                                marginLeft: "5px",
                              }} // Adjust size as needed
                            />
                          )}

                        {displayLabel.label ===
                          "Join categories checkboxes" && (
                          <div className="ps-4">
                            <Checkbox
                              onChange={() =>
                                setShowJoinInputs(!showJoinInputs)
                              }
                              checked={showJoinInputs}
                              className="checkbox"
                            />
                            &nbsp; Check if you want to show join section
                            checkboxes
                          </div>
                        )}
                        {displayLabel.label === "Prices checkboxes" && (
                          <div className="ps-4">
                            <input
                              className="checkbox"
                              type="checkbox"
                              checked={hidePrices}
                              onChange={() => setHidePrices(!hidePrices)}
                            />
                            &nbsp; Check if you want to hide prices
                          </div>
                        )}
                        {displayLabel.label === "Decorations checkboxes" && (
                          <div className="ps-4">
                            <input
                              className="checkbox"
                              type="checkbox"
                              checked={showDecorationCheckboxes}
                              onChange={() =>
                                setShowDecorationCheckboxes(
                                  !showDecorationCheckboxes
                                )
                              }
                            />
                            &nbsp; Check if you want to show decorations
                          </div>
                        )}
                        {displayLabel.label === "Colors checkboxes" && (
                          <div className="ps-4">
                            <input
                              className="checkbox"
                              type="checkbox"
                              checked={showColorInputs}
                              onChange={() =>
                                setShowColorInputs(!showColorInputs)
                              }
                            />
                            &nbsp; Check if you want to show color inputs
                          </div>
                        )}
                        {displayLabel.subLabels.map((item, index) => (
                          <ul className="line" key={item}>
                            <li className="li ps-4 d-flex align-items-center">
                              <span>{item}&nbsp;</span>

                              {/* Only display image preview for file inputs */}
                              {/* {getInputType(item) === "file" &&
                          localStyleForm[
                            keyMap[item as keyof typeof keyMap]
                          ] && (
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
                          )} */}
                            </li>

                            {/* Handle File Upload Inputs */}
                            {getInputType(item) === "file" ? (
                              <div>
                                <label
                                  htmlFor={`file-upload-${item}-${index}`}
                                  className="custom-file-upload"
                                >
                                  <span id={`file-name-${item}`}>
                                    {localStyleForm[
                                      keyMap[item as keyof typeof keyMap]
                                    ]
                                      ? "File selected"
                                      : "No file chosen"}
                                  </span>
                                  &nbsp;
                                  <button
                                    type="button"
                                    className="file-button"
                                    onClick={() =>
                                      document
                                        .getElementById(
                                          `file-upload-${item}-${index}`
                                        )
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
                                    ? localStyleForm.sectionBackground.length >
                                      0
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
                                min={item !== "gap text" ? 0 : ""}
                                value={
                                  keyMap[item as keyof typeof keyMap] ===
                                  "sectionBackground"
                                    ? localStyleForm.sectionBackground.length >
                                      0
                                      ? localStyleForm.sectionBackground[0]
                                          .backgroundColor || "#000000"
                                      : "#000000"
                                    : getInputType(item) === "number"
                                    ? Number(
                                        localStyleForm[
                                          keyMap[item as keyof typeof keyMap]
                                        ]
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
                // </div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
}
