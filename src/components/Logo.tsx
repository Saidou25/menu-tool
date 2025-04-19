// import { MenuCategory } from "../data/types";
import "./Logo.css";

type LogoProps = {
  reset?: () => void;
  fadeLogoInOut?: boolean;
  className: string;
  title: string;
  subtitle: string;
  h1ClassName: string;
  menuPreview?: boolean;
  // setCategoriesList?: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  setMenuPreview?: React.Dispatch<React.SetStateAction<boolean>>;
  setView?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Logo({
  reset,
  fadeLogoInOut,
  className,
  h1ClassName,
  title,
  subtitle,
  setMenuPreview,
  // setCategoriesList,
  setView,
}: LogoProps) {

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.className.includes("preview-btn")) {
      setMenuPreview?.((prev) => !prev);
    } else if (event.currentTarget.className.includes("restart")) {
      reset?.();
      window.location.reload()
    } else if (event.currentTarget.className === "go-back no-print") {
      setView?.((prev) => !prev);
    }
    // else if (event.currentTarget.className === "print-document no-print") {
    //   window.print();
    // }
  };
  return (
    <div
      // className={`${className}`}
      className={
        fadeLogoInOut && title !== "Menu tool"
          ? `${className} label-fade-in`
          : className
      }
      onClick={(e) => handleClick(e)}
    >
      <h1 className={h1ClassName}>{title}</h1>
      <span>{subtitle}</span>
    </div>
  );
}
