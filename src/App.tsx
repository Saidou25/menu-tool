import { useState } from "react";
import { sharablesList } from "./data/sharables";
import { burgersList } from "./data/burgers";
import { saladsList } from "./data/salads";
import { sandwichesList } from "./data/sandwiches";
import { wingsList } from "./data/wings";
import { bigEatsList } from "./data/bigEats";
import { sidesList } from "./data/sides";
import { soupsList } from "./data/soups";

import Preview from "./components/Preview";
import Button from "./components/Button";
import Generic from "./components/Categories";

import "./App.css";

function App() {
  const [showPreview, setShowPreview] = useState(false);

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

  // Handle go back to modify inputs
  const handleGoBack = () => {
    setShowPreview(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("button clicked");
  };

  if (showPreview) {
    return <Preview goBack={handleGoBack} />;
  }

  return (
    <div className="row app-container g-0">
      <h1 className="col-12 add-categories pt-5">
        Add categories to your menu:
      </h1>
      <Generic categoriesList={categoriesList} />
      <div className="col-12">
        <Button className="button" type="button" onClick={handleClick}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default App;
