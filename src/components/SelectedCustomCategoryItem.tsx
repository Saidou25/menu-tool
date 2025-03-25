import { ChangeEvent } from "react";
import { Field } from "../data/types";
import "./SelectedCategoryItems.css";

type Props = {
  Category: any;
  newArray: any;
  superTitle: string;
  // allItems: any[];
  // customCategoryList: any[];
  selectedCustomCategoryItems?: Field[];
  handlePriceChange: (name: string, value: number) => void;
  // fadeInOut: boolean;
  // consolidatedView: boolean;
};

export default function SelectedCustomCategoryItems({
  // consolidatedView,
  selectedCustomCategoryItems,
  handlePriceChange,
}: Props) {

  // const allCustomItems = allItems;
  const allTheItems = selectedCustomCategoryItems ?? [];

  // if (allCustomItems?.length && consolidatedView) {
  //   return (
  //     <div className="row">
  //       {allCustomItems?.map((item) => (
  //         <SelectedCustomCategoryItem
  //           key={item.label}
  //           item={item}
  //           handlePriceChange={handlePriceChange}
  //         />
  //       ))}
  //     </div>
  //   );
  // }
  return (
    <div className="row g-0 mb-2">
      {allTheItems?.map((item) => (
        <SelectedCustomCategoryItem
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

function SelectedCustomCategoryItem({
  item,
  handlePriceChange,
}: PreviewItemProps) {
  return (
    <div className="row preview-item-container g-0">
      <span className="col-7">{item.label}</span>
      <div className="col-5 d-flex">
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
