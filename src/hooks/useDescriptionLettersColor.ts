import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useDescriptionLettersColor(
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>
) {
  const handleDescriptionLettersColor = useCallback(
    (color: string, categoryIndex: number, index: number) => {
      setStyleForm((prevState) => {
        const newdescriptionLetterColor = [...prevState.descriptionLetterColor];

        // Find the existing entry
        const existingIndex = newdescriptionLetterColor.findIndex(
          (entry) =>
            entry.categoryIndex === categoryIndex && entry.index === index
        );

        if (existingIndex !== -1) {
          // Update existing entry
          newdescriptionLetterColor[existingIndex] = {
            categoryIndex,
            index,
            descriptionLetterColor: color,
          };
        } else {
          // Add new entry
          newdescriptionLetterColor.push({
            categoryIndex,
            index,
            descriptionLetterColor: color,
          });
        }

        return {
          ...prevState,
          descriptionLetterColor: newdescriptionLetterColor,
        };
      });
    },
    [setStyleForm]
  );
  return handleDescriptionLettersColor;
}
