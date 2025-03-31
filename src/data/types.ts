export type FieldType = "textArea" | "text" | "checkbox" | "number" | "color";

export type Price = {
  type: "number";
  placeholder: string;
  value?: number; // if applicable
  value1?: number; // if applicable
  value2?: number; // if applicable
};

export type Field = {
  label: string;
  description?: string; // if applicable
  subSubtitle?: string; // if applicable
  subSubtitle1?: string; // if applicable
  subSubtitle2?: string; // if applicable
  type: FieldType;
  price: Price;
};

export type MenuCategory = {
  title: string;
  subtitle?: string; // if applicable
  items: Field[];
};

export type MenuCustomCategory = {
  title: string;
  subCategories: { subCategoryTitle: string, items: Field[] }[]; // Array of objects containing an `items` array
  subtitle?: string; // Optional subtitle
};


export type SectionBackground = {
  categoryIndex: number;
  backgroundColor: string;
}[];

export type DescriptionLetterColor = {
  categoryIndex: number;
  index: number;
  descriptionLetterColor: string;
}[];

export type PaddingCategorieTop = {
  categoryIndex: number;
  paddingCategoriesTop: number;
}[];

export type MarginCategoreTop = {
  categoryIndex: number;
  marginCategoriesTop: number;
}[];

export type subSubtitleFontColor = {
  categoryIndex: number;
  subtitleFontColor: string;
}[];

export type StyleFormType = {
  menuWidth: number;
  menuHeight: number;
  backgroundImage: string;
  categoriesMarginBottom: number;
  decoration: string;
  topImage: string;
  topImageSize: number;
  bottomImage: string;
  bottomImageSize: number;
  pagePaddingTopAndBottom: number;
  pagePaddingLeftAndRight: number;
  categoryFontSize: number;
  categoryMarginBottom: number;
  itemFontSize: number;
  itemMarginBottom: number;
  descriptionFontSize: number;
  subtitleFontSize: number;
  subtitleFontColor: subSubtitleFontColor;
  subtitlePaddingBottom: number;
  descriptionMarginBottom: number;
  guyTop: string;
  guyBottom: string;
  guyTopSize: number;
  guyBottomSize: number;
  guyTopMarginBottom: number;
  guyBottomMarginBottom: number;
  title: string;
  titleSize: number;
  titleColor: string;
  titlePaddingTop: number;
  titlePaddingBottom: number;
  titleMarginBottom: number;
  titleBackgroundColor: string;
  footerSize: number;
  footer: string;
  footerMarginBottom: number;
  pageBackground: string;
  sectionBackground: SectionBackground;
  descriptionLetterColor: DescriptionLetterColor;
  categoryColor: string;
  priceSize: number;
  priceColor: string;
  menuItemColor: string;
  menuItemDescriptionColor: string;
  textTopColor: string;
  textBottomColor: string;
  footerTextColor: string;
  gapTextTop: number;
  contentContainerWidth: number;
  paddingCategoriesLeftRight: number;
  paddingCategoriesTop: PaddingCategorieTop;
  marginCategoriesTop: MarginCategoreTop;
  decorationWidth: number;
  paddingDecoration: number;
  footerPaddingPaddingTop: number;
  footerPaddingBottom: number;
};
