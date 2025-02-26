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

export type SectionBackground = {
  index: number;
  backgroundColor: string;
}[];

export type StyleFormType = {
  menuWidth: number;
  menuHeight: number;
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
  descriptionMarginBottom: number;
  guyTop: string;
  guyBottom: string;
  guyTopSize: number;
  guyBottomSize: number;
  guyTopMarginBottom: number;
  guyBottomMarginBottom: number;
  title: string;
  titleSize: number;
  titleMarginBottom: number;
  footerSize: number;
  footer: string;
  footerMarginBottom: number;
  pageBackground: string;
  sectionBackground: SectionBackground;
  titleColor: string;
  categoryColor: string;
  priceSize: number;
  priceColor: string;
  menuItemColor: string;
  menuItemDescriptionColor: string;
  textTopColor: string;
  textBottomColor: string;
  footerTextColor: string;
};
