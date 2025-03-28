import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useCategoryPaddingTop(
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>
) {
  const handleCategoryPaddingTop = useCallback(
    (marginTop: number, categoryIndex: number) => {
      
      setStyleForm((prevState) => {
        const newPaddingCategoriesTop = [...prevState.paddingCategoriesTop];
        const existingIndex = newPaddingCategoriesTop.findIndex(
          (mt) => mt.categoryIndex === categoryIndex
        );

        if (existingIndex !== -1) {
          newPaddingCategoriesTop[existingIndex] = {
            categoryIndex,
            paddingCategoriesTop: marginTop,
          };
        } else {
          newPaddingCategoriesTop.push({
            categoryIndex,
            paddingCategoriesTop: marginTop,
          });
        }

        return {
          ...prevState,
          paddingCategoriesTop: newPaddingCategoriesTop,
        };
      });
    },
    [setStyleForm]
  );

  return handleCategoryPaddingTop;
}
