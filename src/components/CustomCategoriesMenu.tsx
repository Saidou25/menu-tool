import { MenuCustomCategory, StyleFormType } from "../data/types";

type Props = {
  newCustomArray: MenuCustomCategory[]; 
  styleForm: StyleFormType;
};

export default function CustomCategoriesMenu({ newCustomArray }: Props) {
  console.log("newCustomArray", newCustomArray);
  return (
    <div  className="row menu-items-container">
      {newCustomArray &&
        newCustomArray.map((customCategories) => (
          <div key={customCategories.title}>
            {customCategories.title}
            {customCategories.subCategories &&
              customCategories.subCategories.map((subCategory) => (
                <div key={subCategory.subCategoryTitle}>
                  {subCategory.subCategoryTitle}
                  {subCategory.items &&
                    subCategory.items.map((item) => (
                      <div key={item.label}>{item.label}</div>
                    ))}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}
