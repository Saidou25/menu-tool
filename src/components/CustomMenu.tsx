import { useState } from "react";
import { Field, StyleFormType } from "../data/types";
import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
import { useDescriptionLettersColor } from "../hooks/useDescriptionLettersColor";
import { useGetSectionBackground } from "../hooks/useGetSectionBackground";
import { useGetDescriptionLetterColor } from "../hooks/useGetDescriptionLettersColor";
import Footer from "./Footer";
// import "./CustomMenu.css";

type Props = {
  categoryOrder: string[];
  organizedData: Record<string, { subtitle?: string; items: Field[] }>;
  showColorInputs: boolean;
  showJoinInputs: boolean;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
  showDisclaimer: boolean;
};

export default function CustomMenu({
  categoryOrder,
  organizedData,
  showColorInputs,
  showJoinInputs,
  styleForm,
  setStyleForm,
  showDisclaimer,
}: Props) {
  const [joinedCategories, setJoinedCategories] = useState<
    Record<string, boolean>
  >({});
  // console.log(Object.keys(joinedCategories));
  const handleCategoryBackgroundColor =
    useCategoryBackgroundColor(setStyleForm);
  const handleDescriptionLettersColor =
    useDescriptionLettersColor(setStyleForm);
  const getSectionBackground = useGetSectionBackground(styleForm);
  const getDescriptionLetterColor = useGetDescriptionLetterColor(styleForm);

  return (
    <div
      className="row menu-items-container print"
      style={{
        padding: `${styleForm.pagePaddingTopAndBottom}px ${styleForm.pagePaddingLeftAndRight}px`,
        width: `${+styleForm.menuWidth}mm`,
        height: `${+styleForm.menuHeight}mm`,
        maxHeight: `${+styleForm.menuHeight}mm`,
        // animation: "menuSizeAnimation 0.5s linear forwards",
        overflow: "hidden",
        backgroundColor: styleForm.pageBackground,
      }}
    >
      {styleForm.guyTop && (
        <div style={{ width: `${styleForm.guyTopSize}px`, margin: "auto" }}>
          <img
            className="image-fluid"
            alt=""
            src={styleForm.guyTop}
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <button
            type="button"
            onClick={() => setStyleForm({ ...styleForm, guyTop: "" })}
          >
            delete
          </button>
        </div>
      )}
      {styleForm.title && (
        <div
          className="category-title"
          style={{
            fontSize: `${styleForm.titleSize}px`,
            color: styleForm.titleColor,
          }}
        >
          {styleForm.title}
        </div>
      )}
      {styleForm.topImage && (
        <div style={{ width: `${styleForm.topImageSize}px`, margin: "auto" }}>
          <img
            className="image-fluid"
            alt=""
            src={styleForm.topImage}
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <button
            type="button"
            onClick={() => setStyleForm({ ...styleForm, topImage: "" })}
          >
            delete
          </button>
        </div>
      )}
      {categoryOrder.map((category, categoryIndex) => {
        const categoryData = organizedData[category]; // Get data based on order

        if (!categoryData) return null; // Skip if no data for this category

        return (
          <div
            className={joinedCategories[category] ? "col-6" : "col-12"}
            key={categoryIndex}
            style={{ backgroundColor: getSectionBackground(categoryIndex) }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h2
                className="category-title"
                style={{
                  fontSize: `${styleForm.categoryFontSize}px`,
                  color: styleForm.categoryColor,
                  marginBottom: `${styleForm.categoryMarginBottom}px`,
                }}
              >
                {category}
              </h2>

              {showJoinInputs && (
                <input
                  className="custom-input"
                  type="checkbox"
                  onChange={() =>
                    setJoinedCategories((prev) => {
                      const newState = { ...prev };
                      if (newState[category]) {
                        delete newState[category]; // Remove the category when toggled off
                      } else {
                        newState[category] = true; // Add category when toggled on
                      }
                      return newState;
                    })
                  }
                  checked={joinedCategories[category] || false}
                />
              )}
              {showColorInputs && (
                <input
                  type="color"
                  className="no-print"
                  onChange={(event) =>
                    handleCategoryBackgroundColor(
                      event.target.value,
                      categoryIndex
                    )
                  }
                />
              )}
            </div>

            <div className="subtitle">{categoryData.subtitle}</div>
            <ul
              className="row"
              style={
                joinedCategories[category]
                  ? { display: "flex", flexDirection: "column" }
                  : {}
              }
            >
              {categoryData.items.map((item, itemIndex, arr) => (
                <li
                  id={`li-${categoryIndex}`}
                  key={itemIndex}
                  className={
                    joinedCategories[category] // If category is joined, make items col-12
                      ? "col-12 menu-item"
                      : (arr.length % 2 !== 0 && // Odd number of items
                          itemIndex === arr.length - 1 && // Last item
                          category !== "Sides" && // Not "Sides"
                          !Object.keys(joinedCategories).some(
                            (joinedCategory) => joinedCategory === category
                          )) ||
                        styleForm.menuWidth <= 110
                      ? "col-12 menu-item-odd"
                      : "col-6 menu-item"
                  }
                >
                  <div
                    className="menu-item-div"
                    style={{ marginBottom: `${styleForm.itemMarginBottom}px` }}
                  >
                    <span
                      style={{
                        fontSize: `${styleForm.itemFontSize}px`,
                        letterSpacing: "1px",
                        fontFamily: "Pewter Corroded, sans-serif",
                        color: styleForm.menuItemColor,
                      }}
                    >
                      {item.label}
                    </span>

                    <span
                      style={{
                        fontSize: `${styleForm.priceSize}px`,
                        color: styleForm.priceColor,
                      }}
                    >
                      &nbsp;{item.price.value?.toFixed(2)}
                    </span>
                  </div>

                  <div
                    className="item-description"
                    style={{
                      fontFamily: "Pewter Corroded, sans-serif",
                      fontSize: `${styleForm.descriptionFontSize}px`,
                      marginBottom: `${styleForm.descriptionMarginBottom}px`,
                      letterSpacing: "1px",
                      color: styleForm.menuItemDescriptionColor,
                    }}
                  >
                    <span
                      style={{
                        color: getDescriptionLetterColor(
                          categoryIndex,
                          itemIndex
                        ),
                      }}
                    >
                      {item.description}
                    </span>
                    {showColorInputs && (
                      <input
                        className="no-print"
                        type="color"
                        onChange={(event) =>
                          handleDescriptionLettersColor(
                            event.target.value,
                            categoryIndex,
                            itemIndex
                          )
                        }
                        style={{ marginBottom: "0", paddingBottom: "0" }}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {/* </div> */}
          </div>
        );
      })}
      {styleForm.bottomImage && (
        <div
          style={{ width: `${styleForm.bottomImageSize}px`, margin: "auto" }}
        >
          <img
            className="image-fluid"
            alt=""
            src={styleForm.bottomImage}
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <button
            type="button"
            onClick={() => setStyleForm({ ...styleForm, bottomImage: "" })}
          >
            delete
          </button>
        </div>
      )}
      {styleForm.guyBottom && (
        <div style={{ width: `${styleForm.guyBottomSize}px`, margin: "auto" }}>
          <img
            className="image-fluid"
            alt=""
            src={styleForm.guyBottom}
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <button
            type="button"
            onClick={() => setStyleForm({ ...styleForm, guyBottom: "" })}
          >
            delete
          </button>
        </div>
      )}
      {styleForm.footer && (
        <div
          className="category-title"
          style={{
            fontSize: `${styleForm.footerSize}px`,
            color: styleForm.footerTextColor,
          }}
        >
          {styleForm.footer}
        </div>
      )}
      {showDisclaimer && <Footer />}
    </div>
  );
}
