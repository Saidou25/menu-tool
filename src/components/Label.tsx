import "./Label.css";

interface LabelProps {
  title?: string;
  label?: string;
  htmlFor?: string;
  fadeInOut: boolean;
}
export default function Label({ title, label, htmlFor, fadeInOut }: LabelProps) {

  return (
    <label
      className={fadeInOut ? "label-fade-in" : "label-fade-out"}
      htmlFor={htmlFor}
    >
      {title ? <h4 className="label-title">{title}</h4> : <span>{label}</span>}
    </label>
  );
}
