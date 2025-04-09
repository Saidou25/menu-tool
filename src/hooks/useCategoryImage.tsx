import { useCallback } from "react";
import { StyleFormType } from "../data/types";

export function useCategoryImage(
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>
) {
  const handleCategoryImage = useCallback(
    (url: string, categoryIndex: number) => {
      setStyleForm((prevState) => {
        const newCategoryImage = [...prevState.categoryImage];
        const existingIndex = newCategoryImage.findIndex(
          (img) => img.categoryIndex === categoryIndex
        );

        if (existingIndex !== -1) {
          newCategoryImage[existingIndex] = {
            categoryIndex,
            url: url,
          };
        } else {
          newCategoryImage.push({
            categoryIndex,
            url: url,
          });
        }

        return {
          ...prevState,
          categoryImage: newCategoryImage,
        };
      });
    },
    [setStyleForm]
  );

  return handleCategoryImage;
}
