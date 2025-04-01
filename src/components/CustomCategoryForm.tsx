import { useEffect, useState } from "react";
import { MenuCategory, MenuCustomCategory } from "../data/types";

import "./CustomCategoryForm.css";
// import { IoMdAddCircle } from "react-icons/io";

type Props = {
  setFadeInOut: React.Dispatch<React.SetStateAction<boolean>>
  // customArrTitles: string[];
  setCustomArrTitles: React.Dispatch<React.SetStateAction<string[]>>;
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
  // customArrTitles,
  setFadeInOut,
  setCustomArrTitles,
  newArray,
  setNewArray,
  newCustomCategories,
  setNewCustomCategories,
  customCategories,
  setCustomCategories,
  newCustomArray,
  setNewCustomArray,
}: Props) {
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
  };

  useEffect(() => {
    setCustomArrTitles(newCustomArray?.map((category) => category.title));
  }, [newCustomArray]);

  return (
    <div className="custom-form-container">
      <form className="custom-form">
        <h5>Create a custom category</h5>
        <br />
        <input
          className="form-input"
          type="text"
          style={{ width: "80%" }}
          value={catObj.newCat}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter category's name..."
        />
        <br />
        <br />
        <div className="button-container">
          {showSubmit && (
            <button
              type="button"
              // style={{ width: "40%" }}
              onClick={(e) => handleClick(e)}
            >
              submit
            </button>
          )}
        </div>
      </form>
      {/* <IoMdAddCircle /> */}
    </div>
  );
}
