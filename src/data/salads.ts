type FieldType = "textArea" | "text" | "checkbox"; // Add more types as needed

type Field = {
  label: string;
  dataLabel: string;
  description: string;
  type: FieldType;
  price: number;
  placeholder?: string;
};

type Salad = {
  title: string;
  fields: Field[];
};

const saladList: Salad = {
  title: "Salads",
  fields: [
    {
      label: "Bif Bite Caesar",
      dataLabel: "caesar",
      description:
        "Crisp romaine lettuce, parmesan cheese, gouse-made caesar dressing + garlic-parmesan croutons",
      type: "checkbox",
      price: 0,
    },
    {
      label: "The Ultimate Cobb",
      dataLabel: "cobb",
      description:
        "Smoked chicken, bacon, tomatoes, cucumbers, romaine lettuce, crumbled blue cheese, hard-boiled egg, avocado + house-made buttermil ranch",
      type: "checkbox",
      price: 0,
    },
  ],
};

export { saladList };
