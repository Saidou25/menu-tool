type FieldType = "textArea" | "text" | "checkbox" | "number"; // Add more types as needed

export type Price = {
  type: "number"; // Assuming price type is always "number"
  placeholder: string;
  value: number;
};

export type Field = {
  label: string;
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
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Seasoned gry tio",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Loaded mashed potatoes",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Fried brussels sprouts",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Stone-ground-grits",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },

    {
      label: "Sea-salt crusted potato wedges",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Garlic mashed potato wedges",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Garlic mashed potatoes",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Grilled broccolini",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Mac'n' cheese",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Lobster mac'n' cheese",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
  ],
};

export { sidesList };
