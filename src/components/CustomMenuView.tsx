import { useEffect } from "react";
import { MenuCategory, StyleFormType } from "../data/types";
import { useDynamicStyles } from "../hooks/useDynamicStyles";
import { useGetCategoriesPaddingTop } from "../hooks/useGetCategoriesPaddingTop";
import { useGetDescriptionLetterColor } from "../hooks/useGetDescriptionLettersColor";
import { useGetCategoriesMarginTop } from "../hooks/useGetMarginCategoriesTop";
import { useGetSectionBackground } from "../hooks/useGetSectionBackground";
import { useGetSubtitleFontColor } from "../hooks/useGetSubtitleFontColor";
import Footer from "./Footer";
import Logo from "./Logo";

import "./CustomMenuView.css";

type Props = {
  hidePrices: boolean;
  showDecorations: string;
  styleForm: StyleFormType;
  joinedCategories: Record<string, boolean>;
  showDisclaimer: boolean;
  flatItemsCategories: MenuCategory[];
  setView?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomMenuView({
    setView,
  flatItemsCategories,
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
        h1ClassName="restart-tool"
      />
      <div
        className="row custom-menu-items-container print g-0"
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
                fontFamily: "Pewter Corroted', sans-serif",
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

          {flatItemsCategories &&
            flatItemsCategories.map((customCategory, categoryIndex) => (
              <div
                className={
                  joinedCategories[categoryIndex]
                    ? "col-6"
                    : customCategory.title === showDecorations
                    ? "col-12 content-container"
                    : "col-12"
                }
                key={customCategory.title}
                style={{
                  ...getDynamicStyles(
                    joinedCategories[customCategory.title]
                      ? "col-6"
                      : customCategory.title === showDecorations
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
                  className={
                    customCategory.title === showDecorations ? "share-span" : ""
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "0",
                  }}
                >
                  <h2
                    className="customCategories-title"
                    style={{
                      fontSize: `${styleForm.categoryFontSize}px`,
                      color: styleForm.categoryColor,
                      marginBottom:
                        customCategory.title === showDecorations
                          ? "20px"
                          : `${styleForm.categoryMarginBottom}px`,
                    }}
                  >
                    <span
                      className={
                        customCategory.title === showDecorations
                          ? "gap-text"
                          : ""
                      }
                      style={{
                        top:
                          customCategory.title === showDecorations
                            ? `${styleForm.gapTextTop}px`
                            : "",
                        lineHeight: "1",
                        display: "inline",
                        verticalAlign: "baseline",
                        letterSpacing: "2px",
                        fontFamily: "Pewter Corroted', sans-serif",
                        textTransform: "uppercase",
                      }}
                    >
                      {customCategory.title}
                    </span>
                  </h2>
                  &nbsp;
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
                    {/* {customCategory.subtitle} */}
                  </span>
                </div>
                <ul
                  className="row p-0 justify-content-between"
                  style={{
                    ...(joinedCategories[customCategory.title] && {
                      display: "flex",
                      flexDirection: "column",
                    }),
                  }}
                >
                  {customCategory.items.map((item, itemIndex, arr) => (
                    <li
                      id={`li-${categoryIndex}`}
                      key={itemIndex}
                      className={
                        joinedCategories[customCategory.title] // If customCategories is joined, make items col-12
                          ? "col-12 menu-item"
                          : (arr.length % 2 !== 0 && // Odd number of items
                              itemIndex === arr.length - 1 && // Last item
                              customCategory.title !== "Sides" && // Not "Sides"
                              !Object.keys(joinedCategories).some(
                                (joinedCategory) =>
                                  joinedCategory === customCategory.title
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
                            fontFamily: "Pewter Corroted', sans-serif",
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
                          fontFamily: "Pewter Corroted', sans-serif",
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
            ))}
          <div className="row" style={{ gap: "10px" }}>
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
      <div className="no-print">
        <Logo
          className="print-document no-print"
          subtitle="print"
          // setView={setView}
          title=""
          h1ClassName="restart-tool"
        />
      </div>
    </div>
  );
}
