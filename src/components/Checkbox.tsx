import "./Checbox.css";

type CheckboxProps = {
    className: string;
    id?: string;
    // type: string;
    onChange: () => void;
    checked: boolean;
    name?: string;
}

export default function Checkbox({ className, id, onChange, checked, name }: CheckboxProps) {
 
  return (
    <input
    className={className
    }
    id={id}
    type="checkbox"
    onChange={onChange}
    checked={checked}
    name={name}
  />
  )
}
