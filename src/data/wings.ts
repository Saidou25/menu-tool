type FieldType = "textArea" | "text" | "checkbox" | "number"; // Add more types as needed

export type Price = {
  type: "number"; // Assuming price type is always "number"
  placeholder: string;
  value: number;
};

export type Field = {
  label: string;
  description: string;
  type: FieldType;
  price: Price;
};

export type WingObj = {
  title: string;
  subTitle?: string;
  fields: Field[];
};

const wingsList: WingObj = {
  title: "Ain't no thing butta chicken wing...",
  subTitle:
    "our all-natural wings are brined, dry-rubbed _ roasted, then fried to crispy perfection",
  fields: [
    {
      label: "Buffalo wings",
      description:
        "tossed in Guy's buffalo sauce, Guy's blue-sabi (blue cheese + wasabi) dipping sauce to put out the fire!",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Hoot honey-garlic wings",
      description:
        "tossed in sticky, spicy honey-garlic sauce, served with house-made buttermiilk randh",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Boourbon brown sugar bbq wings",
      description:
        "tossed iin Guy's signature bourbon brown sugar bbq sauce, served with hous-made buttermik randh",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
  ],
};

export { wingsList };
