import "./SmallTittles.css";

interface SmallTittlesProps {
  label: string;
}
export default function SmallTittles({ label }: SmallTittlesProps) {
  return <span className="small-titles">{label}</span>;
}
