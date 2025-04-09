import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useGetCategoryImage(styleForm: StyleFormType) {
  const getCategoryImage = useCallback(
    (index: number) => {
      if (!Array.isArray(styleForm.categoryImage)) {
        return ""; // Return an empty string if it's not an array
      }

      if (styleForm.categoryImage.length === 0) {
        return ""; // Return an empty string if the array is empty
      }

      const section = styleForm.categoryImage.find(
        (bg) => bg.categoryIndex === index
      );

      return section ? { url: section.url, index: section.categoryIndex} : ""; // Return the color or an empty string if not found
    },
    [styleForm] // Dependencies array should be inside `useCallback`
  );

  return getCategoryImage; // Return the function
}
