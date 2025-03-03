import { useState } from "react";
import { Field, StyleFormType } from "../data/types";
import "./CustomMenu.css";

type Props = {
  categoryOrder: string[];
  organizedData: Record<string, { subtitle?: string; items: Field[] }>;
  showColorInputs: boolean;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
};

export default function CustomMenu({
  categoryOrder,
  organizedData,
  showColorInputs,
  styleForm,
  setStyleForm,
}: Props) {
  const [joinedCategories, setJoinedCategories] = useState<
    Record<string, boolean>
  >({});

  return (
    <div className="row custom-main-container">
      {categoryOrder.map((category, categoryIndex) => {
        const categoryData = organizedData[category]; // Get data based on order

        if (!categoryData) return null; // Skip if no data for this category

        return (
          <div
            className={joinedCategories[category] ? "col-6" : "col-12"}
            key={categoryIndex}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>{category}</h2>
              {showColorInputs && (
                        <input
                          className="no-print"
                          type="color"
                          onChange={(event) =>
                            handleCatetegoryBackgroundChange(
                              event.target.value,
                              realCategoryIndex
                            )
                          }
                        />
                      )}
              <input
                className="custom-input"
                type="checkbox"
                onChange={() =>
                  setJoinedCategories((prev) => ({
                    ...prev,
                    [category]: !prev[category], // Only toggle this category
                  }))
                }
                checked={joinedCategories[category] || false}
              />
            </div>

            <div>
              {categoryData.subtitle && <h4>{categoryData.subtitle}</h4>}
              <ul>
                {categoryData.items.map((item, index) => (
                  <li className="custom-lis" key={index}>
                    <strong>{item.label}</strong>: {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
