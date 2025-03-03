import { Field } from "../data/types";

import "./CustomMenu.css";

type Props = {
  categoryOrder: string[]; // Ensure it's an array of strings
  organizedData: Record<string, { subtitle?: string; items: Field[] }>;
};

export default function CustomMenu({ categoryOrder, organizedData }: Props) {
  return (
    <div>
      {categoryOrder.map((category, categoryIndex) => {
        const categoryData = organizedData[category]; // Get data based on order

        if (!categoryData) return null; // Skip if no data for this category

        return (
          <div key={categoryIndex} style={{ marginBottom: "20px" }}>
            <h2>{category}</h2>
            {categoryData.subtitle && <h4>{categoryData.subtitle}</h4>}
            <ul>
              {categoryData.items.map((item, index) => (
                <div className="" key={index}>
                  <li className="custom-lis">{item.label}</li> 
                  <li className="custom-lis">{item.description}</li> 

                </div>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
