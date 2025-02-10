import { soupList } from "../data/soups";

export default function Sharables() {
  const { fields, title } = soupList;
  return (
    <div>
      {fields &&
        fields.map((soup, index) => (
          <div className="soup" key={index}>
            <span className="soup-span">{title}</span>
            <span className="soup-span">{soup.description}</span>
            <span className="soup-span">{soup.price}</span>
          </div>
        ))}
    </div>
  );
}
