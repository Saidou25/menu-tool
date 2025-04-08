import { useState } from "react";
import { StyleFormType } from "../data/types";
import "./MenuSizeModal.css";

type MenuSizeModalProps = {
  setShowfinalStep?: (item: boolean) => void;
  setShowModal?: (item: boolean) => void;
  showModal: boolean;
  setStyleForm?: React.Dispatch<React.SetStateAction<StyleFormType>>;
  styleForm?: StyleFormType;
};

export default function MenuSizeModal({
  setShowfinalStep,
  setShowModal,
  setStyleForm,
  styleForm, // Receive the styleForm as prop
}: MenuSizeModalProps) {
  const [message, setMessage] = useState("");

  // Handling input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the state using the provided setStyleForm function
    setStyleForm?.((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };
      return updatedForm;
    });
  };

  const onConfirm = () => {
    setShowfinalStep?.(true);
    setShowModal?.(false);
  };
  const handleSubmit = () => {
    setMessage(
      `Your menu is set for a width of ${
        styleForm?.menuWidth ? styleForm.menuWidth : 0
      } mm and a height of ${
        styleForm?.menuHeight ? styleForm.menuHeight : 0
      } mm`
    );
  };

  return (
    <div className="modal-container">
      <div className="window">
        {message ? (
          <>
            <h2 className="text-lg font-semibold no-print">
              Confirm your settings
            </h2>
            <br className="no-print" />
            <p className="text-lg font-semibold no-print">{message}</p>
            <br className="no-print" />

            <div
              className="no-print"
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                className="button"
                type="button"
                onClick={() => {
                  setMessage("");
                  setShowModal?.(true);
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#dc3545",
                  border: "none",
                  color: "white",
                  padding: "4px",
                }}
              >
                Modify
              </button>
              <button
                className="button"
                type="button"
                onClick={onConfirm}
                style={{
                  width: "100%",
                  backgroundColor: "#dc3545",
                  border: "none",
                  color: "white",
                  padding: "4px",
                }}
              >
                Confirm
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Menu format</h2>
            <br />
            <h4>Please choose a width and height for your menu</h4>
            <br />
            <label htmlFor="width">Menu Width (mm): </label>
            <br />
            <input
              id="width"
              type="number"
              placeholder={
                styleForm?.menuWidth && styleForm.menuWidth > 0
                  ? styleForm?.menuWidth.toString()
                  : "Enter width..."
              }
              name="menuWidth"
              value={
                styleForm?.menuWidth && styleForm.menuWidth > 0
                  ? styleForm?.menuWidth
                  : ""
              } // Bind the input value to the state
              onChange={handleChange}
            />
            <br />
            <label htmlFor="height">Menu Height (mm):</label>
            <br />
            <input
              id="height"
              type="number"
              placeholder={
                styleForm?.menuHeight && styleForm?.menuHeight > 0
                  ? styleForm.menuHeight.toString()
                  : "Enter height..."
              }
              name="menuHeight"
              value={
                styleForm?.menuHeight && styleForm?.menuHeight > 0
                  ? styleForm.menuHeight
                  : ""
              } // Bind the input value to the state
              onChange={handleChange}
            />
            <br />
            <br />
            <div
              className="no-print"
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={() => setShowModal?.(false)}
                className="button"
                style={{
                  width: "100%",
                  backgroundColor: "#dc3545",
                  border: "none",
                  color: "white",
                  padding: "4px",
                }}
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="button"
                style={{
                  width: "100%",
                  backgroundColor: "#dc3545",
                  border: "none",
                  color: "white",
                  padding: "4px",
                }}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
