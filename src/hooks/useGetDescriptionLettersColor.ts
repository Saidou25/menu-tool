import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useGetDescriptionLetterColor(styleForm: StyleFormType) {
  const getDescriptionLetterColor = useCallback(
    (categoryIndex: number, index: number) => {
      if (!Array.isArray(styleForm.descriptionLetterColor)) {
        return "";
      }

      const descriptionSection = styleForm.descriptionLetterColor.find(
        (entry) =>
          entry.categoryIndex === categoryIndex && entry.index === index
      );

      return descriptionSection
        ? descriptionSection.descriptionLetterColor
        : "";
    },
    [styleForm]
  );

  return getDescriptionLetterColor;
}
