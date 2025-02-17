// import { useState } from "react";
import { useEffect, useState } from "react";
import "./DropDown.css";

type SelectDropDownProps = {
  selectDropDownItem: (item: string) => void;
  message?: string;
};

export default function DropDown({
  message,
  selectDropDownItem,
}: SelectDropDownProps) {
  const menuList = ["Dinner", "Desserts"]; // Dropdown menu items
  const formatList = ["Regular", "Custom"];
  const [dropDownList, setDropDownList] = useState<string[]>(menuList);
  // console.log(dropDownList);

  useEffect(() => {
    if (message) {
      // console.log(message);
      setDropDownList(formatList);
    }
  }, [message]);

  return (
    <div className="container-select-menu">
      {menuList ? (<>
        <h3>Ready for preview?</h3>
        <h5>Select your desired menu format</h5>
      </>
      ) : (
        <h4>Select the menu you would like to work with</h4>
      )}

      <br />
      <div className="btn-group">
        <button type="button" className="btn btn-danger">
          view available menus
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
                onClick={() => selectDropDownItem(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
