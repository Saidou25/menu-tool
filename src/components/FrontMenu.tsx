import { useEffect, useState } from "react";
import { Field, StyleFormType } from "../data/types";
import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
import { useDescriptionLettersColor } from "../hooks/useDescriptionLettersColor";
import { useGetDescriptionLetterColor } from "../hooks/useGetDescriptionLettersColor";
import { useGetSectionBackground } from "../hooks/useGetSectionBackground";
import { useGetSubtitleFontColor } from "../hooks/useGetSubtitleFontColor";
import { useSubtitleFontColor } from "../hooks/useSubtitleFontColor";
import { useGetCategoriesPaddingTop } from "../hooks/useGetCategoriesPaddingTop";
import { useGetCategoriesMarginTop } from "../hooks/useGetMarginCategoriesTop";
import { useGetCategoryImage } from "../hooks/useGetCategoryImage";
import { useDynamicStyles } from "../hooks/useDynamicStyles";
import Footer from "./Footer";
import Input from "./Input";
import InputBar from "./InputBar";
import Button from "./Button";

import "../assets/fonts/pewter-corroted/pewter-corroted.css";
import "./CustomCategoriesMenu.css";

type FrontMenuProps = {
  // animation: string;
  isDesserts: boolean;
  showImagesDeleteButtons: boolean;
  showColorInputs: boolean;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
  showDisclaimer: boolean;
  organizedData: Record<string, { subtitle?: string; items: Field[] }>;
  joinedCategories: Record<string, boolean>;
  showDecorations: string;
  setShowDecorations: (category: string) => void;
  showJoinInputs: boolean;
  showPaddingCategoriesTop: boolean;
  showMarginCategoriesTop: boolean;
  showDecorationCheckboxes: boolean;
  setJoinedCategories: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  hidePrices: boolean;
  showCategoryImage: boolean;
  setShowCategoryImage: (item: boolean) => void;
};

