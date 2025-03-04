import { useEffect, useState } from "react";
import { StyleFormType } from "../data/types";
import "./DropDown.css";
import MenuSizeModal from "./MenuSizeModal";

type SelectDropDownProps = {
  setShowModal: (item: boolean) => void;
  setShowfinalStep: (item: boolean) => void;
  showModal: boolean;
  selectDropDownItem?: (item: string) => void;
  message: string;
  width: string;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
};

export default function DropDown({
  setShowfinalStep,
  showModal,
  setShowModal,
  styleForm,
  message,
  width,
  selectDropDownItem,
  setStyleForm,
}: SelectDropDownProps) {
  const [dropDownList, setDropDownList] = useState<string[]>([]);

  const menuList = [
    "Dinner",
    "Brunch",
    "Desserts",
    "Cocktails",
    "Wines",
    "Custom",
  ]; // Dropdown menu items

  const formatsList = ["Letter", "Legal", "A4", "Custom", "Custom size"]; // Droptdown papper format items

  const handleMenuFormat = (item: string | number) => {
    if (item === "Custom size") {
      setShowModal ? setShowModal(true) : "";
    } else {
      const formatSizes: Record<string, { width: number; height: number }> = {
        Letter: { width: 216, height: 279 },
        A4: { width: 210, height: 297 },
        Legal: { width: 216, height: 356 },
        Custom: { width: 110, height: 356 },
        // Add more formats here in the future
      };

      const selectedFormat = formatSizes[item];

      if (selectedFormat) {
        setStyleForm?.((prev) => ({
          ...prev,
          menuWidth: selectedFormat.width,
          menuHeight: selectedFormat.height,
        }));
        setShowfinalStep(true);
      }
    }
  };

  useEffect(() => {
    if (message === "menus") {
      setDropDownList(menuList);
    } else if (message === "formats") {
      setDropDownList(formatsList);
    }
  }, [message]);

  return (
    <div className="no-print">
      {showModal ? (
        <MenuSizeModal
          setShowModal={setShowModal}
          styleForm={styleForm}
          setStyleForm={setStyleForm}
          showModal={showModal}
          setShowfinalStep={setShowfinalStep}
        />
      ) : (
        <div className="container-dropdown no-print" style={{ width: `${width}%` }}>
          {message === "menus" && (
            <h4 className="message">
              Select the menu you would like to work with
            </h4>
          )}
          {message === "formats" && (
            <>
              <h2 className="confirm-title no-print">Format</h2>
              <br className="no-print" />
              <p className="confirm-text no-print">Select your menu's format</p>
              <br className="no-print" />
            </>
          )}
          <div className="btn-group">
            <button type="button" className="btn btn-danger">
              {message === "menus" && <>menus</>}
              {message === "formats" && <>Select</>}
            </button>
            <button
              type="button"
              className="btn btn-danger dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              {dropDownList.map((item, index) => (
                <li key={index}>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      (item === "Dinner" || item === "Desserts" || "Custom") &&
                      selectDropDownItem
                        ? selectDropDownItem(item)
                        : handleMenuFormat(item);
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
