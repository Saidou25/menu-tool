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

export type SideObj = {
  title: string;
  fields: Field[];
};

const sidesList: SideObj = {
  title: "Sides",
  fields: [
    {
      label: "Asparagus",
      description:
        "Puff pastry, pepperoni, provolone cheese, garlic butter + house-made pepperoni marinara sauce",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Seasoned gry tio",
      description:
        "Bacon-wrapped, smothered with garlic butter + pickled red onion, served with Texas toast points",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Loaded mashed potatoes",
      description:
        "Pretzel bites, beer cheese, parmesan + provolone cheeses, bacon + scallions", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Fried brussels sprouts",
      description:
        "Corn tortilla chips, house-smoked pork, SMC*, cheddar cheese, black beans, jalapenos, sour cream, pickled red onions, cilantro, pico de gallo + Guy's signature bourbon brown sugar BBQ sauce", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Stone-ground-grits",
      description:
        "Tempura-battered lobster bites, Old Bay-smothered SMC* fries + lemon aioli",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },

    {
      label: "Sea-salt crusted potato wedges",
      description:
        "Tempura-battered lobster bites, Old Bay-smothered SMC* fries + lemon aioli",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Garlic mashed potato wedges",
      description:
        "Tempura-battered lobster bites, Old Bay-smothered SMC* fries + lemon aioli",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Garlic mashed potatoes",
      description:
        "Tempura-battered lobster bites, Old Bay-smothered SMC* fries + lemon aioli",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Grilled broccolini",
      description:
        "Tempura-battered lobster bites, Old Bay-smothered SMC* fries + lemon aioli",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Mac'n' cheese",
      description:
        "Tempura-battered lobster bites, Old Bay-smothered SMC* fries + lemon aioli",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Lobster mac'n' cheese",
      description:
        "Tempura-battered lobster bites, Old Bay-smothered SMC* fries + lemon aioli",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
  ],
};

export { sidesList };
