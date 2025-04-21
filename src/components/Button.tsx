import { ReactNode } from "react";

import "./Button.css";

type ButtonType = {
  value?: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  printEdit?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  value,
  type,
  disabled,
  children,
  className,
  printEdit,
  onClick,
}: ButtonType) {

  
  return (
    <div
      className={
        !printEdit && className !== "img-button" && className !== "background"
          ? "container-button"
          : className === "img-button"
          ? "img-button"
          : className === "background" 
          ? "background"
          : "print-edit-container"
      }
    >
      <button
        className={`${className} btn`}
        value={value}
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {children}
      </button>
    </div>
  );
}
