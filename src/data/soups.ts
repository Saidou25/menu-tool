type FieldType = "textArea" | "text" | "checkbox"; // Add more types as needed

type Field = {
  label: string;
  dataLabel: string;
  description: string;
  type: FieldType;
  price: number;
  placeholder?: string;
};

type Soup = {
  title: string;
  fields: Field[];
};

const soupList: Soup = {
  title: "Soups",
  fields: [
    {
      label: "Dragon Breath Chili",
      dataLabel: "chili",
      description:
        "Low'n' slow' cooked beef + pork chli, topped with melted cheddar cheese, sweet jalopeno cornbread, sour cream + scalions",
      type: "checkbox",
      price: 0,
    },
    {
      label: "French Onion Soup",
      dataLabel: "frenchOnion",
      description:
        "Caramelized onions, beef broth, melty provolone cheesee + garlic croutons",
      type: "checkbox",
      price: 0,
    },
    {
      label: "Chef's Featured Soup",
      dataLabel: "featuredSoup",
      description: "",
      type: "checkbox",
      price: 0,
    },
  ],
};

export { soupList };
