import { useState } from "react";
import { MenuCategory, Field } from "./data/types"; // Import both MenuCategory and Field from types.ts
import { WiStars } from "react-icons/wi";
import * as Dinner from "./data/Dinner"; // Import all the lists from the Dinner folder
import * as Desserts from "./data/Desserts";

import Categories from "./components/Categories";
import DropDown from "./components/DropDown";
import Logo from "./components/Logo";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const [createCategory, setCreateCategory] = useState(true);
  const [categoriesList, setCategoriesList] = useState<MenuCategory[]>([]);
  const [customCategoryList, setCustomCategoryList] = useState<MenuCategory[]>(
    []
  );
  const [custom, setCustom] = useState(false);
  const [showDropown, setShowDropdown] = useState(false);
  const [menuSampleData, setMenuSampleData] = useState<
    Record<string, { subtitle?: string; items: Field[]; custom?: string }>
  >({});

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

  // useEffect(() => {
  //   if (createCategory) {
  //     console.log("create category: ", createCategory)
  //     customCategory();
  //   }
  // }, [createCategory]);


  if (categoriesList.length)
    return (
      <Categories
        setCategoriesList={setCategoriesList}
        categoriesList={categoriesList}
        setCustomCategoryList={setCustomCategoryList}
        customCategoryList={customCategoryList}
        menuSampleDataFunc={funcSetMenuSampleData}
        selectedData={menuSampleData}
        custom={custom}
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

export default App;
