import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useSubtitleFontColor(
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>
) {
  const handleSubtitleFontColor = useCallback(
    (color: string, categoryIndex: number) => {
      setStyleForm((prevState) => {
        const newSubtitleFontColor = [...prevState.subtitleFontColor];
        const existingIndex = newSubtitleFontColor.findIndex(
          (bg) => bg.categoryIndex === categoryIndex
        );

        if (existingIndex !== -1) {
          newSubtitleFontColor[existingIndex] = {
            categoryIndex,
            subtitleFontColor: color,
          };
        } else {
          newSubtitleFontColor.push({
            categoryIndex,
            subtitleFontColor: color,
          });
        }

        return {
          ...prevState,
          subtitleFontColor: newSubtitleFontColor,
        };
      });
    },
    [setStyleForm]
  );

  return handleSubtitleFontColor;
}
