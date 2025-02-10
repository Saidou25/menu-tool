import { ChangeEvent, useState } from "react";
import { Field } from "../data/sharables";

import "./PreviewItems.css";

type Props = {
  selectedSharables: Field[];
};

export default function PreviewItems({ selectedSharables }: Props) {
    const [priceItems, setPriceItems] = useState<{ itemTitle: string; price: number }[]>([]);


  console.log("priceItem", priceItems);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);

    setPriceItems((prev) => {
      const existingItem = prev.find((item) => item.itemTitle === name);

      if (existingItem) {
        // Update the price for the existing item
        return prev.map((item) =>
          item.itemTitle === name ? { ...item, price: +value } : item
        );
      } else {
        // Add a new item if it doesn't exist
        return [...prev, { itemTitle: name, price: +value }];
      }
    });
  };
  return (
    <div>
      {selectedSharables.map((item) => {
        const existingItem = priceItems.find((p) => p.itemTitle === item.label);

        return (
          <div className="row preview-items" key={item.label}>
            <span className="col-8">{item.label}</span>
            <div className="col-4">
              <span>$ </span>
              <input
                placeholder={item.price.placeholder}
                name={item.label} // Use label as item identifier
                value={existingItem ? existingItem.price : ""} // Retrieve price from array
                type={item.price.type}
                onChange={handlePriceChange}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
