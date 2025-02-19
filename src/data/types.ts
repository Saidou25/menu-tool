export type FieldType = "textArea" | "text" | "checkbox" | "number";

export type Price = {
  type: "number";
  placeholder: string;
  value?: number;
  value1?: number;
  value2?: number;
};

export type Field = {
  label: string;
  description: string;
  subSubtitle?: string;
  subSubtitle1?: string;
  subSubtitle2?: string;
  type: FieldType;
  price: Price;
};

export type MenuCategory<T> = {
  title: string;
  subtitle?: string;
  fields: T[];
};
