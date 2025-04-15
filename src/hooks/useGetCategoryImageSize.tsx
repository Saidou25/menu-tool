import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useGetCategoryImageSize(styleForm: StyleFormType) {
  const getCategoryImageSize = useCallback(
    (index: number) => {
      if (!Array.isArray(styleForm.categoryImageSize)) {
        return ""; // Return an empty string if it's not an array
      }

      if (styleForm.categoryImageSize.length === 0) {
        return ""; // Return an empty string if the array is empty
      }

      const section = styleForm.categoryImageSize.find(
        (sz) => sz.categoryIndex === index
      );

      return section ? { width: section.width, imageIndex: section.categoryIndex} : ""; // Return the color or an empty string if not found
    },
    [styleForm] // Dependencies array should be inside `useCallback`
  );

  return getCategoryImageSize; // Return the function
}
