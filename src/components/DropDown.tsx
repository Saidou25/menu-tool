
// import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import "./DropDown.css";

type Props = {
    handleDropDown: (categoryKey: string) => void;
}
export default function Dropdown({ handleDropDown }: Props) {
  const dropDownLis = [
    "Sharable", "Wings", "Salads", "Soups", "Burgers", "Big Eats", "Sides"
  ]
  return (
  <div className="dropdown-container">
<div className="btn-group">
  <button type="button" className="btn">Select</button>
  <button type="button" className="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span className="visually-hidden">Toggle Dropdown</span>
  </button>

  <ul className="dropdown-menu">
    {dropDownLis && 
    dropDownLis.map((li) => (
<li key={li}><span className="dropdown-item" 
onClick={() => handleDropDown(li)}>{li}</span></li>
    ))}

  </ul>
</div>
    </div>
  );
}
