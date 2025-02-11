import { ChangeEvent } from "react";
import { Field } from "../data/sharables";
import "./PreviewItems.css";

type Props = {
  selectedWings?: Field[];
  selectedSharables?: Field[];
  selectedSalads?: Field[];
  selectedSoups?: Field[];
  handlePriceChange: (name: string, value: number) => void;
};

export default function PreviewItems({
  selectedWings,
  selectedSharables,
  selectedSalads,
  selectedSoups,
  handlePriceChange,
}: Props) {

  return (
    <div>
      {selectedSharables?.map((item) => {
        return (
          <div className="row preview-items" key={item.label}>
            <span className="col-8">{item.label}</span>
            <div className="col-4">
              <span>$ </span>
              <input
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
      })}
      {selectedWings?.map((item) => {
        return (
          <div className="row preview-items" key={item.label}>
            <span className="col-8">{item.label}</span>
            <div className="col-4">
              <span>$ </span>
              <input
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
      })}
      {selectedSalads?.map((item) => {
        return (
          <div className="row preview-items" key={item.label}>
            <span className="col-8">{item.label}</span>
            <div className="col-4">
              <span>$ </span>
              <input
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
      })}
      {selectedSoups?.map((item) => {
        return (
          <div className="row preview-items" key={item.label}>
            <span className="col-8">{item.label}</span>
            <div className="col-4">
              <span>$ </span>
              <input
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
      })}
    </div>
  );
}
