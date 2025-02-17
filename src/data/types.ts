export type FieldType = "textArea" | "text" | "checkbox" | "number"; 

export type Price = {
  type: "number";
  placeholder: string;
  value: number;
};

export type Field = {
  label: string;
  description: string;
  subSubtitle?: string;
  type: FieldType;
  price: Price;
};

export type MenuCategory<T> = {
  title: string;
  subtitle?: string;
  subtitle1?: string;
  subtitle2?: string;
  fields: T[];
};
