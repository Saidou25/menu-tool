// import { useState } from "react";
import { useEffect, useState } from "react";
import "./DropDown.css";

type SelectDropDownProps = {
  selectDropDownItem: (item: string) => void;
  message: string;
};

export default function DropDown({
  message,
  selectDropDownItem,
}: SelectDropDownProps) {
  const menuList = ["Dinner", "Brunch", "Desserts", "Cocktails", "Wines", "Custom"]; // Dropdown menu items
  const formatList = ["Regular", "Custom"];
  const [dropDownList, setDropDownList] = useState<string[]>([]);
  // console.log(dropDownList);

  useEffect(() => {
      if (message === "menus") {
        setDropDownList(menuList)
      } else if (message === "formats") {
        setDropDownList(formatList);
      }
    
  }, [message]);
  console.log(message);

  return (
    <div className="container-select-menu">
      {message === "menus" && (
      <>  <h4 className="message">Select the menu you would like to work with</h4>
      </>)}
      {message === "formats" && (
        <div className="message">
          <h3>Preview your menu</h3>
          <br />
          <h5>Select your desired menu format</h5>
        </div>
      )}
      <br />
      <div className="btn-group">
        <button type="button" className="btn btn-danger">
          {message === "menus" && <>available menus</>}
          {message === "formats" && <>available formats</>}
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
