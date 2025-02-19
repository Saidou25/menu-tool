import { useEffect, useState } from "react";
import { Field } from "../data/types";

import BackMenu from "./BackMenu"; // Import BackMenu component
import Footer from "./Footer";

import "./PreviewMenu.css";

type ModalProps = {
  showDisclaimer: boolean;
  menuFormat: string;
  message: string;
  dataSample: Record<string, Field[]>;
  onConfirm: () => void;
  goBack: () => void;
};

const PreviewMenu = ({
  showDisclaimer,
  menuFormat,
  message,
  dataSample,
  goBack,
  onConfirm,
}: ModalProps) => {
  const [menuPreviewSize, setMenuPreviewSize] = useState("");
  const [organizedData, setOrganizedData] = useState<Record<string, Field[]>>(
    {}
  );

  const categoryOrder = Object.keys(dataSample).includes("Sharables")
    ? [
        "Sharables",
        "Ain't no thing butta chicken wing...",
        "Salads",
        "Soups",
        "Signature sandwiches",
        "Burgers",
        "Big eats",
        "Sides",
      ]
    : Object.keys(dataSample);

  useEffect(() => {
    const orderedData: Record<string, Field[]> = {};
    categoryOrder.forEach((category) => {
      orderedData[category] = dataSample[category] || [];
    });
    setOrganizedData(orderedData);
  }, [dataSample]);

  // Split the categories into two parts
  const firstCategories = categoryOrder.slice(0, 5);
  const extraCategories = categoryOrder.slice(5);

  // Define secondPageData based on categories with data
  const secondPageData: Record<string, Field[]> = {};
  extraCategories.forEach((category) => {
    if (organizedData[category]?.length > 0) {
      secondPageData[category] = organizedData[category];
    }
  });

  useEffect(() => {
    setMenuPreviewSize(menuFormat);
  }, [menuFormat]);

  return (
    <div className="confirmation">
      <h2 className="confirm-title no-print">Final step</h2>
      <br className="no-print" />
      <p className="confirm-text no-print">{message}</p>
      <br className="no-print" />
      <div className="row no-print">
        <button className="col-6 button" onClick={goBack} type="button">
          Edit
        </button>
        <button className="col-6 button" onClick={onConfirm} type="button">
          Print
        </button>
      </div>
      <br className="no-print" />

      {Object.keys(secondPageData).length > 0 && (
        <h3 className="no-print">Menu front</h3>
      )}
      <br className="no-print" />
      {/* Render the first set of categories: Front menu */}
      <div className={`menu-items-container-${menuPreviewSize} print`}>
        {firstCategories.map((category) => {
          const items = organizedData[category];
          if (
            category === "Salads" &&
            (organizedData["Salads"]?.length > 0 ||
              organizedData["Soups"]?.length > 0)
          ) {
            return (
              <div className="split-container" key="Salads-Soups">
                {["Salads", "Soups"].map((cat) =>
                  organizedData[cat]?.length > 0 ? (
                    <div key={cat} className="split-div">
                      <h3 className="category-title">{cat}</h3>
                      <ul className="split-list">
                        {organizedData[cat].map((item, idx) => (
                          <li key={idx} className="menu-item-joined">
                            <strong>
                              {item.label} ${item.price.value?.toFixed(2)}
                            </strong>
                            <div>{item.description}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            );
          }

          if (category === "Soups") return null;

          if (items?.length > 0) {
            return (
              <div key={category}>
                <h3 className="category-title">{category}</h3>
                <ul className="row category-list">
                  {items.map((item, index, arr) => (
                    <li
                      key={index}
                      className={
                        (arr?.length % 2 !== 0 &&
                          index === arr?.length - 1 &&
                          category !== "Sides") ||
                        menuFormat === "Custom"
                          ? "col-12 menu-item-odd"
                          : "col-6 menu-item"
                      }
                    >
                      <strong className="strong">
                        {item.label} ${item.price.value?.toFixed(2)}
                      </strong>
                      <div>{item.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}

        {showDisclaimer && <Footer />}
      </div>

      {/* Render BackMenu only if there are additional categories */}
      {Object.keys(secondPageData).length > 0 && (
        <BackMenu
          menuPreviewSize={menuPreviewSize}
          categoryOrder={extraCategories}
          secondPageData={secondPageData}
          showDisclaimer={showDisclaimer}
        />
      )}
    </div>
  );
};

export default PreviewMenu;
