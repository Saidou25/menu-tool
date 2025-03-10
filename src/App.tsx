import { useState } from "react";
import { MenuCategory, Field, StyleFormType } from "./data/types"; // Import both MenuCategory and Field from types.ts
import * as Dinner from "./data/Dinner"; // Import all the lists from the Dinner folder
import * as Desserts from "./data/Desserts";

import Categories from "./components/Categories";
import DropDown from "./components/DropDown";
// import Button from "./components/Button";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Affiliate from "./components/Affiliate";
// import Sharables from "./components/Sharables";

function App() {
  const [categoriesList, setCategoriesList] = useState<MenuCategory[]>([]);
  const [custom, setCustom] = useState(false);
  const [showSelectMenu, setShowSelectMenu] = useState(true);
  const [menuSampleData, setMenuSampleData] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});
const [styleForm, setStyleForm] = useState<StyleFormType>({
    menuWidth: 0,
    menuHeight: 0,
    backgroundImage: "",
    topImage: "",
    topImageSize: 50,
    bottomImage: "",
    bottomImageSize: 20,
    pagePaddingTopAndBottom: 0,
    pagePaddingLeftAndRight: 0,
    categoryFontSize: 30,
    categoriesMarginBottom: 0,
    categoryMarginBottom: 0,
    itemFontSize: 20,
    itemMarginBottom: 0,
    descriptionFontSize: 15,
    descriptionMarginBottom: 0,
    guyTop: "",
    guyBottom: "",
    guyTopSize: 50,
    guyBottomSize: 50,
    guyTopMarginBottom: 0,
    guyBottomMarginBottom: 0,
    title: "",
    titleSize: 20,
    footerSize: 20,
    footer: "",
    titleMarginBottom: 0,
    footerMarginBottom: 0,
    pageBackground: "",
    sectionBackground: [],
    descriptionLetterColor: [],
    titleColor: "",
    categoryColor: "",
    priceColor: "",
    priceSize: 15,
    menuItemColor: "",
    menuItemDescriptionColor: "",
    textTopColor: "",
    textBottomColor: "",
    footerTextColor: "",
    subtitleFontSize: 15,
    subtitleFontColor: "",
    decoration: "",
    gapTextTop: -11,
    contentContainerWidth: 45,
  });
 
    // Dummy handlers for functions
    const dummyFunction = () => {};
  
    // Dummy values for required props
    const dummyBoolean = false;


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
        Desserts.dessertsList,
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
      <>
        <Affiliate />
        <div className="dropDown-div">
          <DropDown
            message="menus"
            selectDropDownItem={selectMenu}
            width="30"
            showModal={dummyBoolean}  
            setShowModal={dummyFunction}
            setShowfinalStep={dummyFunction}  
            styleForm={styleForm}
            setStyleForm={setStyleForm}
          />
        </div>
      </>
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
