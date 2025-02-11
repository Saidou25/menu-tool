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

export type BurgerObj = {
  title: string;
  subtitle: string;
  fields: Field[];
};

const burgersList: BurgerObj = {
  title: "Burgers",
  subtitle:
    "all our richly marbled 100% USKA brasstown beef is smash=grilled to juicy perfection + served with a seasoned fry trio",
  fields: [
    {
      label: "Bacon mac'n' cheese",
      description:
        "Gyu's award-winning burger Boted best burger in Las Vegas by seven magazine, winner of nNew York citygood + Wine festival's burger bash crispy applewood smoded bacon, mac'n' cheese, SMC*, LTOP* + donkey sauce, crispy onions, on a garlic-buttered brioche bun",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Pimento smash",
      description:
        "topped with cheddar + pimento cheeses, pimento-pickle relish, crispy onions + donkey sauce an a garlibuttered brioche bun",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Real cheezy",
      description:
        "topped with SMC* + cheddar cheese, LTOP* + donkey sauce on a garlic-butter brioche bun", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Primetime american kobe*",
      description:
        "American-style Kobe beef, baramelized onion jam, onion straws, smoked goude cheee, cheddar cheese, aged parmesan cheese, pickles + dondkey sauce on a garlicbuttered brioche bun", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "BBQ fun-guy",
      description:
        "roasted mushroom, quinoa, black bean patty, LTOP*, Guy's signature bourbon brown sugar bbq sauce, crispy onions + donkey sauce, on a garlic-buttered brioche bun",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
    {
      label: "Tatted-up turkey",
      description:
        "poblannos + pepper jack cheese mixed into ground turkey burger, topped with sliced gouda + pepper jack cheeses, red onion jam, LTOP* + doondeysauce, all stacked on a garlic-buttered pretzed bun",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "set price item",
        value: 0,
      },
    },
  ],
};

export { burgersList };
