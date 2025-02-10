import { Field } from "../data/sharables";

import "./PreviewItems.css";

type Props = {
  selectedSharables: Field[];
};

export default function PreviewItems({ selectedSharables }: Props) {
  return (
    <div>
      {selectedSharables.map((item) => (
        <div className="row preview-items" key={item.label}>
          <span className="col-8">{item.label}</span>
          <div className="col-4"><span>$ </span>
          <input placeholder={item.price.placeholder} /></div>
          
        </div>
      ))}
    </div>
  );
}
