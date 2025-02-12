import { ChangeEvent } from "react";
import { Field } from "../data/sharables";
import "./PreviewItems.css";

type Props = {
  selectedCategoryItems?: Field[];
  selectedSharables?: Field[];
  selectedWings?: Field[];
  selectedSalads?: Field[];
  selectedSoups?: Field[];
  selectedSandwiches?: Field[];
  selectedBurgers?: Field[];
  selectedBigEats?: Field[];
  selectedSides?: Field[];
  handlePriceChange: (name: string, value: number) => void;
};

export default function PreviewItems({
  selectedCategoryItems,
  selectedSharables,
  selectedWings,
  selectedSalads,
  selectedSoups,
  selectedSandwiches,
  selectedBurgers,
  selectedBigEats,
  selectedSides,
  handlePriceChange,
}: Props) {
  const allItems = [
    ...(selectedCategoryItems ?? []),
    ...(selectedSharables ?? []),
    ...(selectedWings ?? []),
    ...(selectedSalads ?? []),
    ...(selectedSoups ?? []),
    ...(selectedSandwiches ?? []),
    ...(selectedBurgers ?? []),
    ...(selectedBigEats ?? []),
    ...(selectedSides ?? []),
  ];

  return (
    <div className="row sharables-container">
      {allItems.map((item) => (
        <PreviewItem
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

function PreviewItem({ item, handlePriceChange }: PreviewItemProps) {
  return (
    <div className="row preview-item-container g-0">
      <span className="col-6">{item.label}</span>
      <div className="col-6 d-flex">
        <span>$&nbsp;</span>
        <input className="container-fluid price-input"
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
