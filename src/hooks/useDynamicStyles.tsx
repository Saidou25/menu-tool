import { StyleFormType } from "../data/types";
import { useGetSectionBackground } from "./useGetSectionBackground";

export function useDynamicStyles(styleForm: StyleFormType) {
  const getSectionBackground = useGetSectionBackground(styleForm);
  const getDynamicStyles = (className: string, categoryIndex: number) => {
    if (className === "col-6") {
      if (categoryIndex === 0 || categoryIndex % 2 === 0) {
        return {
          backgroundColor: getSectionBackground(categoryIndex),
          paddingLeft: `${styleForm.paddingCategoriesLeftRight}px`,
          paddingRight: "1.5rem",
        };
      } else {
        return {
          paddingRight: `${styleForm.paddingCategoriesLeftRight}px`,
          // paddingLeft: "16px"
        };
      }
      // console.log(className, categoryIndex, joinedCategories)
    } else if (className === "col-12 content-container") {
      return {
        // backgroundColor: getSectionBackground(categoryIndex),
        // marginBottom: `${styleForm.categoriesMarginBottom}px`,
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
        // marginBottom: `${styleForm.categoriesMarginBottom}px`,
        paddingRight: `${styleForm.paddingCategoriesLeftRight}px`,
        paddingLeft: `${styleForm.paddingCategoriesLeftRight}px`,
      };
    }
    return {};
  };
  return getDynamicStyles;
}
