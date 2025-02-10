import { Field } from "../data/sharables";
import Button from "./Button";
import "./Preview.css";

type Props = {
  selectedSharables: Field[];
  goBack: () => void;
};

export default function Preview({ selectedSharables, goBack }: Props) {
  return (
    <div className="sharables-container">
      <h2>Preview</h2>
      <div className="row sharables-row">
        {selectedSharables.map((selectedSharable, index) => (
          <div className="row sharables-row" key={index}>
            <p className="col-12">{selectedSharable.label}:</p>
            <div className="col-12">
              <span>{selectedSharable.description}</span>
              <span> ${selectedSharable.price.value.toFixed(2)}</span> {/* Render updated price */}
              <br />
              <br />
            </div>
          </div>
        ))}
      </div>
      <Button type="button" onClick={goBack}>
        Edit
      </Button>
    </div>
  );
}
