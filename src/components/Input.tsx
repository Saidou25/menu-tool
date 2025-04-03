import "./Input.css";

type InputProps = {
  type: string;
  className?: string;
  id?: string;
  previewTitle?: string;
  title?: string;
  smallTitle?: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  name?: string;
  htmlFor?: string;
  value?: string;
};

export default function Input({
  value,
  smallTitle,
  type,
  className,
  id,
  onChange,
  checked,
  name,
  previewTitle,
  title,
  label,
  htmlFor,
}: InputProps) {

  if (type === "checkbox") {
    return (
      <div className="checkbox-container">
        <input
          className={className}
          id={id}
          type="checkbox"
          onChange={onChange}
          checked={checked}
          name={name}
        />
        &nbsp;&nbsp;
        <label htmlFor={htmlFor}>
          {title && htmlFor !== "tool-title" && !smallTitle ? (
            <h1>{title}</h1>
          ) : (
            <span>{title}</span>
          )}
          {label && <span>{label}</span>}
          {previewTitle && <span>{previewTitle}</span>}
          {smallTitle && <span className="small-titles">{smallTitle}</span>}
        </label>
      </div>
    );
  }
  if (type === "color") {
    return (
      <label
        className={
          className === "color-inputs"
            ? "color-inputs"
            : "menu-color-inputs"
        }
        htmlFor={name}
      >
        <input
          className="inputs"
          type="color"
          id={name}
          value={value}
          onChange={onChange}
          name={name}
        />
      </label>
    );
  }
  return <span>Hello</span>;
}
