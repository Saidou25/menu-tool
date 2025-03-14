import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useCategoryMarginTop(
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>
) {
  const handleCategoryMarginTop = useCallback(
    (marginTop: number, categoryIndex: number) => {
      setStyleForm((prevState) => {
        const newMarginCategoriesTop = [...prevState.marginCategoriesTop];
        const existingIndex = newMarginCategoriesTop.findIndex(
          (mt) => mt.categoryIndex === categoryIndex
        );

        if (existingIndex !== -1) {
          newMarginCategoriesTop[existingIndex] = {
            categoryIndex,
            marginCategoriesTop: marginTop,
          };
        } else {
          newMarginCategoriesTop.push({
            categoryIndex,
            marginCategoriesTop: marginTop,
          });
        }

        return {
          ...prevState,
          marginCategoriesTop: newMarginCategoriesTop,
        };
      });
    },
    [setStyleForm]
  );

  return handleCategoryMarginTop;
}
