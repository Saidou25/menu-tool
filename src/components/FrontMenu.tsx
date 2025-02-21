import { Field, StyleFormType } from "../data/types";
import Footer from "./Footer";

type FrontMenuProps = {
  styleForm: StyleFormType;
  showDisclaimer: boolean;
  categoryOrder: string[];
  organizedData: Record<string, { subtitle?: string; items: Field[] }>;
};

export default function FrontMenu({
  styleForm,
  showDisclaimer,
  categoryOrder,
  organizedData,
}: FrontMenuProps) {

  return (
    <div>
      <div
        className="menu-items-container print"
        style={{
          padding: `${styleForm.pagePaddingTopAndBottom}px ${styleForm.pagePaddingLeftAndRight}px`,
          width: `${+styleForm.menuWidth}mm`,
          height: `${+styleForm.menuHeight}mm`,
          maxHeight: `${+styleForm.menuHeight}mm`,
          overflow: "hidden"

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
          <div className="category-title" style={{ fontSize: `${styleForm.titleSize}px`}}
          >{styleForm.title}</div>
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
        {categoryOrder.map((category) => {
          const categoryData = organizedData[category];
          if (
            category === "Salads" &&
            (organizedData["Salads"]?.items.length > 0 ||
              organizedData["Soups"]?.items.length > 0)
          ) {
            return (
              <div className="split-container" key="Salads-Soups">
                {["Salads", "Soups"].map((cat) =>
                  organizedData[cat]?.items.length > 0 ? (
                    <div key={cat} className="split-div">
                      <h3 className="category-title">{cat}</h3>
                      <ul className="split-list">
                        {organizedData[cat].items.map((item, idx) => (
                          <li key={idx} className="menu-item-joined">
                            <strong>
                              {item.label} {item.price.value?.toFixed(2)}
                            </strong>
                            <div>{item.description}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>
            );
          }

          if (category === "Soups") return null;

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
                  {categoryData.items.map((item, index, arr) => (
                    <li
                      key={index}
                      className={
                        (arr?.length % 2 !== 0 &&
                          index === arr?.length - 1 &&
                          category !== "Sides") ||
                        styleForm.menuWidth <= "110mm" // Slim width format
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
                          {item.label} {item.price.value?.toFixed(2)}
                        </div>
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
          <div className="category-title" style={{ fontSize: `${styleForm.footerSize}px`}}
          >{styleForm.footer}</div>
        )}
        {showDisclaimer && <Footer />}
      </div>
    </div>
  );
}
