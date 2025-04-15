import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useCategoryImageSize(
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>
) {
  const handleCategoryImageSize = useCallback(
    (width: string, categoryIndex: number) => {
      console.log(width)
      setStyleForm((prevState) => {
        const newCategoryImageSize = [...prevState.categoryImageSize];
        const existingIndex = newCategoryImageSize.findIndex(
          (sz) => sz.categoryIndex === categoryIndex
        );

        if (existingIndex !== -1) {
          newCategoryImageSize[existingIndex] = {
            categoryIndex,
            width: width,
          };
        } else {
          newCategoryImageSize.push({
            categoryIndex,
            width: width,
          });
        }

        return {
          ...prevState,
          categoryImageSize: newCategoryImageSize,
        };
      });
    },
    [setStyleForm]
  );

  return handleCategoryImageSize;
}
