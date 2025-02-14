import { useState } from "react";
import { Field, sharablesList } from "./data/sharables";
import { burgersList } from "./data/burgers";
import { saladsList } from "./data/salads";
import { sandwichesList } from "./data/sandwiches";
import { wingsList } from "./data/wings";
import { bigEatsList } from "./data/bigEats";
import { sidesList } from "./data/sides";
import { soupsList } from "./data/soups";

// import Button from "./components/Button";
import Categories from "./components/Categories";

import "./App.css";

function App() {
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

  const funcSetMenuSampleData = (
    localSelectedCategoryItems: Record<string, Field[]>
  ) => {
    setMenuSampleData(localSelectedCategoryItems);
  };

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
