import { useState } from "react";
import { MenuCategory, Field } from "./data/types"; // Import both MenuCategory and Field from types.ts
import * as Dinner from "./data/Dinner"; // Import all the lists from the Dinner folder
import * as Desserts from "./data/Desserts";

import Categories from "./components/Categories";
import DropDown from "./components/DropDown";
// import Button from "./components/Button";

import "./App.css";
// import Sharables from "./components/Sharables";

function App() {
  const [categoriesList, setCategoriesList] = useState<MenuCategory[]>([]);
  const [custom, setCustom] = useState(false);
  const [showSelectMenu, setShowSelectMenu] = useState(true);
  const [menuSampleData, setMenuSampleData] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});

  const selectMenu = (item: string) => {
    if (item === "Dinner") {
      // Set categoriesList to the lists from the Dinner folder
      setCategoriesList([
        Dinner.sandwichesList,
        Dinner.soupsList,
        Dinner.wingsList,
        Dinner.saladsList,
        Dinner.sharablesList,
        Dinner.burgersList,
        Dinner.bigEatsList,
        Dinner.sidesList,
      ]);
      setShowSelectMenu(false);
    }
    if (item === "Desserts") {
      // Set categoriesList to the lists from the Dessert's folder
      setCategoriesList([Desserts.dessertsList]);
      setShowSelectMenu(false);
    }
    if (item === "Custom") {
      // Set categoriesList to the lists from the Dinner folder
      setCategoriesList([
        Dinner.sandwichesList,
        Dinner.soupsList,
        Dinner.wingsList,
        Dinner.saladsList,
        Dinner.sharablesList,
        Dinner.burgersList,
        Dinner.bigEatsList,
        Dinner.sidesList,
        Desserts.dessertsList
      ]);
      setCustom(true);
      setShowSelectMenu(false);
    }
  };

  const funcSetMenuSampleData = (
    localSelectedCategoryItems: Record<
      string,
      { subtitle?: string; items: Field[] }
    >
  ) => {
    setMenuSampleData(localSelectedCategoryItems);
  };
// return (<Sharables />)
  if (showSelectMenu) {
    return (
      <div className="dropDown-div">
        <DropDown message="menus" selectDropDownItem={selectMenu} width="30" />
      </div>
    );
  }
  return (
    <div className="row app-container g-0">
      <Categories
        categoriesList={categoriesList}
        menuSampleDataFunc={funcSetMenuSampleData}
        selectedData={menuSampleData}
        custom={custom}
      />
    </div>
  );
}

export default App;
