import { StyleFormType } from "../data/types";
import { useGetSectionBackground } from "./useGetSectionBackground";

export function useDynamicStyles(styleForm: StyleFormType) {
  const getSectionBackground = useGetSectionBackground(styleForm);
  let arr: { className: string; categoryIndex: number }[] = []; // Array to track items

  const getDynamicStyles = (className: string, categoryIndex: number) => {
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
    }
    return {};
  };

  return getDynamicStyles;
}
