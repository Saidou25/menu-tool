import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useGetCategoriesMarginTop(styleForm: StyleFormType) {
  const getCategoryMarginTop = useCallback(
    (index: number) => {
      if (!Array.isArray(styleForm.marginCategoriesTop)) {
        return ""; // Return an empty string if it's not an array
      }

      if (styleForm.marginCategoriesTop.length === 0) {
        return ""; // Return an empty string if the array is empty
      }

      const category = styleForm.marginCategoriesTop.find(
        (mt) => mt.categoryIndex === index
      );

      return category ? `${category.marginCategoriesTop}px` : ""; // Return the color or an empty string if not found
    },
    [styleForm] // Dependencies array should be inside `useCallback`
  );

  return getCategoryMarginTop; // Return the function
}
