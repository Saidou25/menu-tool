import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useGetCategoriesPaddingTop(styleForm: StyleFormType) {
  const getCategoryPaddingTop = useCallback(
    (index: number) => {
      if (!Array.isArray(styleForm.paddingCategoriesTop)) {
        return ""; // Return an empty string if it's not an array
      }

      if (styleForm.paddingCategoriesTop.length === 0) {
        return ""; // Return an empty string if the array is empty
      }

      const category = styleForm.paddingCategoriesTop.find(
        (mt) => mt.categoryIndex === index
      );

      return category ? `${category.paddingCategoriesTop}px` : ""; // Return the color or an empty string if not found
    },
    [styleForm] // Dependencies array should be inside `useCallback`
  );

  return getCategoryPaddingTop; // Return the function
}
