import { MenuCategory } from "../types";

// Define the type (structure)
// export type SoupsCategory = MenuCategory<Field>;

export const soupsList: MenuCategory = {
  title: "Soups",
  items: [
    {
      label: "Dragon Breath Chili",
      description:
        "Low'n' slow' cooked beef + pork chli, topped with melted cheddar cheese, sweet jalopeno cornbread, sour cream + scalions",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 10.50,
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
        value: 8.50,
      },
    },
    {
      label: "Chef's Featured Soup",
      description: "",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 8.50,
      },
    },
  ],
};
