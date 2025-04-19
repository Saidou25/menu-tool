import { MenuCategory } from "../types";

const burgersList: MenuCategory = {
  title: "Big bite burgers",
  subtitle:
    "all our richly marbled 100% USDA brasstown beef is smash-grilled to juicy perfection + served with a seasoned fry trio",
  subtitle2:
    "all our richly marbled 100% USDA brasstown beef is smash-grilled to juicy perfection + on gluten-free buns",
  items: [
    {
      label: "Bacon mac'n' cheese",
      description:
        "Gyu's award-winning burger Boted best burger in Las Vegas by seven magazine, winner of nNew York citygood + Wine festival's burger bash crispy applewood smoded bacon, mac'n' cheese, SMC*, LTOP* + donkey sauce, crispy onions, on a garlic-buttered brioche bun",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 22.95,
      },
    },
    {
      label: "Pimento smash",
      description:
        "topped with cheddar + pimento cheeses, pimento-pickle relish, crispy onions + donkey sauce an a garlibuttered brioche bun",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 19.95,
      },
    },
    {
      label: "Real cheezy",
      description:
        "topped with SMC* + cheddar cheese, LTOP* + donkey sauce on a garlic-butter brioche bun", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 19.95,
      },
    },
    {
      label: "Primetime american kobe*",
      description:
        "American-style Kobe beef, baramelized onion jam, onion straws, smoked goude cheee, cheddar cheese, aged parmesan cheese, pickles + dondkey sauce on a garlicbuttered brioche bun", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 22.95,
      },
    },
    {
      label: "BBQ fun-guy",
      description:
        "roasted mushroom, quinoa, black bean patty, LTOP*, Guy's signature bourbon brown sugar bbq sauce, crispy onions + donkey sauce, on a garlic-buttered brioche bun",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 18.95,
      },
    },
    {
      label: "Tatted-up turkey",
      description:
        "poblannos + pepper jack cheese mixed into ground turkey burger, topped with sliced gouda + pepper jack cheeses, red onion jam, LTOP* + doondeysauce, all stacked on a garlic-buttered pretzed bun",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 16.95,
      },
    },
  ],
};

export { burgersList };
