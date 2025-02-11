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

export type SoupObj = {
  title: string;
  fields: Field[];
};
export const soupsList: SoupObj = {
  title: "Soups",
  fields: [
    {
      label: "Dragon Breath Chili",
      description:
        "Low'n' slow' cooked beef + pork chli, topped with melted cheddar cheese, sweet jalopeno cornbread, sour cream + scalions",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "French Onion Soup",
      description:
        "Caramelized onions, beef broth, melty provolone cheesee + garlic croutons",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Chef's Featured Soup",
      description: "",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
  ],
};
