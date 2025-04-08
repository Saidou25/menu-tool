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
  value?: string | number;
  placeholder?: string;
  min?: number | string;
};

export default function Input({
  placeholder,
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
      <div className="inputs-container">
        <input
          className={
            className?.includes("input-bar") ? `${className}-bar` : className
          }
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
        className={className !== "tools" && value !== "#000000" ? "menu-color-inputs" : ""}
        htmlFor={name}
        style={{
          backgroundColor: className === "tools" ? `${value}` : "#000000",
          width: className === "tools" ?"16%" : "25px",
          height: className === "tools" ? "2%" : "25px",
          border: "1px solid #ddd",
          marginBottom: className === "tools" ? "3px" : "0",
        }}
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
  if (type === "number") {
    return (
      <label className={className} htmlFor={htmlFor}>
        <input
          className="inputs"
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
        />
      </label>
    );
  }
  if (type === "text") {
    return (
      <label className={className} htmlFor={htmlFor}>
        <input
          className={className}
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          name={name}
          placeholder="enter text..."
        />
      </label>
    );
  }
  if (type === "file") {
    return (
      <label className={className} htmlFor={htmlFor}>
        <input
          hidden
          accept="image/*"
          className="inputs"
          type="file"
          id={id}
          value={value}
          onChange={onChange}
          name={name}
        />
      </label>
    );
  }
  return <span>Hello</span>;
}
