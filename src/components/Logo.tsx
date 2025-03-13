import { MenuCategory } from "../data/types";
import "./Logo.css";

type LogoProps = {
  className: string;
  title: string;
  subtitle: string;
  h1ClassName: string;
  menuPreview?: boolean;
  setCategoriesList?: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  setMenuPreview?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Logo({
  className,
  h1ClassName,
  title,
  subtitle,
  setMenuPreview,
  setCategoriesList,
}: LogoProps) {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.className === "preview-btn") {
      setMenuPreview?.((prev) => !prev);
    } else {
      setCategoriesList?.([]);
    }
  };
  return (
    <div className={`${className}`} onClick={(e) => handleClick(e)}>
      <h1 className={h1ClassName}>{title}</h1>
      <span>{subtitle}</span>
    </div>
  );
}
