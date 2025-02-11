import { useState } from "react";
import { Field } from "./data/sharables";
import Preview from "./components/Preview";
import Button from "./components/Button";
import Sharables from "./components/Sharables";
import Wings from "./components/Wings";
import Salads from "./components/Salads";
import Soups from "./components/Soups";

import "./App.css";

function App() {
  const [sharablesReady, setSharablesReady] = useState<Field[]>([]);
  const [wingsReady, setWingsReady] = useState<Field[]>([]);
  const [saladsReady, setSaladsReady] = useState<Field[]>([]);
  const [soupsReady, setSoupsReady] = useState<Field[]>([]);
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
        selectedSoups={soupsReady}
        selectedSalads={saladsReady}
        goBack={handleGoBack}
      />
    );
  }

  return (
    <>
      <Sharables
        readyForPreview={handleSharablesReady}
        selectedSharables={sharablesReady}
      />
      <Wings readyForPreview={handleWingsReady} selectedWings={wingsReady} />
      <Salads
        readyForPreview={handleSaladsReady}
        selectedSalads={saladsReady}
      />
      <Soups readyForPreview={handleSoupsReady} selectedSoups={soupsReady} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Button type="button" onClick={handleClick}>
        Submit
      </Button>
    </>
  );
}

export default App;
