
import { MenuCategory, Field } from "../types";



// Define the type (structure)
export type BigEats = MenuCategory<Field>;

const bigEatsList: BigEats = {
  title: "Big eats",
  subtitle1: "half rack",
  subtitle2: "full rack",
  fields: [
    {
      label: "American royal ribs",
      description:
        "house-smoked St. Louis rivs, gry-rubbed + basted in Guy's signture bourbon brown sugar bbq sauce, served with mac'n'cheese, American slaw + sweet jalalpeno cornbread",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Cajun chicken alfredo",
      subSubtitle: "Flavortown GiUpgrade. Andouille sausage or shrimp + 6.00",
      description:
        "Cajun-spiced chicken brest, whit wine  parmesan alfredo sauce, sun-dried tomatoes, diced roma tomatoes, penne psta + scallions",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Chicken fried checken",
      description:
        "2 buttermik-brined fried checken breasts, cavered with sausage pepper mill gravy, stone-ground grits + bacon brussels sprouts", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Baha beef tenderloind",
      subSubtitle: "market price",
      description:
        "8 oz. filet topped with chipotle-agave butter, sea salt-crusted potto wedges + fried asparagus", // Fixed typo
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Cajun salmon*",
      description:
        "7 oz. salmon filet topped with Guy's signature bourbon brown sugar bbq glaze, roasted garlic, habanero butter, gried asparagus + garlic mashe potatoes",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "jack Daniel's ny strip",
      description:
        "12 oz. NY strip toppeed with roasted garlic habanero butter, Jack Danile's demi-glece, loadeed mashed potatoes + fried asparagus",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Fried Trout'n' grits",
      description:
        "cornmeal-breaded trout, pimento-pickle relish, stone-ground grits + grilled broccolini",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
    {
      label: "Prim boneless ribeye 16 oz.",
      subSubtitle: "market price",
      description: "with garlic mashed potatoes + fried asparagus",
      type: "checkbox",
      price: {
        type: "number",
        placeholder: "Enter price",
        value: 0,
      },
    },
  ],
};

export { bigEatsList };
