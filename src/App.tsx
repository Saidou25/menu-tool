import { useState } from "react";
import { Field } from "./data/sharables";
import Preview from "./components/Preview";
import Button from "./components/Button";
import Sharables from "./components/Sharables";
import Wings from "./components/Wings";
import Salads from "./components/Salads";
import Soups from "./components/Soups";
import Sandwiches from "./components/Sandwiches";
import Burgers from "./components/Burgers";
import BigEats from "./components/BigEats";
import Sides from "./components/Sides";
import GenericCategories from "./components/GenericCategories";

import "./App.css";

function App() {
  const [sharablesReady, setSharablesReady] = useState<Field[]>([]);
  const [wingsReady, setWingsReady] = useState<Field[]>([]);
  const [saladsReady, setSaladsReady] = useState<Field[]>([]);
  const [soupsReady, setSoupsReady] = useState<Field[]>([]);
  const [sandwichesReady, setSandwichesReady] = useState<Field[]>([]);
  const [burgersReady, setBurgersReady] = useState<Field[]>([]);
  const [bigEatsReady, setBigEatsReady] = useState<Field[]>([]);
  const [sidesReady, setSidesReady] = useState<Field[]>([]);
  const [showPreview, setShowPreview] = useState(false);


  // Handle go back to modify inputs
  const handleGoBack = () => {
    setShowPreview(false);
  };

  // Handle updating selected sharables when prices change
  const handleSharablesReady = (updatedSharables: Field[]) => {
    setSharablesReady(updatedSharables);
  };

  // Handle updating selected sharables when prices change
  const handleWingsReady = (updatedWings: Field[]) => {
    setWingsReady(updatedWings);
  };

  // Handle updating selected sharables when prices change
  const handleSaladsReady = (updatedSalads: Field[]) => {
    setSaladsReady(updatedSalads);
  };

  // Handle updating selected sharables when prices change
  const handleSoupsReady = (updatedSoups: Field[]) => {
    setSoupsReady(updatedSoups);
  };

  // Handle updating selected sharables when prices change
  const handleSandwichesReady = (updatedSandwiches: Field[]) => {
    setSandwichesReady(updatedSandwiches);
  };

  // Handle updating selected sharables when prices change
  const handleBurgersReady = (updatedBurgers: Field[]) => {
    setBurgersReady(updatedBurgers);
  };

  // Handle updating selected sharables when prices change
  const handleBigEatsReady = (updatedBigEats: Field[]) => {
    setBigEatsReady(updatedBigEats);
  };

  // Handle updating selected sharables when prices change
  const handleSidesReady = (updatedSides: Field[]) => {
    setSidesReady(updatedSides);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      sharablesReady.length ||
      wingsReady.length ||
      saladsReady.length ||
      soupsReady.length
    ) {
      setShowPreview(true);
    }
  };

  if (showPreview) {
    return (
      <Preview
        selectedSharables={sharablesReady}
        selectedWings={wingsReady}
        selectedSalads={saladsReady}
        selectedSoups={soupsReady}
        selectedSandwiches={sandwichesReady}
        selectedBurgers={burgersReady}
        selectedBigEats={bigEatsReady}
        selectedSides={sidesReady}
        goBack={handleGoBack}
      />
    );
  }

  return (
    <>
      <div className="row app-container g-0">
        <h1 className="col-12 categories-container pt-5">
          Add categories to your menu:
        </h1>
        <div className="col-3 p-1">
          <Sharables
            readyForPreview={handleSharablesReady}
            selectedSharables={sharablesReady}
          />
        </div>
        {/* <div className="col-3 p-1">
          <Wings
            readyForPreview={handleWingsReady}
            selectedWings={wingsReady}
          />
        </div> */}

         <div className="col-3 p-1 m-0">
         <Salads
            readyForPreview={handleSaladsReady}
            selectedSalads={saladsReady}
          />
        </div>
       {/* <div className="col-3 p-1 m-0">
          <Soups
            readyForPreview={handleSoupsReady}
            selectedSoups={soupsReady}
          />
        </div> */}

       <div className="col-3 p-1 m-0">
          <Sandwiches
            readyForPreview={handleSandwichesReady}
            selectedSandwiches={sandwichesReady}
          />
        </div>
          {/*
        <div className="col-3 p-1 m-0">
          <Burgers
            readyForPreview={handleBurgersReady}
            selectedBurgers={burgersReady}
          />
        </div> */}

        {/* <div className="col-3 p-1 m-0">
          <BigEats
            readyForPreview={handleBigEatsReady}
            selectedBigEats={bigEatsReady}
          />
        </div> */}

        {/* <div className="col-3 p-1 m-0">
          <Sides
            readyForPreview={handleSidesReady}
            selectedSides={sidesReady}
          />
        </div> */}
        <div className="col-3 p-1 m-0">
          {/* <GenericCategories items={sharablesReady} title="Title"/> */}
        </div>
        <div className="col-12">
          <Button className="button" type="button" onClick={handleClick}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
