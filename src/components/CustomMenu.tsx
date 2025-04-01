import { useEffect } from "react";
import { Field, StyleFormType } from "../data/types";
import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
import { useDescriptionLettersColor } from "../hooks/useDescriptionLettersColor";
import { useGetSectionBackground } from "../hooks/useGetSectionBackground";
import { useGetDescriptionLetterColor } from "../hooks/useGetDescriptionLettersColor";
import { useCategoryPaddingTop } from "../hooks/useCategoryPaddingTop";
import { useGetCategoriesPaddingTop } from "../hooks/useGetCategoriesPaddingTop";
import { useCategoryMarginTop } from "../hooks/useMarginCategoriesTop";
import { useGetCategoriesMarginTop } from "../hooks/useGetMarginCategoriesTop";
import { useDynamicStyles } from "../hooks/useDynamicStyles";
import { useSubtitleFontColor } from "../hooks/useSubtitleFontColor";
import { useGetSubtitleFontColor } from "../hooks/useGetSubtitleFontColor";
import Footer from "./Footer";

import "./CustomMenu.css";

type Props = {
  showImagesDeleteButtons: boolean;
  categoryOrder: string[];
  organizedData: Record<string, { subtitle?: string; items: Field[] }>;
  showColorInputs: boolean;
  hidePrices: boolean;
  showDecorations: string;
  showDecorationCheckboxes: boolean;
  setShowDecorations: (category: string) => void;
  setShowDecorationCheckboxes: (item: boolean) => void;
  showJoinInputs: boolean;
  showPaddingCategoriesTop: boolean;
  showMarginCategoriesTop: boolean;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
  joinedCategories: Record<string, boolean>;
  setJoinedCategories: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  showDisclaimer: boolean;
};
export default function CustomMenu({
  showImagesDeleteButtons,
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
  showPaddingCategoriesTop,
  showMarginCategoriesTop,
}: Props) {
  const handleCategoryPaddingTop = useCategoryPaddingTop(setStyleForm);
  const handleCategoryBackgroundColor =
    useCategoryBackgroundColor(setStyleForm);
  const handleDescriptionLettersColor =
    useDescriptionLettersColor(setStyleForm);
  const handleCategoryMarginTop = useCategoryMarginTop(setStyleForm);
  const handleSubtitleFontColor = useSubtitleFontColor(setStyleForm);
  const getSectionBackground = useGetSectionBackground(styleForm);
  const getDescriptionLetterColor = useGetDescriptionLetterColor(styleForm);
  const getCategoryPaddingTop = useGetCategoriesPaddingTop(styleForm);
  const getCategoryMarginTop = useGetCategoriesMarginTop(styleForm);
  const getDynamicStyles = useDynamicStyles(styleForm);
  const getSubtitleFontColor = useGetSubtitleFontColor(styleForm);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .content-container::before {
      left: 0;
      width: ${styleForm.contentContainerWidth}%;
      background-color: black;
      height: 2px;
      }
      .content-container::after {
        right: 0;
        width: ${styleForm.contentContainerWidth}%;
        background-color: black;
        height: 2px;
    }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [styleForm.contentContainerWidth]);

  return (
    <div
      className="row menu-items-container"
      style={{
        padding: `${styleForm.pagePaddingTopAndBottom}px ${styleForm.pagePaddingLeftAndRight}px 0 ${styleForm.pagePaddingLeftAndRight}px`,
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
        {showImagesDeleteButtons && styleForm.backgroundImage && (
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
            {showImagesDeleteButtons && (
              <button
                type="button"
                onClick={() => setStyleForm({ ...styleForm, guyTop: "" })}
              >
                delete
              </button>
            )}
          </div>
        )}
        {styleForm.title && (
          <div
            className="title"
            style={{
              fontSize: `${styleForm.titleSize}px`,
              backgroundColor: styleForm.titleBackgroundColor,
              color: styleForm.titleColor,
              paddingTop: `${styleForm.titlePaddingTop}px`,
              paddingBottom: `${styleForm.titlePaddingBottom}px`,
              marginBottom: `${styleForm.titleMarginBottom}px`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Pewter Corroded, sans-serif",
            }}
          >
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {styleForm.title}
            </span>
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
            {showImagesDeleteButtons && (
              <button
                type="button"
                onClick={() => setStyleForm({ ...styleForm, topImage: "" })}
              >
                delete
              </button>
            )}
          </div>
        )}

        {categoryOrder.map((category, categoryIndex) => {
          const categoryData = organizedData[category]; // Get data based on order

          if (!categoryData) return null; // Skip if no data for this category

          return (
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
                paddingTop: getCategoryPaddingTop(categoryIndex),
                marginTop: getCategoryMarginTop(categoryIndex),
                // paddingRight: `${styleForm.paddingCategoriesLeftRight}px`,
                // paddingLeft: `${styleForm.paddingCategoriesLeftRight}px`,
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
                      letterSpacing: "2px",
                    }}
                  >
                    {category}
                  </span>
                </h2>
                {showPaddingCategoriesTop && (
                  <input
                    type="number"
                    className="no-print"
                    onChange={(event) =>
                      handleCategoryPaddingTop(
                        +event.target.value,
                        categoryIndex
                      )
                    }
                  />
                )}
                &nbsp;
                {showMarginCategoriesTop && (
                  <input
                    type="number"
                    className="no-print"
                    onChange={(event) =>
                      handleCategoryMarginTop(
                        +event.target.value,
                        categoryIndex
                      )
                    }
                  />
                )}
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
                  color: getSubtitleFontColor(categoryIndex),
                  marginBottom: `${styleForm.subtitlePaddingBottom}px`,
                }}
              >
                <span
                  style={{
                    fontSize: `${styleForm.subtitleFontSize}px`,
                    letterSpacing: "1px",
                  }}
                >
                  {categoryData.subtitle}
                </span>
                {showColorInputs && (
                  <>
                    <input
                      type="color"
                      className="no-print"
                      onChange={(event) =>
                        handleSubtitleFontColor(
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
              </div>
              <ul
                className="row p-0 justify-content-between"
                style={{
                  ...(joinedCategories[category] && {
                    display: "flex",
                    flexDirection: "column",
                  }),
                }}
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
                        : "col-6 menu-item pe-4"
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
                        <>
                          {item.price.placeholder === "Market price" ? (
                            <span
                              className="small"
                              style={{
                                fontFamily: "Pewter Corroded, sans-serif",
                                letterSpacing: "1px",
                                fontSize: `${styleForm.priceSize}px`,
                                color: styleForm.priceColor,
                              }}
                            >
                              &nbsp; Market Price
                            </span>
                          ) : (
                            <span
                              style={{
                                fontSize: `${styleForm.priceSize}px`,
                                color: styleForm.priceColor,
                              }}
                            >
                              &nbsp;{item.price.value?.toFixed(2)}
                            </span>
                          )}
                          {item.subSubtitle && (
                            <span className="small">{item.subSubtitle}</span>
                          )}
                          <div>
                            {item.subSubtitle1 && (
                              <span
                                className="small"
                                style={{
                                  fontFamily: "Pewter Corroded, sans-serif",
                                  letterSpacing: "1px",
                                  fontSize: `${styleForm.priceSize}px`,
                                  color: styleForm.priceColor,
                                }}
                              >
                                {item.subSubtitle1}&nbsp;
                                {`${item.price.value1?.toFixed(2)}`}
                              </span>
                            )}
                            {item.subSubtitle2 && (
                              <span
                                className="small"
                                style={{
                                  fontFamily: "Pewter Corroded, sans-serif",
                                  letterSpacing: "1px",
                                  fontSize: `${styleForm.priceSize}px`,
                                  color: styleForm.priceColor,
                                }}
                              >
                                &nbsp; {item.subSubtitle2}&nbsp;
                                {item.price.value2?.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    <div
                      className="item-description"
                      style={{
                        fontFamily: "Pewter Corroded, sans-serif",
                        fontSize: `${styleForm.descriptionFontSize}px`,
                        marginBottom:
                          category !== "Sides" && category !== "Sauces" // Avoids space bellow text since there is no item description
                            ? `${styleForm.descriptionMarginBottom}px`
                            : "",
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
                          letterSpacing: "1px",
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
          );
        })}

        <div className="row" style={{ gap: "10px" }}>
          {" "}
          {/* Gap could be dynamic */}
          {styleForm.bottomImage && (
            <div
              className="col-5"
              // style={{ width: `${styleForm.bottomImageSize}px`, margin: "auto" }}
              style={{
                // width: `${styleForm.guyBottomSize}px`,
                margin: "auto",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <img
                className="image-fluid"
                alt=""
                src={styleForm.bottomImage}
                style={{
                  width: `${styleForm.bottomImageSize}px`,
                  height: "auto",
                }}
              />
              {showImagesDeleteButtons && (
                <button
                  type="button"
                  onClick={() =>
                    setStyleForm({ ...styleForm, bottomImage: "" })
                  }
                >
                  delete
                </button>
              )}
            </div>
          )}
          {styleForm.guyBottom && (
            <div
              className="col-5"
              style={{
                // width: `${styleForm.guyBottomSize}px`,
                margin: "auto",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <img
                className="image-fluid"
                alt=""
                src={styleForm.guyBottom}
                style={{
                  width: `${styleForm.guyBottomSize}px`,
                  height: "auto",
                }}
                // width: `${styleForm.guyBottomSize}px`,
              />
              {showImagesDeleteButtons && (
                <button
                  type="button"
                  onClick={() => setStyleForm({ ...styleForm, guyBottom: "" })}
                >
                  delete
                </button>
              )}
            </div>
          )}
        </div>
        {styleForm.footer && (
          <div
            className="category-title"
            style={{
              fontSize: `${styleForm.footerSize}px`,
              color: styleForm.textBottomColor,
              letterSpacing: "1px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {styleForm.footer}
          </div>
        )}
        {showDisclaimer && (
          <Footer
            paddingBottom={styleForm.footerPaddingBottom}
            marginTop={styleForm.footerPaddingPaddingTop}
            color={styleForm.footerTextColor}
          />
        )}
      </div>
    </div>
  );
}
