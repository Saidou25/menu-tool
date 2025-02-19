import { useEffect, useState } from "react";
import { Field } from "../data/types";

import BackMenu from "./BackMenu"; // Import BackMenu component
import Footer from "./Footer";

import "./PreviewMenu.css";
import PreviewTools from "./PreviewTools";

type ModalProps = {
  showDisclaimer: boolean;
  menuFormat: string;
  message: string;
  onConfirm: () => void;
  goBack: () => void;
  dataSample: Record<string, { subtitle?: string; items: Field[] }>;
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
  const [organizedData, setOrganizedData] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});
  const [styleForm, setStyleForm] = useState<{
    pagePaddingTopAndBottom: number;
    pagePaddingLeftAndRight: number;
  }>({
    pagePaddingTopAndBottom: 0,
    pagePaddingLeftAndRight: 0,
  });

  console.log(styleForm.pagePaddingTopAndBottom);
  
  const categoryOrder = Object.keys(dataSample).includes("Sharables")
    ? [
        "Sharables",
        "Ain't no thing butta chicken wing...",
        "Salads",
        "Soups",
        "Signature sandwiches",
        "Big bite burgers",
        "Big eats",
        "Sides",
      ]
    : Object.keys(dataSample);

  useEffect(() => {
    const orderedData: Record<string, { subtitle?: string; items: Field[] }> =
      {};
    categoryOrder.forEach((category) => {
      if (dataSample[category]) {
        orderedData[category] = dataSample[category]; // Keep the new structure (subtitle + items)
      }
    });

    // Only set state if orderedData has changed
    if (JSON.stringify(orderedData) !== JSON.stringify(organizedData)) {
      setOrganizedData(orderedData);
    }
  }, [dataSample, categoryOrder, organizedData]); // Include organizedData in dependencies for comparison

  // Split the categories into two parts
  const firstCategories = categoryOrder.slice(0, 5);
  const extraCategories = categoryOrder.slice(5);

  // Define secondPageData based on categories with data
  const secondPageData: Record<string, { subtitle?: string; items: Field[] }> =
    {};
  extraCategories.forEach((category) => {
    if (organizedData[category]?.items.length > 0) {
      secondPageData[category] = organizedData[category]; // Keep the new structure
    }
  });

  useEffect(() => {
    setMenuPreviewSize(menuFormat);
  }, [menuFormat]);

  return (
    <div className="confirmation">
      <div className="page-padding">
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
        <div
          className={`menu-items-container-${menuPreviewSize} print`}
          style={{
            padding: `${styleForm.pagePaddingTopAndBottom}px ${styleForm.pagePaddingLeftAndRight}px`,
          }}
        >
          {firstCategories.map((category) => {
            const categoryData = organizedData[category];
            if (
              category === "Salads" &&
              (organizedData["Salads"]?.items.length > 0 ||
                organizedData["Soups"]?.items.length > 0)
            ) {
              return (
                <div className="split-container" key="Salads-Soups">
                  {["Salads", "Soups"].map((cat) =>
                    organizedData[cat]?.items.length > 0 ? (
                      <div key={cat} className="split-div">
                        <h3 className="category-title">{cat}</h3>
                        <ul className="split-list">
                          {organizedData[cat].items.map((item, idx) => (
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

            if (categoryData && categoryData.items.length > 0) {
              return (
                <div key={category}>
                  <h3 className="category-title">{category}</h3>
                  <div className="subtitle">{categoryData.subtitle}</div>
                  <ul className="row category-list">
                    {categoryData.items.map((item, index, arr) => (
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
      <div className="confirmation-preview-tools">
        <PreviewTools setStyleForm={setStyleForm} styleForm={styleForm}
        />
      </div>
    </div>
  );
};

export default PreviewMenu;
