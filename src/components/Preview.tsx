import Button from "./Button";
import "./Preview.css";

type Props = {
  goBack: () => void;
};

export default function Preview({ goBack }: Props) {
  return (
    <>
      Preview
      <Button type="button" onClick={goBack}>
        Edit
      </Button>
    </>
  );
}
