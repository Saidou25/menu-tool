import { useAppState } from "../hooks/useAppState";
import Button from "./Button";

import "./PreviewMenu.css";

type LayoutToolsProps = {
  message: string;
};

export default function PreviewTool({ message }: LayoutToolsProps) {
  const { setMenuPreview } = useAppState();

  const handleGoBack = () => {
    setMenuPreview(false);
  };

  return (
    <div className="final-step-div no-print">
      <h2 className="confirm-title">Preview Tool</h2>
      <br className="no-print" />
      <p className="confirm-text no-print">{message}</p>
      <br className="no-print" />
      <div className="row no-print">
        <Button
          className="col-6 btn"
          onClick={handleGoBack}
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
