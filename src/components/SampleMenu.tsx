// import button from "./button";

import { Field } from "../data/sharables";
import "./SampleMenu.css";

type ModalProps = {
  message: string;
  dataSample: Record<string, Field[]>;
  onConfirm: () => void;
  goBack: () => void;
  //   localSelectedCategoryItems: Record<string, Field[]>;
};

const SampleMenu = ({ message, dataSample, goBack, onConfirm }: ModalProps) => {
  console.log(dataSample);
  

  // Iterate through the object, get both the category names (keys) and items (values)
Object.entries(dataSample).forEach(([category, items]) => {
    if (items && Array.isArray(items)) { 
    console.log(`Category: ${category}`);
  
    // Now iterate over the items in that category
    items.forEach(item => {
      console.log(`Item: ${item.label}`);
      console.log(`Description: ${item.description}`);
      console.log(`Price: $${item.price.value}`);
    });
} else {
    console.error(`No valid items for category: ${category}`);
  }
  });

  return (
    <div className="modal-div">
      <div className="modal-confirmation">
        <h2 className="confirm-title">Final step</h2>
        <br />
        <p className="confirm-text">{message}</p>
        <br />
        <br />
        <div className="row container-buttons g-0">
          <button
            className="col-5 button"
            onClick={onConfirm}
            type="button"
            // printEdit="print-edit-container"
          >
            Yes
          </button>
          <button
            className="col-5 button"
            onClick={goBack}
            type="button"
            // printEdit="print-edit-container"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleMenu;
