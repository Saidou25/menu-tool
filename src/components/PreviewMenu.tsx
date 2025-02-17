import { useEffect, useState } from "react";
import { Field } from "../data/types";

import BackMenu from "./BackMenu"; // Import BackMenu component
import Footer from "./Footer";

import "./PreviewMenu.css";

type ModalProps = {
  menuFormat: string;
  message: string;
  dataSample: Record<string, Field[]>;
  onConfirm: () => void;
  goBack: () => void;
};

const PreviewMenu = ({
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
  console.log(menuFormat);

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
      ] : Object.keys(dataSample);

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
    <div className="modal-div">
      <div className="modal-confirmation">
        <h2 className="confirm-title">Final step</h2>
        <p className="confirm-text">{message}</p>

        <div className="row container-buttons g-0">
          <button className="col-6 button" onClick={goBack} type="button">
            Edit
          </button>
          <button className="col-6 button" onClick={onConfirm} type="button">
            Print
          </button>
        </div>

        {/* Render the first set of categories: Front menu */}
        <div className={`row menu-items-container-${menuPreviewSize}`}>
          {firstCategories.map((category) => {
            const items = organizedData[category];

            if (
              category === "Salads" &&
              (organizedData["Salads"]?.length > 0 ||
                organizedData["Soups"]?.length > 0)
            ) {
              return (
                <div className="row" key="Salads-Soups">
                  {["Salads", "Soups"].map((cat) =>
                    organizedData[cat]?.length > 0 ? (
                      <div key={cat} className="col-6">
                        <h3 className="category-title">{cat}</h3>
                        <ul className="category-list-joined">
                          {organizedData[cat].map((item, idx) => (
                            <li key={idx} className="menu-item-joined">
                              <strong>
                                {item.label} ${item.price.value.toFixed(2)}
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
                <div key={category} className="category-section">
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
                        <strong>
                          {item.label} ${item.price.value.toFixed(2)}
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
                  <div className="footer-div">
                    <Footer />
                  </div>
        </div>

        {/* Render BackMenu only if there are additional categories */}
        {Object.keys(secondPageData).length > 0 && (
          <BackMenu
            categoryOrder={extraCategories}
            secondPageData={secondPageData}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewMenu;
