import { StyleFormType } from "../data/types";
import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
import { useCategoryPaddingTop } from "../hooks/useCategoryPaddingTop";
// import { useDescriptionLettersColor } from "../hooks/useDescriptionLettersColor";
// import { useDynamicStyles } from "../hooks/useDynamicStyles";
// import { useGetCategoriesPaddingTop } from "../hooks/useGetCategoriesPaddingTop";
// import { useGetDescriptionLetterColor } from "../hooks/useGetDescriptionLettersColor";
// import { useGetCategoriesMarginTop } from "../hooks/useGetMarginCategoriesTop";
import { useCategoryMarginTop } from "../hooks/useMarginCategoriesTop";
// import { useGetSectionBackground } from "../hooks/useGetSectionBackground";
// import { useGetSubtitleFontColor } from "../hooks/useGetSubtitleFontColor";
// import { useCategoryMarginTop } from "../hooks/useMarginCategoriesTop";
// import { useSubtitleFontColor } from "../hooks/useSubtitleFontColor";

type Props = {
      styleForm: StyleFormType;
      showDecorations: string;
      setShowDecorations: (category: string) => void;
      setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
    showPaddingCategoriesTop: boolean;
    showMarginCategoriesTop: boolean;
    showJoinInputs: boolean;
    showColorInputs: boolean;
    showDecorationCheckboxes: boolean;
    categoryIndex: number;
}

export default function Tools({
    // styleForm,
    setStyleForm,
    // showDecorations,
    // setShowDecorations,
    showPaddingCategoriesTop,
    showMarginCategoriesTop,
    showJoinInputs,
    showColorInputs,
    showDecorationCheckboxes,
    categoryIndex
 }: Props) {

     const handleCategoryPaddingTop = useCategoryPaddingTop(setStyleForm);
      const handleCategoryBackgroundColor =
        useCategoryBackgroundColor(setStyleForm);
    //   const handleDescriptionLettersColor =
    //     useDescriptionLettersColor(setStyleForm);
      const handleCategoryMarginTop = useCategoryMarginTop(setStyleForm);
    //   const handleSubtitleFontColor = useSubtitleFontColor(setStyleForm);
    //   const getSectionBackground = useGetSectionBackground(styleForm);
    //   const getDescriptionLetterColor = useGetDescriptionLetterColor(styleForm);
    //   const getCategoryPaddingTop = useGetCategoriesPaddingTop(styleForm);
    //   const getCategoryMarginTop = useGetCategoriesMarginTop(styleForm);
    //   const getDynamicStyles = useDynamicStyles(styleForm);
    //   const getSubtitleFontColor = useGetSubtitleFontColor(styleForm);

  return (
    <div>
      {showPaddingCategoriesTop && (
        <input
          type="number"
          className="no-print"
          onChange={(event) =>
            handleCategoryPaddingTop(+event.target.value, categoryIndex)
          }
        />
      )}
      &nbsp;
      {showMarginCategoriesTop && (
        <input
          type="number"
          className="no-print"
          onChange={(event) =>
            handleCategoryMarginTop(+event.target.value, categoryIndex)
          }
        />
      )}
      {showJoinInputs && (
        <input
          className="custom-input"
          type="checkbox"
        //   onChange={() =>
        //     setJoinedCategories((prev) => {
        //       const newState = { ...prev };
        //       if (newState[category]) {
        //         delete newState[category]; // Remove the category when toggled off
        //       } else {
        //         newState[category] = true; // Add category when toggled on
        //       }
        //       return newState;
        //     })
        //   }
        //   checked={joinedCategories[category] || false}
        />
      )}
      {showColorInputs && (
        <>
          <input
            type="color"
            className="no-print"
            onChange={(event) =>
              handleCategoryBackgroundColor(event.target.value, categoryIndex)
            }
          />
          <button
            type="button"
            onClick={() => handleCategoryBackgroundColor("", categoryIndex)}
          >
            reset
          </button>
        </>
      )}
      {showDecorationCheckboxes && (
        <input
          type="checkbox"
          className="no-print"
        //   checked={showDecorations === category}
        //   onChange={() => setShowDecorations(category)}
        />
      )}
    </div>
  );
}
