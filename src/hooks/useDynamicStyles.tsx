import { StyleFormType } from "../data/types";
import { useGetCategoryImage } from "./useGetCategoryImage";
// import { useGetCategoryImageSize } from "./useGetCategoryImageSize";
import { useGetSectionBackground } from "./useGetSectionBackground";

export function useDynamicStyles(styleForm: StyleFormType) {
  const getSectionBackground = useGetSectionBackground(styleForm);
  const getCategoryImage = useGetCategoryImage(styleForm);
  // const getCategoryImageSize = useGetCategoryImageSize(styleForm);

  let arr: { className: string; categoryIndex: number}[] = []; // Array to track items

  const getDynamicStyles = (className: string, categoryIndex: number) => {
    const { url } = getCategoryImage(categoryIndex) || {};
    if (className === "col-6") {
      let obj = { className, categoryIndex };
      arr.push(obj);
      let styles: any = {
        backgroundColor: getSectionBackground(categoryIndex),
      };

      // Only apply paddingLeft to arr[i - 1] if certain conditions are met
      if (arr.length > 1) {
        for (let i = 1; i < arr.length; i++) {
          if (arr[i]?.categoryIndex === arr[i - 1]?.categoryIndex + 1) {
            // Apply paddingLeft to arr[i - 1] only, not the current element
            if (arr[i - 1]?.categoryIndex === categoryIndex) {
              styles.paddingLeft = `${styleForm.paddingCategoriesLeftRight}px`;
              styles.paddingRight = "1.5rem";
            }
            if (arr[i]?.categoryIndex === categoryIndex) {
              styles.paddingRight = `${styleForm.paddingCategoriesLeftRight}px`;
            }
            if (
              arr[i]?.categoryIndex === arr[i - 1]?.categoryIndex + 1 &&
              arr[i]?.categoryIndex === arr[i - 2]?.categoryIndex + 2
            ) {
              styles.paddingLeft = `${styleForm.paddingCategoriesLeftRight}px`;
            }
            if (
              arr[i]?.categoryIndex === arr[i - 1]?.categoryIndex + 1 &&
              arr[i]?.categoryIndex === arr[i - 2]?.categoryIndex + 2 &&
              arr[i]?.categoryIndex === arr[i - 3]?.categoryIndex + 3
            ) {
              styles.paddingLeft = 0;
            }
            if (
              arr[i]?.categoryIndex === arr[i - 1]?.categoryIndex + 1 &&
              arr[i]?.categoryIndex === arr[i - 2]?.categoryIndex + 2 &&
              arr[i]?.categoryIndex === arr[i - 3]?.categoryIndex + 3 &&
              arr[i]?.categoryIndex === arr[i - 4]?.categoryIndex + 4
            ) {
              styles.paddingLeft = `${styleForm.paddingCategoriesLeftRight}px`;
            }
            if (
              arr[i]?.categoryIndex === arr[i - 1]?.categoryIndex + 1 &&
              arr[i]?.categoryIndex === arr[i - 2]?.categoryIndex + 2 &&
              arr[i]?.categoryIndex === arr[i - 3]?.categoryIndex + 3 &&
              arr[i]?.categoryIndex === arr[i - 4]?.categoryIndex + 4 &&
              arr[i]?.categoryIndex === arr[i - 5]?.categoryIndex + 5
            ) {
              styles.paddingLeft = 0;
            }
            if (
              arr[i]?.categoryIndex === arr[i - 1]?.categoryIndex + 1 &&
              arr[i]?.categoryIndex === arr[i - 2]?.categoryIndex + 2 &&
              arr[i]?.categoryIndex === arr[i - 3]?.categoryIndex + 3 &&
              arr[i]?.categoryIndex === arr[i - 4]?.categoryIndex + 4 &&
              arr[i]?.categoryIndex === arr[i - 5]?.categoryIndex + 5 &&
              arr[i]?.categoryIndex === arr[i - 6]?.categoryIndex + 6 
            ) {
              styles.paddingLeft = `${styleForm.paddingCategoriesLeftRight}px`;
            }
            if (
              arr[i]?.categoryIndex === arr[i - 1]?.categoryIndex + 1 &&
              arr[i]?.categoryIndex === arr[i - 2]?.categoryIndex + 2 &&
              arr[i]?.categoryIndex === arr[i - 3]?.categoryIndex + 3 &&
              arr[i]?.categoryIndex === arr[i - 4]?.categoryIndex + 4 &&
              arr[i]?.categoryIndex === arr[i - 5]?.categoryIndex + 5 &&
              arr[i]?.categoryIndex === arr[i - 6]?.categoryIndex + 6 &&
              arr[i]?.categoryIndex === arr[i - 7]?.categoryIndex + 7 
            ) {
              styles.paddingLeft = 0;
            }
          }
          if (arr[i]?.categoryIndex !== arr[i - 1]?.categoryIndex + 1) {
            if (arr[i]?.categoryIndex !== arr[i + 1]?.categoryIndex - 1) {
              styles.paddingLeft = `${styleForm.paddingCategoriesLeftRight}px`;
            }
          }
        }
      } else {
        // Ensure the first item gets padding left
        styles.paddingLeft = `${styleForm.paddingCategoriesLeftRight}px`;
        styles.paddingRight = "1.5rem";
      }
      return styles;
    } else if (className === "col-12 content-container") {
      return {
        width: `${styleForm.decorationWidth}%`,
        paddingRight: `${styleForm.paddingDecoration}px`,
        paddingLeft: `${styleForm.paddingDecoration}px`,
        borderLeft: `2px solid black`,
        borderRight: `2px solid black`,
        borderBottom: `2px solid black`,
      };
    } else if (className === "col-12") {
      return {
        backgroundColor: getSectionBackground(categoryIndex),
        paddingRight: `${styleForm.paddingCategoriesLeftRight}px`,
        paddingLeft: `${styleForm.paddingCategoriesLeftRight}px`,
      };
    } else if (className === "col-12 background-image") {
      return {
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        paddingRight: `${styleForm.paddingCategoriesLeftRight}px`,
        paddingLeft: `${styleForm.paddingCategoriesLeftRight}px`,
        // width: `${width}px`, 
        height: "auto"
      };
    }
    return {};
  };

  return getDynamicStyles;
}
