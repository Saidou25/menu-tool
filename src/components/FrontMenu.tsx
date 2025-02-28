import { Field, StyleFormType } from "../data/types";
import Footer from "./Footer";
// import './fonts.css';

type FrontMenuProps = {
  // animation: string;
  showColorInputs: boolean;
  styleForm: StyleFormType;
  showDisclaimer: boolean;
  categoryOrder: string[];
  organizedData: Record<string, { subtitle?: string; items: Field[] }>;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
};

export default function FrontMenu({
  // animation,
  showColorInputs,
  styleForm,
  showDisclaimer,
  categoryOrder,
  organizedData,
  setStyleForm,
}: FrontMenuProps) {
  const handleCatetegoryBackgroundChange = (
    color: string,
    categoryIndex: number
  ) => {
    setStyleForm((prevState) => {
      const newSectionBackground = [...prevState.sectionBackground];
      const existingIndex = newSectionBackground.findIndex(
        (bg) => bg.categoryIndex === categoryIndex
      );

      if (existingIndex !== -1) {
        // Update the existing entry
        newSectionBackground[existingIndex] = {
          categoryIndex,
          backgroundColor: color,
        };
      } else {
        // Add a new entry
        newSectionBackground.push({
          categoryIndex,
          backgroundColor: color,
        });
      }

      return {
        ...prevState,
        sectionBackground: newSectionBackground,
      };
    });
  };

  const handleletterSectionChange = (
    color: string,
    categoryIndex: number,
    index: number
  ) => {
    setStyleForm((prevState) => {
      const newdescriptionLetterColor = [...prevState.descriptionLetterColor];

      // Find the existing entry
      const existingIndex = newdescriptionLetterColor.findIndex(
        (entry) =>
          entry.categoryIndex === categoryIndex && entry.index === index
      );

      if (existingIndex !== -1) {
        // Update existing entry
        newdescriptionLetterColor[existingIndex] = {
          categoryIndex,
          index,
          descriptionLetterColor: color,
        };
      } else {
        // Add new entry
        newdescriptionLetterColor.push({
          categoryIndex,
          index,
          descriptionLetterColor: color,
        });
      }

      return {
        ...prevState,
        descriptionLetterColor: newdescriptionLetterColor,
      };
    });
  };

  const getSectionBackground = (index: number) => {
    // Check if sectionBackground is defined and is an array
    if (!Array.isArray(styleForm.sectionBackground)) {
      return ""; // Return an empty string if it's not an array
    }

    if (styleForm.sectionBackground.length === 0) {
      return ""; // Return an empty string if the array is empty
    }

    const section = styleForm.sectionBackground.find(
      (bg) => bg.categoryIndex === index
    );

    return section ? section.backgroundColor : ""; // Return the color or an empty string if not found
  };
  const getDescriptionLetterColor = (categoryIndex: number, index: number) => {
    if (!Array.isArray(styleForm.descriptionLetterColor)) {
      return "";
    }

    const descriptionSection = styleForm.descriptionLetterColor.find(
      (entry) => entry.categoryIndex === categoryIndex && entry.index === index
    );

    return descriptionSection ? descriptionSection.descriptionLetterColor : "";
  };

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
                            handleCatetegoryBackgroundChange(
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
                                  handleletterSectionChange(
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
                      handleCatetegoryBackgroundChange(
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
                            handleletterSectionChange(
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
