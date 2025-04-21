import Button from "./Button";
import "./PreviewMenu.css";

type FinalStepsProps = {
  view: boolean;
  message: string;
  goBack: () => void;
};

export default function FinalStep({ message, goBack }: FinalStepsProps) {
  return (
    <div className="final-step-div no-print">
      <h2 className="confirm-title">Preview Tool</h2>
      <br className="no-print" />
      <p className="confirm-text no-print">{message}</p>
      <br className="no-print" />
      <div className="row no-print">
        <Button
          className="col-6 btn"
          onClick={goBack}
          type="button"
          printEdit="true"
        >
          Edit
        </Button>
        <Button
          className="col-6 btn"
          onClick={() => window.print()}
          type="button"
          printEdit="true"
        >
          Print
        </Button>
      </div>
      <br />
      <br />
    </div>
  );
}
