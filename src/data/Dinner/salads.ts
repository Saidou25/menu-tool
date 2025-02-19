import { MenuCategory } from "../types";

const saladsList: MenuCategory = {
  title: "Salads",
  items: [
    {
      label: "Big Bite Caesar",
      description:
        "Crisp romaine lettuce, parmesan cheese, gouse-made caesar dressing + garlic-parmesan croutons",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "The Ultimate Cobb",
      description:
        "Smoked chicken, bacon, tomatoes, cucumbers, romaine lettuce, crumbled blue cheese, hard-boiled egg, avocado + house-made buttermil ranch",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
  ],
};

export { saladsList };
