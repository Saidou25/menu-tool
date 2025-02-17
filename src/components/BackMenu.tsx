import { Field } from "../data/sharables";
import Footer from "./Footer";

type BackMenuProps = {
  categoryOrder: string[];
  secondPageData: Record<string, Field[]>;
};

const BackMenu = ({ categoryOrder, secondPageData }: BackMenuProps) => {
  return (
    <div className="row menu-items-container mt-5">
      {categoryOrder?.map((category) => {
        const items = secondPageData[category];

        if (items?.length > 0) {
          return (
            <div key={category} className="category-section">
              <h3 className="category-title">{category}</h3>
              <ul className="row category-list">
                {items?.map((item, index, arr) => (
                  <li
                    key={index}
                    className={
                      arr?.length % 2 !== 0 && index === arr?.length - 1 && category !== "Sides"
                        ? "col-12 menu-item-odd"
                        : "col-6 menu-item"
                    }
                  >
                    <strong>
                      {item.label} ${item.price.value.toFixed(2)}
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
      <Footer />
    </div>
  );
};

export default BackMenu;
