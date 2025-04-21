import { useEffect, useState } from "react";
import { MenuCategory } from "../data/types";
import { useAppState } from "./useAppState";

import * as Dinner from "../data/Dinner";  // Import all the lists from the Dinner folder
import * as Desserts from "../data/Desserts";

export function useSelectMenuType(selectedMenu: string) {
  const [categoriesList, setCategoriesList] = useState<MenuCategory[]>([]);

  const { setCustomCategoryList, setCustom } = useAppState();
 
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

  const selectMenu = (selectedMenu: string) => {
    if (selectedMenu === "Dinner") {
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
    if (selectedMenu === "Desserts") {
      // Set categoriesList to the lists from the Dessert's folder
      setCategoriesList([Desserts.dessertsList]);
    }
    if (selectedMenu === "Custom") {
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

  useEffect(() => {
    if (selectedMenu) {
      selectMenu(selectedMenu);
    }
  }, [selectedMenu]);
  return { categoriesList };
}
