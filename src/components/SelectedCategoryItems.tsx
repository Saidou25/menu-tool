import { ChangeEvent } from "react";
import { Field } from "../data/sharables";
import "./SelectedCategoryItems.css";

type Props = {
  selectedCategoryItems?: Field[];
  handlePriceChange: (name: string, value: number) => void;
};

export default function SelectedCategoryItems({
  selectedCategoryItems,
  handlePriceChange,
}: Props) {
  const allItems = selectedCategoryItems ?? [];
  return (
    <div className="row sharables-container">
      {allItems.map((item) => (
        <SelectedCategoryItem
          key={item.label}
          item={item}
          handlePriceChange={handlePriceChange}
        />
      ))}
    </div>
  );
}

type PreviewItemProps = {
  item: Field;
  handlePriceChange: (name: string, value: number) => void;
};

function SelectedCategoryItem({ item, handlePriceChange }: PreviewItemProps) {
  return (
    <div className="row preview-item-container g-0">
      <span className="col-6">{item.label}</span>
      <div className="col-6 d-flex">
        <span>$&nbsp;</span>
        <input
          className="container-fluid price-input"
          placeholder={item.price.placeholder}
          name={item.label} // Use label as item identifier
          value={item.price.value === 0 ? "" : item.price.value} // Show placeholder if value is 0
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handlePriceChange(e.target.name, +e.target.value)
          }
        />
      </div>
    </div>
  );
}
