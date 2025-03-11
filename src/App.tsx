import { useState } from "react";
import { MenuCategory, Field } from "./data/types"; // Import both MenuCategory and Field from types.ts
import { WiStars } from "react-icons/wi";
import * as Dinner from "./data/Dinner"; // Import all the lists from the Dinner folder
import * as Desserts from "./data/Desserts";

import Categories from "./components/Categories";
import DropDown from "./components/DropDown";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Affiliate from "./components/Affiliate";
// import Sharables from "./components/Sharables";

function App() {
  const [categoriesList, setCategoriesList] = useState<MenuCategory[]>([]);
  const [custom, setCustom] = useState(false);
  const [showDropown, setShowDropdown] = useState(false);
  const [menuSampleData, setMenuSampleData] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});
  console.log(showDropown);
  // const [styleForm, setStyleForm] = useState<StyleFormType>({
  //     menuWidth: 0,
  //     menuHeight: 0,
  //     backgroundImage: "",
  //     topImage: "",
  //     topImageSize: 50,
  //     bottomImage: "",
  //     bottomImageSize: 20,
  //     pagePaddingTopAndBottom: 0,
  //     pagePaddingLeftAndRight: 0,
  //     categoryFontSize: 30,
  //     categoriesMarginBottom: 0,
  //     categoryMarginBottom: 0,
  //     itemFontSize: 20,
  //     itemMarginBottom: 0,
  //     descriptionFontSize: 15,
  //     descriptionMarginBottom: 0,
  //     guyTop: "",
  //     guyBottom: "",
  //     guyTopSize: 50,
  //     guyBottomSize: 50,
  //     guyTopMarginBottom: 0,
  //     guyBottomMarginBottom: 0,
  //     title: "",
  //     titleSize: 20,
  //     footerSize: 20,
  //     footer: "",
  //     titleMarginBottom: 0,
  //     footerMarginBottom: 0,
  //     pageBackground: "",
  //     sectionBackground: [],
  //     descriptionLetterColor: [],
  //     titleColor: "",
  //     categoryColor: "",
  //     priceColor: "",
  //     priceSize: 15,
  //     menuItemColor: "",
  //     menuItemDescriptionColor: "",
  //     textTopColor: "",
  //     textBottomColor: "",
  //     footerTextColor: "",
  //     subtitleFontSize: 15,
  //     subtitleFontColor: "",
  //     decoration: "",
  //     gapTextTop: -11,
  //     contentContainerWidth: 45,
  //   });

  // Dummy handlers for functions
  // const dummyFunction = () => {};

  // Dummy values for required props
  // const dummyBoolean = false;

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
        Desserts.dessertsList,
      ]);
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
      <div className="row app-container g-0">
        <Categories
          categoriesList={categoriesList}
          menuSampleDataFunc={funcSetMenuSampleData}
          selectedData={menuSampleData}
          custom={custom}
        />
      </div>
    );
  return (
    <div className="row tool-container g-0">
      <div className="col-6 spotlight">
        <h1 className="menu-tool">Menu Tool</h1>
        <span className="menu-tool-span">Building your menu made easy</span>
      </div>
      <div className="col-6 just-click-button">
        <WiStars className="stars1" />
        <h2 className="just-click">
          "Quickly build your menu with just a few clicks."
        </h2>
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
            // showModal={dummyBoolean}
            // setShowModal={dummyFunction}
            // setShowfinalStep={dummyFunction}
            // styleForm={styleForm}
            // setStyleForm={setStyleForm}
          />
        </div>
      )}
      <WiStars className="stars3" />
    </div>
  );
}

export default App;
