import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useCategoryBackgroundColor(
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>
) {
  const handleCategoryBackgroundColor = useCallback(
    (color: string, categoryIndex: number) => {
      setStyleForm((prevState) => {
        const newSectionBackground = [...prevState.sectionBackground];
        const existingIndex = newSectionBackground.findIndex(
          (bg) => bg.categoryIndex === categoryIndex
        );

        if (existingIndex !== -1) {
          newSectionBackground[existingIndex] = {
            categoryIndex,
            backgroundColor: color,
          };
        } else {
          newSectionBackground.push({
            categoryIndex,
            backgroundColor: color,
          });
        }

        return {
          ...prevState,
          sectionBackground: newSectionBackground,
        };
      });
    },
    [setStyleForm]
  );

  return handleCategoryBackgroundColor;
}
