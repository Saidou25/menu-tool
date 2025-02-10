type FieldType = "textArea" | "text" | "checkbox" | "number"; // Add more types as needed

export type Price = {
  type: "number"; // Assuming price type is always "number"
  placeholder: string;
};

export type Field = {
  label: string;
  dataLabel: string;
  description: string;
  type: FieldType;
  price: Price;
};

export type SharableObj = {
  title: string;
  fields: Field[];
};

const sharablesList: SharableObj = {
  title: "Sharables",
  fields: [
    {
      label: "Pepperoni Pizza Pops",
      dataLabel: "pizzaPops",
      description:
        "Puff pastry, pepperoni, provolone cheese, garlic butter + house-made pepperoni marinara sauce",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
      },
    },
    {
      label: "Garlic Butta Shtimp",
      dataLabel: "buttaShrimp",
      description:
        "Bacon-wrapped, smothered with garlic butter + pickled red onion, served with Texas toast points",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
      },
    },
    {
      label: "Pretzel Pig Pile",
      dataLabel: "pretzel",
      description:
        "Pretzel bites, beer cheese, parmesan + provolone cheeses, bacon + scallions", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
      },
    },
    {
      label: "Trash Can Nachos",
      dataLabel: "nachos",
      description:
        "Corn tortilla chips, house-smoked pork, SMC*, cheddar cheese, black beans, jalapenos, sour cream, pickled red onions, cilantro, pico de gallo + Guy's signature bourbon brown sugar BBQ sauce", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
      },
    },
    {
      label: "Lobster Lollipops",
      dataLabel: "lobsterLollipops",
      description:
        "Tempura-battered lobster bites, Old Bay-smothered SMC* fries + lemon aioli",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
      },
    },
  ],
};

export { sharablesList };
