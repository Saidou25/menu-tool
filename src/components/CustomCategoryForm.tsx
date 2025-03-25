import { useEffect, useState } from "react";
import { MenuCategory, MenuCustomCategory } from "../data/types";

type Props = {
  customArrTitles: string[];
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
  customArrTitles,
  setCustomArrTitles,
  newArray,
  setNewArray,
  newCustomCategories,
  setNewCustomCategories,
  customCategories,
  setCustomCategories,
  newCustomArray,
  setNewCustomArray
}: 
Props) {

  const [catObj, setCatObj] = useState<{ newCat: string }>({ newCat: "" });
  const [newCategory, setNewCategory] = useState<MenuCategory>({
    title: "",
    subtitle: "",
    items: [],
  }); 

  const [catCustomObj, setCatCustomObj] = useState<{ newCustomCat: string }>({ newCustomCat: "" });
  const [newCustomCategory, setNewCustomCategory] = useState<MenuCustomCategory>({
    title: "",
    subtitle: "",
    subCategories: []
  }); 


  const handleChange = (value: string) => {
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
      subCategories: []
    });
    
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCustomCategories([...customCategories, { categoryItem: catObj.newCat }]);
    setNewCustomCategories([...newCustomCategories, { categoryItem: catCustomObj.newCustomCat }]);
  };

  const setNew = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNewArray([
      ...newArray,
      newCategory
    ])
    setNewCustomArray([
      ...newCustomArray,
      newCustomCategory
    ])
    
  };

  useEffect(() => {
    setCustomArrTitles(newCustomArray?.map((category) => category.title));
  }, [newCustomArray]);
  

  return (
    <div>
      <input
        type="text"
        style={{ width: "20%" }}
        value={catObj.newCat}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        type="button"
        style={{ width: "10%" }}
        onClick={(e) => {handleClick(e); setNew(e)}}
      >
        submit
      </button>
    </div>
  );
}
