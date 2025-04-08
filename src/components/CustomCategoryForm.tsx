import { useState } from "react";
import { MenuCategory, MenuCustomCategory } from "../data/types";
import { IoMdAddCircle } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";

import "./CustomCategoryForm.css";

type Props = {
  setFadeInOut: React.Dispatch<React.SetStateAction<boolean>>;
  newArray: MenuCategory[]; // Accept newArray from parent
  setNewArray: React.Dispatch<React.SetStateAction<MenuCategory[]>>; // Accept setNewArray from parent
  newCustomCategories: any[];
  setNewCustomCategories: React.Dispatch<
    React.SetStateAction<{ categoryItem: string }[]>
  >;
  customCategories: any[];
  setCustomCategories: React.Dispatch<
    React.SetStateAction<{ categoryItem: string }[]>
  >;
  newCustomArray: MenuCustomCategory[];
  setNewCustomArray: React.Dispatch<React.SetStateAction<MenuCustomCategory[]>>;
};

export default function CustomCategoryForm({
  setFadeInOut,
  newArray,
  setNewArray,
  newCustomCategories,
  setNewCustomCategories,
  customCategories,
  setCustomCategories,
  newCustomArray,
  setNewCustomArray,
}: Props) {
  const [showPlus, setShowPlus] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [catObj, setCatObj] = useState<{ newCat: string }>({ newCat: "" });
  const [newCategory, setNewCategory] = useState<MenuCategory>({
    title: "",
    subtitle: "",
    items: [],
  });
  const [catCustomObj, setCatCustomObj] = useState<{ newCustomCat: string }>({
    newCustomCat: "",
  });
  const [newCustomCategory, setNewCustomCategory] =
    useState<MenuCustomCategory>({
      title: "",
      subtitle: "",
      subCategories: [],
    });

  const handleChange = (value: string) => {
    if (value.length > 3) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
    setCatObj({ newCat: value });
    setCatCustomObj({ newCustomCat: value });
    setNewCategory({
      ...newCategory,
      title: value,
      subtitle: "",
      items: [],
    });
    setNewCustomCategory({
      title: value,
      subtitle: "",
      subCategories: [],
    });
  };

  const setNew = () => {
    setNewArray([...newArray, newCategory]);
    setNewCustomArray([...newCustomArray, newCustomCategory]);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCustomCategories([...customCategories, { categoryItem: catObj.newCat }]);
    setNewCustomCategories([
      ...newCustomCategories,
      { categoryItem: catCustomObj.newCustomCat },
    ]);
    setNew();
    setFadeInOut(true);
    // Resets the form fields
    setCatObj({ newCat: "" });
    setCatCustomObj({ newCustomCat: "" });
    setNewCategory({ title: "", subtitle: "", items: [] });
    setNewCustomCategory({ title: "", subtitle: "", subCategories: [] });
    setShowSubmit(false); // Hide submit button
    setShowPlus(!showPlus);
  };

  return (
    <div className="custom-form-container">
      {showPlus ? (
        <div className="plus-container">
          <IoMdAddCircle
            onClick={() => setShowPlus(!showPlus)}
            className="plus"
          /><br />
          Add a category
        </div>
      ) : (
        <form className="custom-form">
          <div className="close-container">
            <IoCloseOutline className="close" 
            onClick={() => setShowPlus(!showPlus)} />
          </div>
          <h5>Name your custom category</h5>
          <br />
          <input
            className="form-input"
            type="text"
            style={{ width: "76%" }}
            value={catObj.newCat}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter category's name..."
          />
          <br />
            {showSubmit && (
              <Button
                type="button"
                onClick={(e) => handleClick(e)}
                disabled={!showSubmit}
                className="button"
              >
                submit
              </Button>
            )}
            <br />
        </form>
      )}
    </div>
  );
}
