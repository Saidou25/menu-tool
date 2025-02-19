export type FieldType = "textArea" | "text" | "checkbox" | "number";

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
