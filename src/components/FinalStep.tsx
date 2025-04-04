import Button from "./Button";
import "./PreviewMenu.css";

type FinalStepsProps = {
  view: boolean;
  // setView: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  goBack: () => void;
  // onConfirm: () => void;
};

export default function FinalStep({
  // setView,
  // view,
  message,
  goBack,
  // onConfirm,
}: FinalStepsProps) {
  return (
    <div className="final-step-div no-print">
      <h2 className="confirm-title">Final step</h2>
      <br className="no-print" />
      <p className="confirm-text no-print">{message}</p>
      <br className="no-print" />
      <div className="row no-print">
        <Button className="col-6 btn" onClick={goBack} type="button" printEdit="true">
          Edit
        </Button>
        {/* <button className="col-6 button" onClick={() => setView((prev: boolean) => !prev)} type="button">
          Preview
        </button> */}
        <Button className="col-6 btn" onClick={() => window.print()} type="button" printEdit="true">
          Print
        </Button>
      </div>
      <br />
      <br />
    </div>
  );
}
