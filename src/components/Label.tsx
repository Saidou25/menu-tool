import "./Label.css";

interface LabelProps {
  label: string;
  htmlFor: string;
  fadeInOut: boolean;
}
export default function Label({ label, htmlFor, fadeInOut }: LabelProps) {
  return (
    <label
      className={fadeInOut ? "label-fade-in" : "label-fade-out"}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}
