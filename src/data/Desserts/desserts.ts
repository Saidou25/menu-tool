import { Field, MenuCategory } from "../types";

export type DesertCategory = MenuCategory<Field>;

const dessertsList: DesertCategory = {
  title: "FlavorTown finale",
  fields: [
    {
      label: "Chocolate whiskey cake",
      description:
        "Whiskey creme anflaise, salted caramel sauce + crumbled  heath bar",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 15.95,
      },
    },
    {
      label: "Chheesecake challenge",
      description:
        "Hoalf of a NY-style marble cheesecake, topped with potato chips, pretzels + hot fudge",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 15.95,
      },
    },
    {
      label: "Strawberry shortcake",
      description:
        "Santo Tequila macerated strawbwerries, lime sugar, pound cake, 4 scoops of ice cream + whipped cream",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 11.95,
      },
    },
    {
      label: "Salted caramel pretzel bread pudding",
      description:
        "Bourbon salted ccaramel, chocoloate fudge sauce, vanilla bean ice cream + crushed heath bar",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 16.95,
      },
    },
    {
      label: "Ice cream",
      description:
        "One scoop of chocolate, one scoop of vanilla, one scoop of strawberry",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 6.95,
      },
    },
  ],
};
export { dessertsList };
