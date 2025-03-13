import { useEffect } from "react";
import { Field, StyleFormType } from "../data/types";
import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
import { useDescriptionLettersColor } from "../hooks/useDescriptionLettersColor";
import { useGetSectionBackground } from "../hooks/useGetSectionBackground";
import { useGetDescriptionLetterColor } from "../hooks/useGetDescriptionLettersColor";
import Footer from "./Footer";
import "./Sharables.css";

type Props = {
  categoryOrder: string[];
  organizedData: Record<string, { subtitle?: string; items: Field[] }>;
  showColorInputs: boolean;
  hidePrices: boolean;
  showDecorations: string;
  showDecorationCheckboxes: boolean;
  setShowDecorations: (category: string) => void;
  setShowDecorationCheckboxes: (item: boolean) => void;
  showJoinInputs: boolean;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
  joinedCategories: Record<string, boolean>;
  setJoinedCategories: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  showDisclaimer: boolean;
};

export default function CustomMenu({
  categoryOrder,
  organizedData,
  showColorInputs,
  showJoinInputs,
  hidePrices,
  showDecorations,
  setShowDecorations,
  showDecorationCheckboxes,
  styleForm,
  setStyleForm,
  joinedCategories,
  setJoinedCategories,
  showDisclaimer,
}: Props) {
  const handleCategoryBackgroundColor =
    useCategoryBackgroundColor(setStyleForm);
  const handleDescriptionLettersColor =
    useDescriptionLettersColor(setStyleForm);
  const getSectionBackground = useGetSectionBackground(styleForm);
  const getDescriptionLetterColor = useGetDescriptionLetterColor(styleForm);

  const getDynamicStyles = (className: string, categoryIndex: number) => {
    if (className === "col-6") {
      if (categoryIndex === 0 || categoryIndex % 2 === 0) {
        return {
          backgroundColor: getSectionBackground(categoryIndex),
          paddingLeft: `${styleForm.paddingCategories}px`,
        };
      } else {
        return {
          paddingRight: `${styleForm.paddingCategories}px`,
          // marginBottom: `${styleForm.categoriesMarginBottom}px`,
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
        margin: "auto",
      };
    } else if (className === "col-12") {
      return {
        backgroundColor: getSectionBackground(categoryIndex),
        // marginBottom: `${styleForm.categoriesMarginBottom}px`,
        paddingRight: `${styleForm.paddingCategories}px`,
        paddingLeft: `${styleForm.paddingCategories}px`,
      };
    }
    return {};
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .content-container::before {
      left: 0;
      width: ${styleForm.contentContainerWidth}%;
    }
    .content-container::after {
      right: 0;
      width: ${styleForm.contentContainerWidth}%;
    }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [styleForm.contentContainerWidth]);

  // In your component JSX:
  // <div className="content-container">{/* Your content here */}</div>;

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
      <div
        className="row background-image"
        style={{
          backgroundImage: `url(${styleForm.backgroundImage})`,
          width: `${+styleForm.menuWidth}mm`,
          maxHeight: `${+styleForm.menuHeight}mm`,
          margin: "auto",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {styleForm.backgroundImage && (
          <button
            type="button"
            onClick={() => setStyleForm({ ...styleForm, backgroundImage: "" })}
          >
            delete background image
          </button>
        )}

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
              marginBottom: `${styleForm.titleMarginBottom}px`,
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
            // <div key={categoryIndex}>

            <div
              className={
                joinedCategories[category]
                  ? "col-6"
                  : category === showDecorations
                  ? "col-12 content-container"
                  : "col-12"
              }
              key={category}
              style={{
                ...getDynamicStyles(
                  joinedCategories[category]
                    ? "col-6"
                    : category === showDecorations
                    ? "col-12 content-container"
                    : "col-12",
                  categoryIndex
                ),
                backgroundColor: getSectionBackground(categoryIndex),
                marginBottom: `${styleForm.categoriesMarginBottom}px`,
                // paddingRight: `${styleForm.paddingCategories}px`,
                // paddingLeft: `${styleForm.paddingCategories}px`,
              }}
            >
              <div
                className={category === showDecorations ? "share-span" : ""}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "0",
                }}
              >
                <h2
                  className="category-title"
                  style={{
                    fontSize: `${styleForm.categoryFontSize}px`,
                    color: styleForm.categoryColor,
                    marginBottom:
                      category === showDecorations
                        ? "20px"
                        : `${styleForm.categoryMarginBottom}px`,
                  }} // To do: handle this dynamically
                >
                  <span
                    className={category === showDecorations ? "gap-text" : ""}
                    style={{
                      top:
                        category === showDecorations
                          ? `${styleForm.gapTextTop}px`
                          : "",
                      lineHeight: "1",
                      display: "inline",
                      verticalAlign: "baseline",
                      // marginBottom: category === showDecorations ? "20px": ""
                    }}
                  >
                    {category}
                  </span>
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
                  <>
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
                    <button
                      type="button"
                      onClick={() =>
                        handleCategoryBackgroundColor("", categoryIndex)
                      }
                    >
                      reset
                    </button>
                  </>
                )}
                {showDecorationCheckboxes && (
                  <input
                    type="checkbox"
                    className="no-print"
                    checked={showDecorations === category}
                    onChange={() => setShowDecorations(category)}
                  />
                )}
              </div>

              <div
                className="subtitle"
                style={{
                  color: styleForm.subtitleFontColor,
                  fontSize: styleForm.subtitleFontSize,
                }}
              >
                <span
                  style={{
                    color: styleForm.subtitleFontColor,
                    fontSize: `${styleForm.subtitleFontSize}px`,
                  }}
                >
                  {categoryData.subtitle}
                </span>
              </div>
              <ul
                className="row p-0"
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
                      style={{
                        marginBottom: `${styleForm.itemMarginBottom}px`,
                      }}
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
                      {!hidePrices && (
                        <span
                          style={{
                            fontSize: `${styleForm.priceSize}px`,
                            color: styleForm.priceColor,
                          }}
                        >
                          &nbsp;{item.price.value?.toFixed(2)}
                        </span>
                      )}
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
            </div>
            // </div>
            // </div>
          );
        })}
        {showDisclaimer && <Footer />}
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
          <div
            style={{ width: `${styleForm.guyBottomSize}px`, margin: "auto" }}
          >
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
      </div>

      {showDisclaimer && <Footer />}
    </div>
  );
}
