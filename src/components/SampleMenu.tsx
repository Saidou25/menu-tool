// import button from "./button";

import { useEffect, useState } from "react";
import { Field } from "../data/sharables";
import "./SampleMenu.css";

type ModalProps = {
  message: string;
  dataSample: Record<string, Field[]>;
  onConfirm: () => void;
  goBack: () => void;
};

const SampleMenu = ({ message, dataSample, goBack, onConfirm }: ModalProps) => {
  const [organizedData, setOrganizedData] = useState<Record<string, Field[]>>(
    {}
  );

  // Define the order in which categories should be displayed
  const categoryOrder = [
    "Sharables",
    "Ain't no thing butta chicken wing...",
    "Salads",
    "Soups",
    "Signature sandwiches",
    "Burgers",
    "Big eats",
    "Sides",
  ];

  console.log("Data sample received in SampleMenu:", dataSample);

  // Reorganize the data into the desired category order
  useEffect(() => {
    const orderedData: Record<string, Field[]> = {};
    categoryOrder.forEach((category) => {
      orderedData[category] = dataSample[category] || []; // Ensure empty array if no data
    });
    setOrganizedData(orderedData);
  }, [dataSample]);

  // Check if the organizedData is correctly structured
  console.log("Organized Data in SampleMenu:", organizedData);

  return (
    <div className="modal-div">
      <div className="modal-confirmation">
        <h2 className="confirm-title">Final step</h2>
        <br />
        <p className="confirm-text">{message}</p>
        <br />
        <br />

        <div className="row container-buttons g-0">
          <button
            className="col-6 button"
            onClick={onConfirm}
            type="button"
            // printEdit="print-edit-container"
          >
            Yes
          </button>
          <button
            className="col-6 button"
            onClick={goBack}
            type="button"
            // printEdit="print-edit-container"
          >
            No
          </button>
        </div>
        {/* Render the categories and their items */}
        <div className="row menu-items-container">
          {categoryOrder?.map((category) => {
            const items = organizedData[category];

            // Only render categories that have items
            if (items?.length > 0) {
              return (
                <div key={category} className="category-section">
                  <h3 className="category-title">{category}</h3>
                  <ul className="row category-list">
                    {items?.map((item, index) => (
                      <li key={index} className="col-6 menu-item">
                        <strong>{item.label}</strong> - {item.description}
                        <span className="price">
                          {" "}
                          ${item.price.value.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            } else {
              return null; // Don't render category if it has no items
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SampleMenu;
