import { saladList } from "../data/salads";

export default function Sharables() {
  const { fields, title } = saladList;
  return (
    <div>
      {fields &&
        fields.map((salad, index) => (
          <div className="salad" key={index}>
            <span className="salad-span">{title}</span>
            <span className="salad-span">{salad.description}</span>
            <span className="salad-span">{salad.price}</span>
          </div>
        ))}
    </div>
  );
}
