import { Field, StyleFormType } from "../data/types";
import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
import { useDescriptionLettersColor } from "../hooks/useDescriptionLettersColor";
import { useGetDescriptionLetterColor } from "../hooks/useGetDescriptionLettersColor";
import { useGetSectionBackground } from "../hooks/useGetSectionBackground";
import Footer from "./Footer";
// import './fonts.css';

type FrontMenuProps = {
  // animation: string;
  showColorInputs: boolean;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
  showDisclaimer: boolean;
  categoryOrder: string[];
  organizedData: Record<string, { subtitle?: string; items: Field[] }>;
};

export default function FrontMenu({
  // animation,
  showColorInputs,
  styleForm,
  setStyleForm,
  showDisclaimer,
  categoryOrder,
  organizedData,
}: FrontMenuProps) {
  
  const handleCategoryBackgroundColor = useCategoryBackgroundColor(setStyleForm)
  const handleDescriptionLettersColor = useDescriptionLettersColor(setStyleForm);
  const getSectionBackground = useGetSectionBackground(styleForm);
  const getDescriptionLetterColor = useGetDescriptionLetterColor(styleForm);
 

  return (
    <div
      className="menu-items-container print"
      style={{
        padding: `${styleForm.pagePaddingTopAndBottom}px ${styleForm.pagePaddingLeftAndRight}px`,
        width: `${+styleForm.menuWidth}mm`,
        height: `${+styleForm.menuHeight}mm`,
        minHeight: `${+styleForm.menuHeight}mm`,
        animation: "menuSizeAnimation 0.5s linear forwards",
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
        </div>
      )}
      {categoryOrder.map((category, categoryIndex) => {
        const categoryData = organizedData[category];
        if (
          category === "Salads" &&
          (organizedData["Salads"]?.items.length > 0 ||
            organizedData["Soups"]?.items.length > 0)
        ) {
          return (
            <div className="split-container" key="Salads-Soups">
              {["Salads", "Soups"].map((cat) => {
                const realCategoryIndex = categoryOrder.indexOf(cat); // Get the actual index

                return organizedData[cat]?.items.length > 0 ? (
                  <div
                    key={cat}
                    className="split-div"
                    style={{
                      backgroundColor: getSectionBackground(realCategoryIndex),
                    }}
                  >
                    <h3
                      className="category-title"
                      style={{
                        fontSize: `${styleForm.categoryFontSize}px`,
                        color: styleForm.categoryColor,
                        marginBottom: `${styleForm.categoryMarginBottom}px`,
                      }}
                    >
                      {cat}{" "}
                      {showColorInputs && (
                        <input
                          className="no-print"
                          type="color"
                          onChange={(event) =>
                            handleCategoryBackgroundColor(
                              event.target.value,
                              realCategoryIndex
                            )
                          }
                        />
                      )}
                    </h3>
                    <ul className="split-list">
                      {organizedData[cat].items.map((item, idx) => (
                        <li key={idx} className="menu-item-joined">
                          <span className="soup-salad-label">{item.label}</span>
                          &nbsp;{item.price.value?.toFixed(2)}
                          {/* </div> */}
                          <div
                            style={{
                              color: getDescriptionLetterColor(
                                realCategoryIndex,
                                idx
                              ),
                            }}
                          >
                            <span className="soup-salad-description">
                              {item.description}
                            </span>
                            {item.description && showColorInputs && (
                              <input
                                type="color"
                                className="no-print"
                                onChange={(event) =>
                                  handleDescriptionLettersColor(
                                    event.target.value,
                                    realCategoryIndex,
                                    idx
                                  )
                                }
                              />
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null;
              })}
            </div>
          );
        }

        if (category === "Soups") return null;

        if (categoryData && categoryData.items.length > 0) {
          return (
            <div
              key={category}
              style={{ backgroundColor: getSectionBackground(categoryIndex) }}
            >
              <h3
                className="category-title"
                style={{
                  fontSize: `${styleForm.categoryFontSize}px`,
                  color: styleForm.categoryColor,
                  marginBottom: `${styleForm.categoryMarginBottom}px`,
                }}
              >
                {category}
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
                    style={{ marginBottom: "0", paddingBottom: "0" }}
                  />
                )}
              </h3>
              <div className="subtitle">{categoryData.subtitle}</div>
              <ul className="row category-list print">
                {categoryData.items.map((item, itemIndex, arr) => (
                  <li
                    id={`li-${categoryIndex}`}
                    key={itemIndex}
                    className={
                      (arr?.length % 2 !== 0 &&
                        categoryIndex === arr?.length - 1 &&
                        category !== "Sides") ||
                      styleForm.menuWidth <= 110 // Slim width format
                        ? "col-12 menu-item-odd"
                        : "col-6 menu-item"
                    }
                  >
                    <div className="menu-item-div">
                      {/* <div className="div-div"> */}
                      <span
                        style={{
                          fontSize: `${styleForm.itemFontSize}px`,
                          paddingBottom: `${styleForm.itemMarginBottom}px`,
                          letterSpacing: "1px",
                          fontFamily: "Pewter Corroded, sans-serif",
                          color: styleForm.menuItemColor,
                          // marginBottom: "-20px",
                          // verticalAlign: "bottom"
                        }}
                      >
                        {item.label}
                      </span>
                      {/* </div> */}

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
            </div>
          );
        }
        return null;
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
