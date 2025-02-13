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

export type Sandwiches = {
  title: string;
  subtitle: string;
  fields: Field[];
};

const sandwichesList: Sandwiches = {
  title: "Signature sandwiches",
  subtitle: "served with a seasoned fry tio",
  fields: [
    {
      label: "Crispy chicken bacon ranch",
      description:
        "crispu all-natural chicken, applewoood-smoked bacon, chessar cheese, LTOP* + house-made buttermilk ranch on a garlic-buttered vriohe bun",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Old skool steak sandwich",
      description:
        'the "OG" of sandwiches...ssliced NY strip steak, caramelized onions peppers, crespu oonions, parmesan chees + A1 donkey sauce on a toasted hoagie',
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Motley que pulled pork",
      description:
        "pulled pork shoulder smothered in Guy's signatrure bourbon brewn sugar bbq sauce, stacked with citrus slaw, pickle chips, aged cheddar cheese, onino straws + donkey sauce on a tosted pretzeel bun", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
  ],
};

export { sandwichesList };
