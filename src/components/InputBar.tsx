import { StyleFormType } from "../data/types";
import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
import { useCategoryPaddingTop } from "../hooks/useCategoryPaddingTop";
import { useCategoryMarginTop } from "../hooks/useMarginCategoriesTop";
import Button from "./Button";
import Input from "./Input";

import "./InputBar.css";

type InputBarProps = {
  className: string;
  showPaddingCategoriesTop: boolean;
  showMarginCategoriesTop: boolean;
  showJoinInputs: boolean;
  showColorInputs: boolean;
  showDecorationCheckboxes: boolean;
  joinedCategories: Record<string, boolean>;
  setJoinedCategories: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  customCategory: any;
  categoryIndex: number;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
  showDecorations: string;
  setShowDecorations: (category: string) => void;
};

export default function InputBar({
  className,
  showPaddingCategoriesTop,
  showMarginCategoriesTop,
  showJoinInputs,
  showColorInputs,
  showDecorationCheckboxes,
  joinedCategories,
  setJoinedCategories,
  customCategory,
  //    styleForm,
  setStyleForm,
  categoryIndex,
  showDecorations,
  setShowDecorations,
}: InputBarProps) {
  const handleCategoryPaddingTop = useCategoryPaddingTop(setStyleForm);
  const handleCategoryMarginTop = useCategoryMarginTop(setStyleForm);
  const handleCategoryBackgroundColor =
    useCategoryBackgroundColor(setStyleForm);

  // console.log("customCategory", customCategory.category);
  return (
    <div className="input-bar-container">
      {showPaddingCategoriesTop && (
        <input
          type="number"
          className={className}
          onChange={(event) =>
            handleCategoryPaddingTop(+event.target.value, categoryIndex)
          }
          style={{ width: "18%", height: "30px" }}
        />
      )}
      &nbsp;
      {showMarginCategoriesTop && (
        <input
          type="number"
          className={className}
          onChange={(event) =>
            handleCategoryMarginTop(+event.target.value, categoryIndex)
          }
          style={{ width: "18%", height: "30px" }}
        />
      )}
      &nbsp;
      {showJoinInputs && (
     <Input
     className={`custom-input-${className}`}
     type="checkbox"
     onChange={() =>
       setJoinedCategories((prev) => {
         const newState = { ...prev };
         const key = customCategory.title ?? customCategory.category; // Use whichever exists
   
         if (key) {
           if (newState[key]) {
             delete newState[key]; // Remove if it exists (toggle off)
           } else {
             newState[key] = true; // Add if it doesn't exist (toggle on)
           }
         }
   
         return newState;
       })
     }
     checked={!!joinedCategories[customCategory.title ?? customCategory.category]}
   />
   
      )}
      {showColorInputs && (
        <>
          <Input
            type="color"
            className={`menu-color-inputs-${className}`}
            onChange={(event) =>
              handleCategoryBackgroundColor(event.target.value, categoryIndex)
            }
          />
          &nbsp;&nbsp;
          <Button
            type="button"
            onClick={() => handleCategoryBackgroundColor("", categoryIndex)}
          >
            reset
          </Button>
          &nbsp;&nbsp;
        </>
      )}
      {showDecorationCheckboxes && (
        <Input
          type="checkbox"
          className={`show-decoration-${className}`}
          id="show-decoration"
          htmlFor="show-decoration"
          checked={
            showDecorations === customCategory.title ||
            showDecorations === customCategory.category
          }
          onChange={() =>
            setShowDecorations(
              customCategory.title
                ? customCategory.title
                : customCategory.category
            )
          }
        />
      )}
    </div>
  );
}
