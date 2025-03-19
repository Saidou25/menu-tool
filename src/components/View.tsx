import { useEffect } from "react";
import { Field, StyleFormType } from "../data/types";
import { useDynamicStyles } from "../hooks/useDynamicStyles";
import { useGetCategoriesPaddingTop } from "../hooks/useGetCategoriesPaddingTop";
import { useGetDescriptionLetterColor } from "../hooks/useGetDescriptionLettersColor";
import { useGetCategoriesMarginTop } from "../hooks/useGetMarginCategoriesTop";
import { useGetSectionBackground } from "../hooks/useGetSectionBackground";
import Footer from "./Footer";

import "./View.css";
import Logo from "./Logo";
import { useGetSubtitleFontColor } from "../hooks/useGetSubtitleFontColor";

type Props = {
  setView: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function View({
  setView,
  categoryOrder,
  organizedData,
  hidePrices,
  showDecorations,
  styleForm,
  joinedCategories,
  showDisclaimer,
}: Props) {
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
    <div className="d-flex">
      <Logo
        className="go-back no-print"
        subtitle="go back"
        setView={setView}
        title=""
        h1ClassName=""
      />
      <div
        className="row menu-items-container print"
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
          {styleForm.guyTop && (
            <div style={{ width: `${styleForm.guyTopSize}px`, margin: "auto" }}>
              <img
                className="image-fluid"
                alt=""
                src={styleForm.guyTop}
                style={{ maxWidth: "100%", height: "auto" }}
              />
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
            <div
              style={{ width: `${styleForm.topImageSize}px`, margin: "auto" }}
            >
              <img
                className="image-fluid"
                alt=""
                src={styleForm.topImage}
                style={{ maxWidth: "100%", height: "auto" }}
              />
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
                        fontWeight: "800",
                      }}
                    >
                      {category}
                    </span>
                  </h2>
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
                            letterSpacing: "1px",
                          }}
                        >
                          {item.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {styleForm.bottomImage && (
            <div
              style={{
                width: `${styleForm.bottomImageSize}px`,
                margin: "auto",
              }}
            >
              <img
                className="image-fluid"
                alt=""
                src={styleForm.bottomImage}
                style={{ maxWidth: "100%", height: "auto" }}
              />
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
          {showDisclaimer && (
            <Footer
              marginTop={styleForm.footerPaddingPaddingTop}
              color={styleForm.footerTextColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}
