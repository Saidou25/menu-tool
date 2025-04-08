import { MenuCategory, MenuCustomCategory, StyleFormType } from "../data/types";
import { useEffect } from "react";
// import { useCategoryPaddingTop } from "../hooks/useCategoryPaddingTop";
import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
import { useDescriptionLettersColor } from "../hooks/useDescriptionLettersColor";
// import { useCategoryMarginTop } from "../hooks/useMarginCategoriesTop";
import { useSubtitleFontColor } from "../hooks/useSubtitleFontColor";
import { useGetSectionBackground } from "../hooks/useGetSectionBackground";
import { useGetCategoriesMarginTop } from "../hooks/useGetMarginCategoriesTop";
import { useGetDescriptionLetterColor } from "../hooks/useGetDescriptionLettersColor";
import { useGetCategoriesPaddingTop } from "../hooks/useGetCategoriesPaddingTop";
import { useDynamicStyles } from "../hooks/useDynamicStyles";
import { useGetSubtitleFontColor } from "../hooks/useGetSubtitleFontColor";
import Footer from "./Footer";
import Input from "./Input";
import InputBar from "./InputBar";

import "./CustomCategoriesMenu.css";

type Props = {
  flatItemsCategories: MenuCategory[];
  setFlatItemsCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  newCustomArray: MenuCustomCategory[];
  showImagesDeleteButtons: boolean;
  showColorInputs: boolean;
  hidePrices: boolean;
  showDecorations: string;
  setShowDecorations: (category: string) => void;
  showDecorationCheckboxes: boolean;
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
  // setView: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomCategoriesMenu({
  flatItemsCategories,
  setFlatItemsCategories,
  newCustomArray,
  showImagesDeleteButtons,
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
  // const handleCategoryPaddingTop = useCategoryPaddingTop(setStyleForm);
  const handleCategoryBackgroundColor =
    useCategoryBackgroundColor(setStyleForm);
  const handleDescriptionLettersColor =
    useDescriptionLettersColor(setStyleForm);
  // const handleCategoryMarginTop = useCategoryMarginTop(setStyleForm);
  const handleSubtitleFontColor = useSubtitleFontColor(setStyleForm);
  const getSectionBackground = useGetSectionBackground(styleForm);
  const getDescriptionLetterColor = useGetDescriptionLetterColor(styleForm);
  const getCategoryPaddingTop = useGetCategoriesPaddingTop(styleForm);
  const getCategoryMarginTop = useGetCategoriesMarginTop(styleForm);
  const getDynamicStyles = useDynamicStyles(styleForm);
  const getSubtitleFontColor = useGetSubtitleFontColor(styleForm);

  useEffect(() => {
    if (newCustomArray) {
      // Initialize an empty array to hold the updated categories with items
      const updatedCategories: MenuCategory[] = [];

      // Loop through each customCategories in the newCustomArray
      for (let customCategories of newCustomArray) {
        // Initialize the MenuCategory with the title, subtitle, and empty items array
        const menuCategory: MenuCategory = {
          title: customCategories.title,
          subtitle: customCategories.subtitle, // Optional field
          items: [],
        };

        // Loop through each subCategory to get the items
        if (customCategories?.subCategories?.length) {
          for (let subCategoryItems of customCategories.subCategories) {
            // console.log("subCategoryItems", subCategoryItems);

            // Ensure there are items and append them to the current customCategories's items
            if (subCategoryItems?.items?.length) {
              menuCategory.items.push(...subCategoryItems.items);
            }
          }
        }

        // Add the populated menuCategory to the updatedCategories array
        updatedCategories.push(menuCategory);
      }

      // Updates the state with the fully populated categories
      setFlatItemsCategories(updatedCategories);
    }
  }, [newCustomArray]); // The effect runs when newCustomArray changes

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

  // console.log(joinedCategories);
  // console.log(showDecorations);
  return (
    <div
      className="row custom-menu-items-container print"
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
{/* <div className="row" style={{ 
  
}}> */}
        {flatItemsCategories &&
          flatItemsCategories.map((customCategory, categoryIndex) => (
            <div
              className={
                joinedCategories[customCategory.title]
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
                      customCategory.title === showDecorations ? "gap-text" : ""
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
                      fontFamily: "Pewter Corroded, sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    {customCategory.title}
                    {/* {customCategory.items.length ? customCategory.title : null} */}
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
                    // color: styleForm.subtitleFontColor.... to Do
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
                      &nbsp;&nbsp;
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
          ))}
</div>
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
    // </div>
  );
}
