import "./PreviewMenu.css";

type FinalStepsProps = {
  message: string;
  goBack: () => void;
  onConfirm: () => void;
};

export default function FinalStep({
  message,
  goBack,
  onConfirm,
}: FinalStepsProps) {
  return (
    <div className="final-step-div no-print">
      <h2 className="confirm-title">Final step</h2>
      <br className="no-print" />
      <p className="confirm-text no-print">{message}</p>
      <br className="no-print" />
      <div className="row no-print">
        <button className="col-6 button" onClick={goBack} type="button">
          Edit
        </button>
        <button className="col-6 button" onClick={onConfirm} type="button">
          Print
        </button>
      </div>
    </div>
  );
}
