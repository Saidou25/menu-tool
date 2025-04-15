import { useEffect, useState } from "react";
import { StyleFormType } from "../data/types";
import MenuSizeModal from "./MenuSizeModal";

import "./DropDown.css";

type SelectDropDownProps = {
  setShowModal?: (item: boolean) => void;
  setShowfinalStep?: (item: boolean) => void;
  showModal?: boolean;
  selectDropDownItem?: (item: string) => void;
  message: string;
  width?: string;
  styleForm?: StyleFormType;
  setStyleForm?: React.Dispatch<React.SetStateAction<StyleFormType>>;
};

export default function DropDown({
  setShowfinalStep,
  showModal,
  setShowModal,
  styleForm,
  message,
  // width,
  selectDropDownItem,
  setStyleForm,
}: SelectDropDownProps) {
  const [dropDownList, setDropDownList] = useState<string[]>([]);
  // const [screenWidth, setScreenWidth] = useState(0);

  const menuList = [
    "Dinner",
    "Brunch",
    "Desserts",
    "Cocktails",
    "Wines",
    "Custom",
  ]; // Dropdown menu items

  const formatsList = ["Letter", "Legal", "A4", "Slim", "Custom size"]; // Droptdown papper format items

  // const size = window.innerWidth;

  const handleMenuFormat = (item: string | number) => {
    if (item === "Custom size") {
      setShowModal?.(true);
    } else {
      const formatSizes: Record<string, { width: number; height: number }> = {
        Letter: { width: 216, height: 279 },
        A4: { width: 210, height: 297 },
        Legal: { width: 216, height: 356 },
        Slim: { width: 110, height: 356 },
        // Add more formats here in the future
      };

      const selectedFormat = formatSizes[item];

      if (selectedFormat) {
        setStyleForm?.((prev) => ({
          ...prev,
          menuWidth: selectedFormat.width,
          menuHeight: selectedFormat.height,
        }));
        setShowfinalStep?.(true);
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

  // useEffect(() => {
  // setScreenWidth(size);
  // }, [size]);


  return (
      <div
        className={
          message === "menus"
            ? "container-dropdown-menus no-print"
            : "container-dropdown no-print"
        }
      >
        {showModal ? (
          <MenuSizeModal
            setShowModal={setShowModal}
            styleForm={styleForm}
            setStyleForm={setStyleForm}
            showModal={showModal}
            setShowfinalStep={setShowfinalStep}
            // screenWidth={screenWidth}
          />
        ) : (
          <div
            className="container-dropdown no-print"
            // style={{ width: `${width}%` }}
          >
            {message === "menus" && (
              <div className="menus">
                <h2 className="confirm-title no-print">Please select a menu</h2>
                <br />
              </div>
            )}
            {message === "formats" && (
              <div className="select-menu-div">
                <h2 className="confirm-title no-print">Format</h2>
                <br className="no-print" />
                <p className="confirm-text no-print">
                  Select your menu's format
                </p>
                <br className="no-print" />
              </div>
            )}
            <div className="btn-group">
              <button type="button" className="btn text-white">
                {message === "menus" && <>menus</>}
                {message === "formats" && <>Select</>}
              </button>
              <button
                type="button"
                className="btn dropdown-toggle dropdown-toggle-split"
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
                        (item === "Dinner" ||
                          item === "Desserts" ||
                          "Custom") &&
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
