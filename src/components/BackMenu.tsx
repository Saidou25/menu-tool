import { Field, StyleFormType } from "../data/types";

import Footer from "./Footer";

type BackMenuProps = {
  styleForm: StyleFormType;
  showDisclaimer: boolean;
  categoryOrder: string[];
  secondPageData: Record<string, { subtitle?: string; items: Field[] }>;
};

const BackMenu = ({
  styleForm,
  showDisclaimer,
  categoryOrder,
  secondPageData,
}: BackMenuProps) => {
  return (
    <>
      <br className="no-print" />
      <h3 className="no-print">Menu back</h3>
      <br className="no-print" />
      <div className="menu-items-container print"
      style={{
        padding: `${styleForm.pagePaddingTopAndBottom}px ${styleForm.pagePaddingLeftAndRight}px`,
        width: `${+styleForm.menuWidth}mm`,
        height: `${+styleForm.menuHeight}mm`,
        maxHeight: `${+styleForm.menuHeight}mm`,
      }}>
        {categoryOrder?.map((category) => {
          const categoryData = secondPageData[category];
          if (categoryData && categoryData.items.length > 0) {
            return (
              <div key={category}>
                <h3
                  className="category-title"
                  style={{
                    fontSize: `${styleForm.categoryFontSize}px`,
                    marginBottom: `${styleForm.categoryMarginBottom}px`,
                  }}
                >
                  {category}
                </h3>
                <div className="subtitle">{categoryData.subtitle}</div>
                <ul className="row category-list">
                  {categoryData?.items.map((item, index, arr) => (
                    <li
                      key={index}
                      className={
                        arr?.length % 2 !== 0 &&
                        index === arr?.length - 1 &&
                        category !== "Sides"
                          ? "col-12 menu-item-odd"
                          : "col-6 menu-item"
                      }
                    >
                      <strong className="strong">
                        <div
                          className=""
                          style={{
                            fontSize: `${styleForm.itemFontSize}px`,
                            marginBottom: `${styleForm.itemMarginBottom}px`,
                          }}
                        >
                          {item.label}
                          {item.price.placeholder === "Market price" ? (
                            <span className="small"> Market Price</span>
                          ) : (
                            <span>
                              {` ${item.price.value?.toFixed(2) || ""}`}
                            </span>
                          )}
                        </div>

                        {/* {item.subSubtitle && ( */}
                        <span className="small">{item.subSubtitle}</span>
                        {/* )} */}

                        {item.subSubtitle1 && (
                          <span className="small">
                            {item.subSubtitle1}&nbsp;
                            {`${item.price.value1?.toFixed(2)}`}
                          </span>
                        )}
                        {item.subSubtitle2 && (
                          <span className="small">
                            &nbsp; {item.subSubtitle2}&nbsp; 
                            {item.price.value2?.toFixed(2)}
                          </span>
                        )}
                      </strong>
                      <div
                        style={{
                          fontSize: `${styleForm.descriptionFontSize}px`,
                          marginBottom: `${styleForm.descriptionMarginBottom}px`,
                        }}
                      >
                        {item.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          return null; // Don't render empty categories
        })}
        {showDisclaimer && <Footer />}
      </div>
    </>
  );
};

export default BackMenu;
