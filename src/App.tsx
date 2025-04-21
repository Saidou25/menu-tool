import { useState } from "react";
import { useSelectMenuType } from "./hooks/useSelectMenuType";
import { Field } from "./data/types"; // Import both MenuCategory and Field from types.ts
import { AppStateProvider, useAppState } from "./hooks/useAppState";
import { WiStars } from "react-icons/wi";

import Categories from "./components/Categories";
import DropDown from "./components/DropDown";
import Logo from "./components/Logo";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function AppContent() {
const [selectedMenu, setSelectedMenu] = useState("");

  const {
    custom,
    showDropown,
    setShowDropdown,
    customCategoryList,
    setCustomCategoryList,
    menuSampleData,
    setMenuSampleData,
  } = useAppState();

  const { categoriesList } = useSelectMenuType(selectedMenu);

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
            selectDropDownItem={setSelectedMenu}
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
