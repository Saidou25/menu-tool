import { useState } from "react";
import { MenuCategory, Field } from "./data/types"; // Import both MenuCategory and Field from types.ts
import { AppStateProvider, useAppState } from "./hooks/useAppState";
import { WiStars } from "react-icons/wi";

import * as Dinner from "./data/Dinner"; // Import all the lists from the Dinner folder
import * as Desserts from "./data/Desserts";

import Categories from "./components/Categories";
import DropDown from "./components/DropDown";
import Logo from "./components/Logo";
// import guy from "./assets/images/american_kitchen.svg";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function AppContent() {
  // const [createCategory, setCreateCategory] = useState(true);
  const [categoriesList, setCategoriesList] = useState<MenuCategory[]>([]);
  // const [custom, setCustom] = useState(false);
  // const [showDropown, setShowDropdown] = useState(false);
  // const [menuSampleData, setMenuSampleData] = useState<
  //   Record<string, { subtitle?: string; items: Field[]; custom?: string }>
  // >({});
  // const [customCategoryList, setCustomCategoryList] = useState<MenuCategory[]>(
  //   []
  // );

  const {
    custom,
    setCustom,
    showDropown,
    setShowDropdown,
    customCategoryList,
    setCustomCategoryList,
    menuSampleData,
    setMenuSampleData,
  } = useAppState();

  const reset = () => {
    console.log("reset");
    setCategoriesList([]);
    setCustomCategoryList([]);
    setCustom(false);
    setShowDropdown(false);
    // setMenuSampleData({});
  };

  const customCategory = () => {
    setCustomCategoryList([
      Dinner.sandwichesList,
      Dinner.soupsList,
      Dinner.wingsList,
      Dinner.saladsList,
      Dinner.sharablesList,
      Dinner.burgersList,
      Dinner.bigEatsList,
      Dinner.sidesList,
      Dinner.saucesList,
      Desserts.dessertsList,
    ]);
  };

  const selectMenu = (item: string) => {
    console.log(item);
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
    }
    if (item === "Desserts") {
      // Set categoriesList to the lists from the Dessert's folder
      setCategoriesList([Desserts.dessertsList]);
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
        Dinner.saucesList,
        Desserts.dessertsList,
      ]);
      customCategory();
      setCustom(true);
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

  if (categoriesList.length)
    return (
      <Categories
        // setCategoriesList={setCategoriesList}
        categoriesList={categoriesList}
        setCustomCategoryList={setCustomCategoryList}
        customCategoryList={customCategoryList}
        menuSampleDataFunc={funcSetMenuSampleData}
        selectedData={menuSampleData}
        custom={custom}
        reset={reset}
      />
    );

  return (
    <div className="row tool-container g-0">
      <Logo
        className="spotlight"
        h1ClassName="menu-tool"
        title="Menu tool"
        subtitle="Building menus made easy"
      />
      <div className="col-6 just-click-button">
        <WiStars className="stars1" />
        <h2 className="just-click">
          "Quickly build your menu with just a few clicks"
        </h2>
      {/* <div className="">
        <img className="image-fluid" alt="guy" src={guy} />
      </div> */}
      </div>
      <WiStars className="stars2" />
      {!showDropown && (
        <div className="button-start">
          <button
            className="start"
            type="button"
            onClick={() => setShowDropdown(true)}
          >
            Start
          </button>
        </div>
      )}
      {showDropown && (
        <div className="dropDown-div">
          <DropDown
            message="menus"
            selectDropDownItem={selectMenu}
            width="30"
          />
        </div>
      )}
      <WiStars className="stars3" />
    </div>
  );
}
// Wraps the entire app in AppStateProvider
function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}
export default App;
