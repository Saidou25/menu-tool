import { useSelectMenuType } from "./hooks/useSelectMenuType";
import { Field } from "./data/types"; // Import both MenuCategory and Field from types.ts
import { AppStateProvider, useAppState } from "./hooks/useAppState";

import Categories from "./components/Categories";
import LandingPage from "./components/LandingPage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function AppContent() {
  const { selectedMenu, menuSampleData, setMenuSampleData } = useAppState();

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
        menuSampleDataFunc={funcSetMenuSampleData}
        selectedData={menuSampleData}
      />
    );

  return <LandingPage />;
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
