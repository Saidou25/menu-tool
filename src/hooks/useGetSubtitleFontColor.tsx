import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useGetSubtitleFontColor(styleForm: StyleFormType) {
  const getSubtitleFontColor = useCallback(
    (index: number) => {
      if (!Array.isArray(styleForm.subtitleFontColor)) {
        return ""; // Return an empty string if it's not an array
      }

      if (styleForm.subtitleFontColor.length === 0) {
        return ""; // Return an empty string if the array is empty
      }

      const subtitle = styleForm.subtitleFontColor.find(
        (fc) => fc.categoryIndex === index
      );

      return subtitle ? subtitle.subtitleFontColor : ""; // Return the color or an empty string if not found
    },
    [styleForm] // Dependencies array should be inside `useCallback`
  );

  return getSubtitleFontColor; // Return the function
}
