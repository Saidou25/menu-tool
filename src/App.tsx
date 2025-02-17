import { useState } from "react";
import { MenuCategory, Field } from "./data/types"; // Import both MenuCategory and Field from types.ts
import * as Dinner from "./data/Dinner"; // Import all the lists from the Dinner folder

import Categories from "./components/Categories";
import SelectMenu from "./components/SelectMenu";
// import Button from "./components/Button";

import "./App.css";

function App() {
  const [categoriesList, setCategoriesList] = useState<MenuCategory<Field>[]>(
    []
  );

  const [showSelectMenu, setShowSelectMenu] = useState(true);
  const [menuSampleData, setMenuSampleData] = useState<Record<string, Field[]>>(
    {}
  );

  const selectMenu = (menu: string) => {
    if (menu === "Dinner") {
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
  };
  console.log(categoriesList);

  const funcSetMenuSampleData = (
    localSelectedCategoryItems: Record<string, Field[]>
  ) => {
    setMenuSampleData(localSelectedCategoryItems);
  };

  if (showSelectMenu) {
    return <SelectMenu selectMenuFunc={selectMenu} />;
  }
  return (
    <div className="row app-container g-0">
      <Categories
        categoriesList={categoriesList}
        menuSampleDataFunc={funcSetMenuSampleData}
        selectedData={menuSampleData}
      />
    </div>
  );
}

export default App;
