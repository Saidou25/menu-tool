import { useEffect } from "react";
import { Field } from "../data/types";
import { useAppState } from "../hooks/useAppState";

import PreviewMenu from "./PreviewMenu";
import PreviewTool from "./PreviewTool";
import DropDown from "./DropDown";
import LayoutTools from "./LayoutTools";
import CustomCategoriesSelect from "./CustomCategoriesSelect";
import CategoriesSelect from "./CategoriesSelect";
import Logos from "./Logos";

import "./Categories.css";

type Props = {
  categoriesList: Array<{ title: string; subtitle?: string; items: Field[] }>;
  selectedData: Record<string, { subtitle?: string; items: Field[] }>; // Update here
  menuSampleDataFunc: (
    localSelectedCategoryItems: Record<
      string,
      { subtitle?: string; items: Field[] }
    >
  ) => void;
};

export default function Categories({
  selectedData,
  menuSampleDataFunc,
  categoriesList,
}: Props) {
  const {
    localSelectedCategoryItems,
    setLocalSelectedCategoryItems,
    menuPreview,
    setIsDesserts,
    custom,
  } = useAppState();

  useEffect(() => {
    if (Object.keys(localSelectedCategoryItems).length > 0) {
      menuSampleDataFunc(localSelectedCategoryItems);
    }
  }, [localSelectedCategoryItems, menuSampleDataFunc]);

  // Runs every time selectedData or categoriesList changes
  useEffect(() => {
    if (categoriesList.length > 0 && Object.keys(selectedData).length > 0) {
      const updatedData = Object.fromEntries(
        Object.entries(selectedData).map(([category, { items }]) => {
          const matchedCategory = categoriesList.find(
            (c) =>
              c.title.trim().toLowerCase() === category.trim().toLowerCase()
          );
          return [
            category,
            {
              subtitle: matchedCategory?.subtitle || "",
              items,
            },
          ];
        })
      );

      // Prevent infinite loop by checking if state has actually changed
      setLocalSelectedCategoryItems((prev: any) => {
        if (JSON.stringify(prev) !== JSON.stringify(updatedData)) {
          return updatedData;
        }
        return prev;
      });
    }
  }, [selectedData, categoriesList]); // Runs only when dependencies change

  useEffect(() => {
    if (categoriesList.length === 1) {
      setIsDesserts(true);
    }
  }, []);

  if (menuPreview) {
    return (
      <PreviewMenu dataSample={localSelectedCategoryItems}>
        <PreviewTool message="Confirm printing or continue editing" />
        <DropDown message="formats" width="100" />
        <LayoutTools />
      </PreviewMenu>
    );
  }

  return (
    <div className="row app-container g-0 pb-5">
      <Logos />
      {custom ? (
        <CustomCategoriesSelect
          categoriesList={categoriesList}
          selectedData={selectedData}
        />
      ) : (
        <CategoriesSelect categoriesList={categoriesList} />
      )}
    </div>
  );
}
