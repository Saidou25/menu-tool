import { StyleFormType } from "../data/types";
import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
import { useCategoryImage } from "../hooks/useCategoryImage";
// import { useCategoryImageSize } from "../hooks/useCategoryImageSize";
import { useCategoryPaddingTop } from "../hooks/useCategoryPaddingTop";
import { useCategoryMarginTop } from "../hooks/useMarginCategoriesTop";
import Button from "./Button";
import Input from "./Input";

import "./InputBar.css";

type InputBarProps = {
  url?: string | undefined;
  // flatItemsCategories: MenuCategory[];
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
  setShowDecorations?: (category: string) => void;
  showCategoryImage?: boolean;
  setShowCategoryImage?: (item: boolean) => void;
};

export default function InputBar({
  url,
  className,
  showPaddingCategoriesTop,
  showMarginCategoriesTop,
  showJoinInputs,
  showColorInputs,
  showDecorationCheckboxes,
  joinedCategories,
  setJoinedCategories,
  customCategory,
  styleForm,
  setStyleForm,
  categoryIndex,
  showDecorations,
  setShowDecorations,
  showCategoryImage,
  // flatItemsCategories
  // setShowCategoryImage,
}: InputBarProps) {
  const handleCategoryPaddingTop = useCategoryPaddingTop(setStyleForm);
  const handleCategoryMarginTop = useCategoryMarginTop(setStyleForm);
  const handleCategoryBackgroundColor =
    useCategoryBackgroundColor(setStyleForm);
  const handleCategoryImage = useCategoryImage(setStyleForm);
  // const handleCategoryImageSize = useCategoryImageSize(setStyleForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    let newValue: string;
    if (files?.[0]) {
      newValue = URL.createObjectURL(files[0]); // Create an object URL for the image
    } else {
      newValue = ""; // No file chosen
    }
    handleCategoryImage(newValue, categoryIndex);
    // Update parent state
    // setStyleForm((prevState) => ({
    //   ...prevState,
    //   [keyToUpdate]: newValue,
    // }));
  };
  const handleDeleteImage = (index: number) => {
    // Check if categoryImage exists in the styleForm
    if (!styleForm || !styleForm.categoryImage) return;
  
    const localUrl = url ? url : "" ; // The URL of the image to delete
    
    // Find the item you want to modify in the categoryImage array
    const updatedCategoryImage = styleForm.categoryImage.map((item) => {
      // If the item matches the index and the URL, set the URL to an empty string
      if (item.categoryIndex === index && item.url === localUrl) {
        return { ...item, url: "" }; // Set URL to an empty string
      }
      return item; // Otherwise, return the item unchanged
    });
  
    // Update the state with the modified categoryImage array
    setStyleForm((prevState) => ({
      ...prevState,
      categoryImage: updatedCategoryImage,
    }));
  };
  

  return (
    <div className="input-bar-container">
      {showCategoryImage && (
        <div>
          <label
            htmlFor={`file-upload-${customCategory.title}-${categoryIndex}`}
            className="custom-file-upload"
          >
            {/* <span id={`file-name-${item}`}>
              {localStyleForm[keyMap[item as keyof typeof keyMap]]
                ? "File selected"
                : "No file chosen"}
            </span> */}
            &nbsp;
            <button
              type="button"
              className="file-button"
              onClick={() =>
                document
                  .getElementById(
                    `file-upload-${customCategory.title}-${categoryIndex}`
                  )
                  ?.click()
              }
            >
              Choose File
            </button>
            &nbsp;
            <button
              type="button"
              className="file-button"
              onClick={() => handleDeleteImage(categoryIndex)}
            >
              Delete Image
            </button>
          </label>
          <Input
            id={`file-upload-${customCategory.title}-${categoryIndex}`}
            type="file"
            name={customCategory.title}
            onChange={handleChange}
            htmlFor={`file-upload-${customCategory.title}-${categoryIndex}`}
          />
          {/* <input
            id={`file-upload-${customCategory.title}-${categoryIndex}`}
            type="number"
            name={customCategory.title}
            onChange={(event) => handleCategoryImageSize(event.target.value, categoryIndex)}
            // htmlFor={`file-upload-${customCategory.title}-${categoryIndex}`}
          /> */}
        </div>
      )}
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
          checked={
            !!joinedCategories[customCategory.title ?? customCategory.category]
          }
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
            setShowDecorations?.(
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
