import { useState } from "react";
import Preview from "./components/Preview";
import { Field } from "./data/sharables";
import Button from "./components/Button";
import Sharables from "./components/Sharables";

import "./App.css";

function App() {
  const [sharablesReady, setSharablesReady] = useState<Field[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Handle go back to modify inputs
  const handleGoBack = () => {
    setShowPreview(false);
  };

  // Handle updating selected sharables when prices change
  const handleSharablesReady = (updatedSharables: Field[]) => {
    // console.log(updatedSharables); // This will now log when the price is changed
    setSharablesReady(updatedSharables);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (sharablesReady.length > 0) {
      setShowPreview(true);
    }
  };

  

  if (showPreview) {
    return <Preview selectedSharables={sharablesReady} goBack={handleGoBack} />;
  }

  return (
    <>
      <Sharables
        readyForPreview={handleSharablesReady}
        selectedSharables={sharablesReady}
      />
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
