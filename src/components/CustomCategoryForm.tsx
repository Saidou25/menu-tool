import { useState } from "react";

type Props = {
  customCategories: any[];
  setCustomCategories: React.Dispatch<
    React.SetStateAction<{ categoryItem: string }[]>
  >;
};

export default function CustomCategoryForm({
  customCategories,
  setCustomCategories,
}: //   setCustomCategories,
Props) {
  const [catObj, setCatObj] = useState<{ newCat: string }>({ newCat: "" });

  const handleChange = (value: string) => {
    setCatObj({ newCat: value });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCustomCategories([...customCategories, { categoryItem: catObj.newCat }]);
  };
//   console.log(customCategories);
  return (
    <div>
      <input
        type="text"
        style={{ width: "20%", textTransform: "uppercase" }}
        value={catObj.newCat}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        type="button"
        style={{ width: "10%" }}
        onClick={(e) => handleClick(e)}
      >
        submit
      </button>
    </div>
  );
}
