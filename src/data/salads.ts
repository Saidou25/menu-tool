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

export type SaladObj = {
  title: string;
  fields: Field[];
};

const saladsList: SaladObj = {
  title: "Salads",
  fields: [
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
