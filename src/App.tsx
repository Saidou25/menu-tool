import { useEffect, useState } from "react";
import { Field, sharablesList } from "./data/sharables";
import { burgersList } from "./data/burgers";
import { saladsList } from "./data/salads";
import { sandwichesList } from "./data/sandwiches";
import { wingsList } from "./data/wings";
import { bigEatsList } from "./data/bigEats";
import { sidesList } from "./data/sides";
import { soupsList } from "./data/soups";

import SampleMenu from "./components/SampleMenu";
// import Button from "./components/Button";
import Categories from "./components/Categories";

import "./App.css";

function App() {
  const [showMenuSample, setShowMenuSample] = useState(false);
  const [menuSampleData, setMenuSampleData] = useState<Record<string, Field[]>>(
    {}
  );

  const categoriesList = [
    sandwichesList,
    soupsList,
    wingsList,
    saladsList,
    sharablesList,
    burgersList,
    bigEatsList,
    sidesList,
  ];

  const sharables = menuSampleData.Sharables; // Array of 3 items
  const wings = menuSampleData?.wings; // Array of 3 items
  const soups = menuSampleData.Soups; // Array of 2 items

  const dataSample = {
    sharables: sharables || [],
    soups: soups || [],
    wings: wings || [],
  };

  // console.log("sharable", sharables, "soups", soups);

  const funcSetMenuSampleData = (
    localSelectedCategoryItems: Record<string, Field[]>
  ) => {
    setMenuSampleData(localSelectedCategoryItems);
  };
  // Handle go back to modify inputs
  const handleGoBack = () => {
    setShowMenuSample(false);
  };

  const handleConfirm = () => {
    setShowMenuSample(false);
    // setShowFinalMessage("Thank you for using Chefs' Life Made Easy.");
    // setModalMessage("");
    // resetForm();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowMenuSample((prev) => !prev);
  };

  useEffect(() => {}, []);

  if (showMenuSample) {
    return (
      <SampleMenu
        goBack={handleGoBack}
        onConfirm={handleConfirm}
        message="Confirm printin or go back"
        dataSample={dataSample}
      />
    );
  }

  return (
    <div className="row app-container g-0">
      <h1 className="col-12 add-categories pt-5">
        Add categories to your menu:
      </h1>
      <Categories
        categoriesList={categoriesList}
        menuSampleDataFunc={funcSetMenuSampleData}
        selectedData={menuSampleData}
      />
      <div className="col-12">
        <button className="button" type="button" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