export default function FrontMenu({
  // animation,
  isDesserts,
  showDecorations,
  joinedCategories,
  showColorInputs,
  styleForm,
  setStyleForm,
  showDisclaimer,
  organizedData,
  showJoinInputs,
  showPaddingCategoriesTop,
  showMarginCategoriesTop,
  showDecorationCheckboxes,
  setJoinedCategories,
  setShowDecorations,
  hidePrices,
  showImagesDeleteButtons,
  showCategoryImage,
  setShowCategoryImage,
}: FrontMenuProps) {
  const [datas, setDatas] = useState<
    { category: string; subtitle?: string; items: Field[] }[]
  >(
    Object.entries(organizedData).map(([key, value]) => ({
      category: key,
      subtitle: value.subtitle ?? "",
      items: value.items,
    }))
  ); // Converts organizedData into an array

  const handleCategoryBackgroundColor =
    useCategoryBackgroundColor(setStyleForm);
  const handleDescriptionLettersColor =
    useDescriptionLettersColor(setStyleForm);
  const handleSubtitleFontColor = useSubtitleFontColor(setStyleForm);
  const getSectionBackground = useGetSectionBackground(styleForm);
  const getDescriptionLetterColor = useGetDescriptionLetterColor(styleForm);
  const getCategoryPaddingTop = useGetCategoriesPaddingTop(styleForm);
  const getCategoryMarginTop = useGetCategoriesMarginTop(styleForm);
  const getDynamicStyles = useDynamicStyles(styleForm);
  const getSubtitleFontColor = useGetSubtitleFontColor(styleForm);
  const getCategoryImage = useGetCategoryImage(styleForm);

  useEffect(() => {
    setDatas(
      Object.entries(organizedData).map(([key, value]) => ({
        category: key,
        subtitle: value.subtitle ?? "",
        items: value.items,
      }))
    );
  }, [organizedData]); // Ensures state updates if organizedData changes

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
      className="row custom-menu-items-container print"
      style={{
        paddingTop: `${styleForm.pagePaddingTopAndBottom}px`,
        paddingRight: `${styleForm.pagePaddingLeftAndRight}px`,
        // paddingBottom: `${styleForm.pagePaddingTopAndBottom}px`,
        paddingLeft: `${styleForm.pagePaddingLeftAndRight}px`,
        width: `${+styleForm.menuWidth}mm`,
        height: `${+styleForm.menuHeight}mm`,
        maxHeight: `${+styleForm.menuHeight}mm`,
        // animation: "menuSizeAnimation 0.5s linear forwards",
        overflow: "hidden",
        backgroundColor: styleForm.pageBackground,
        fontFamily: "Pewter Corroted, sans-serif",
        fontWeight: "normal",
      }}
    >
      <div
        className="row"
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
          <Button
            type="button"
            onClick={() => setStyleForm({ ...styleForm, backgroundImage: "" })}
          >
            delete background image
          </Button>
        )}
        {styleForm.guyTop && (
          <div
            style={{
              backgroundColor: styleForm.guyBackgroundColor,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              className="image-fluid"
              alt=""
              src={styleForm.guyTop}
              style={{
                maxWidth: "100%",
                width: `${styleForm.guyTopSize}px`,
                height: "auto",
              }}
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
        )}{" "}
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
        {datas &&
          datas.map((customCategory, categoryIndex) => {
            const { url, index } = getCategoryImage(categoryIndex) || {};
            return (
              <div
                className={
                  joinedCategories[customCategory.category]
                    ? "col-6"
                    : customCategory.category === showDecorations
                    ? "col-12 content-container"
                    : "col-12"
                }
                key={customCategory.category}
                style={{
                  ...getDynamicStyles(
                    joinedCategories[customCategory.category]
                      ? "col-6"
                      : customCategory.category === showDecorations
                      ? "col-12 content-container"
                      : url && index === categoryIndex
                      ? "col-12 background-image"
                      : "col-12",
                    categoryIndex
                  ),
                  backgroundColor: getSectionBackground(categoryIndex),
                  marginBottom: `${styleForm.categoriesMarginBottom}px`,
                  paddingTop: getCategoryPaddingTop(categoryIndex),
                  marginTop: getCategoryMarginTop(categoryIndex),
                }}
              >
                <div
                  className={
                    customCategory.category === showDecorations
                      ? "share-span"
                      : ""
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
                        customCategory.category === showDecorations
                          ? "20px"
                          : `${styleForm.categoryMarginBottom}px`,
                      textAlign: "center",
                    }}
                  >
                    <span
                      className={
                        customCategory.category === showDecorations
                          ? "gap-text"
                          : ""
                      }
                      style={{
                        top:
                          customCategory.category === showDecorations
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
                      {customCategory.category}
                    </span>
                  </h2>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <InputBar
                      showPaddingCategoriesTop={showPaddingCategoriesTop}
                      showMarginCategoriesTop={showMarginCategoriesTop}
                      showJoinInputs={showJoinInputs}
                      showColorInputs={showColorInputs}
                      showDecorationCheckboxes={showDecorationCheckboxes}
                      className="input-bar"
                      setJoinedCategories={setJoinedCategories}
                      joinedCategories={joinedCategories}
                      customCategory={customCategory}
                      categoryIndex={categoryIndex}
                      styleForm={styleForm}
                      setStyleForm={setStyleForm}
                      showDecorations={showDecorations}
                      setShowDecorations={setShowDecorations}
                      showCategoryImage={showCategoryImage}
                      setShowCategoryImage={setShowCategoryImage}
                      url={url}
                    />
                  </div>
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
                    {customCategory.subtitle}
                  </span>
                  {showColorInputs && customCategory.subtitle && (
                    <>
                      &nbsp;
                      <Input
                        type="color"
                        className="menu-color-inputs"
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
                    ...(joinedCategories[customCategory.category] && {
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
                        joinedCategories[customCategory.category] // If customCategories is joined, make items col-12
                          ? "col-12 menu-item"
                          : (arr.length % 2 !== 0 && // Odd number of items
                              itemIndex === arr.length - 1 && // Last item
                              customCategory.category !== "Sides" && // Not "Sides"
                              !Object.keys(joinedCategories).some(
                                (joinedCategory) =>
                                  joinedCategory === customCategory.category
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
                        {!hidePrices &&
                          item.price.placeholder !== "Market price" &&
                          !isDesserts && (
                            <span
                              style={{
                                fontSize: `${styleForm.priceSize}px`,
                                color: styleForm.priceColor,
                              }}
                            >
                              &nbsp;{item.price.value?.toFixed(2)}
                            </span>
                          )}
                        {!hidePrices &&
                          item.price.placeholder === "Market price" && (
                            <span
                              style={{
                                fontSize: `${styleForm.priceSize}px`,
                                color: styleForm.priceColor,
                                letterSpacing: "1px",
                              }}
                            >
                              &nbsp;{item.price.placeholder}
                            </span>
                          )}
                        {!hidePrices &&
                          item.label === "American royal ribs" && (
                            <div
                              className=""
                              style={{
                                fontSize: `${styleForm.subtitleFontSize}px`,
                                color: getSubtitleFontColor(categoryIndex),
                                // marginBottom: `${styleForm.subtitlePaddingBottom}px`,
                              }}
                            >
                              <span className="">
                                {item.subSubtitle1} &nbsp;
                                {item.price.value1}
                              </span>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <span className="">
                                {item.subSubtitle2} &nbsp;
                                {item.price.value2}
                              </span>
                              {showColorInputs && (
                                <>
                                  &nbsp;
                                  <Input
                                    type="color"
                                    className="menu-color-inputs"
                                    onChange={(event) =>
                                      handleSubtitleFontColor(
                                        event.target.value,
                                        categoryIndex
                                      )
                                    }
                                  />
                                </>
                              )}
                            </div>
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
                        &nbsp;&nbsp;
                        {isDesserts && (
                          <>
                            <div
                              style={{
                                fontSize: `${styleForm.priceSize}px`,
                                color: styleForm.priceColor,
                                marginTop: "5px",
                              }}
                            >
                              &nbsp;{item.price.value?.toFixed(2)}
                            </div>
                          </>
                        )}
                        {showColorInputs && (
                          <Input
                            className="menu-color-inputs"
                            type="color"
                            onChange={(event) =>
                              handleDescriptionLettersColor(
                                event.target.value,
                                categoryIndex,
                                itemIndex
                              )
                            }
                            // style={{ marginBottom: "0", paddingBottom: "0" }}
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
            marginTop={styleForm.footerPaddingPaddingTop}
            paddingBottom={styleForm.footerPaddingBottom}
            color={styleForm.footerTextColor}
          />
        )}
      </div>
    </div>
  );
}
