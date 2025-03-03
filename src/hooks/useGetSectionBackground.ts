import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useGetSectionBackground(styleForm: StyleFormType) {
  const getSectionBackground = useCallback(
    (index: number) => {
      if (!Array.isArray(styleForm.sectionBackground)) {
        return ""; // Return an empty string if it's not an array
      }

      if (styleForm.sectionBackground.length === 0) {
        return ""; // Return an empty string if the array is empty
      }

      const section = styleForm.sectionBackground.find(
        (bg) => bg.categoryIndex === index
      );

      return section ? section.backgroundColor : ""; // Return the color or an empty string if not found
    },
    [styleForm] // Dependencies array should be inside `useCallback`
  );

  return getSectionBackground; // Return the function
}
