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
          <button className="col-6 button" onClick={onConfirm} type="button">
            Yes
          </button>
          <button className="col-6 button" onClick={goBack} type="button">
            No
          </button>
        </div>

        {/* Render the categories and their items */}
        <div className="row menu-items-container">
          {categoryOrder.map((category) => {
            const items = organizedData[category];

            // Dynamically group Salads and Soups in the same row
            if (category === "Salads" && (organizedData["Salads"]?.length > 0 || organizedData["Soups"]?.length > 0)) {
              return (
                <div className="row" key="Salads-Soups">
                  {["Salads", "Soups"].map((cat) =>
                    organizedData[cat]?.length > 0 ? (
                      <div key={cat} className="col-6">
                        <h3 className="category-title">{cat}</h3>
                        <ul className="category-list-joined">
                          {organizedData[cat].map((item, idx) => (
                            <li
                              key={idx}
                              className="menu-item-joined"
                            >
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

            // Skip "Soups" since it's handled together with "Salads"
            if (category === "Soups") return null;

            // Render all other categories normally
            if (items?.length > 0) {
              return (
                <div key={category} className="category-section">
                  <h3 className="category-title">{category}</h3>
                  <ul className="row category-list">
                    {items.map((item, index, arr) => (
                      <li
                        key={index}
                        className={
                          arr?.length % 2 !== 0 && index === arr?.length - 1 && category !== "Sides"
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

            return null; // Don't render empty categories
          })}
        </div>
      </div>
    </div>
  );
};

export default SampleMenu;
