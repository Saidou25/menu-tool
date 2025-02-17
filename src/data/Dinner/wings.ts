import { Field, MenuCategory } from "../types";

// Define the type (structure)
export type Wings = MenuCategory<Field>;

const wingsList: Wings = {
  title: "Ain't no thing butta chicken wing...",
  subtitle:
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
        value: 20.95,
      },
    },
    {
      label: "Hoot honey-garlic wings",
      description:
        "tossed in sticky, spicy honey-garlic sauce, served with house-made buttermiilk randh",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 20.95,
      },
    },
    {
      label: "Boourbon brown sugar bbq wings",
      description:
        "tossed iin Guy's signature bourbon brown sugar bbq sauce, served with hous-made buttermik randh",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 20.95,
      },
    },
  ],
};

export { wingsList };
