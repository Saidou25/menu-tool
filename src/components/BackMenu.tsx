import { Field } from "../data/types";

import Footer from "./Footer";

type BackMenuProps = {
  showDisclaimer: boolean;
  menuPreviewSize: string;
  categoryOrder: string[];
  secondPageData: Record<string, Field[]>;
};

const BackMenu = ({
  showDisclaimer,
  menuPreviewSize,
  categoryOrder,
  secondPageData,
}: BackMenuProps) => {

  return (
    <>
      <br className="no-print" />
      <h3 className="no-print">Menu back</h3>
      <br className="no-print" />
      <div className={`menu-items-container-${menuPreviewSize} print`}>
        {categoryOrder?.map((category) => {
          const items = secondPageData[category];

          if (items?.length > 0) {
            return (
              <div key={category}>
                <h3 className="category-title">{category}</h3>
                <ul className="row category-list">
                  {items?.map((item, index, arr) => (
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
                        {item.label}
                        {item.price.placeholder === "Market price" ? (
                          <span className="small"> Market Price</span>
                        ) : (
                          <span> {`$${item.price.value?.toFixed(2)|| ""}`}
                          </span>
                        )}
                        <br />
                        {item.subSubtitle && (
                          <span className="small">{item.subSubtitle}</span>
                        )}

                        
                        {item.subSubtitle1 && (
                          <span className="small">
                            {item.subSubtitle1}&nbsp;
                            {`$${item.price.value1?.toFixed(2)}`}
                          </span>
                        )}
                        {item.subSubtitle2 && (
                          <span className="small">
                            &nbsp; {item.subSubtitle2}&nbsp; $
                            {item.price.value2?.toFixed(2)}
                          </span>
                        )}
                      </strong>
                      <div>{item.description}</div>
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
