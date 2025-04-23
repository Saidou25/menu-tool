import { Field } from "../data/types";
import { useAppState } from "../hooks/useAppState";

import CategoriesMenu from "./CategoriesMenu";
import CustomCategoriesMenu from "./CustomCategoriesMenu";

import "./PreviewMenu.css";

type ModalProps = {
  children: React.ReactNode[];
  dataSample: Record<string, { subtitle?: string; items: Field[] }>;
};

const PreviewMenu = ({ children, dataSample }: ModalProps) => {

  const { newCustomArray, custom, showPreviewTool } = useAppState();

  //   const animation = `
  //   @keyframes menuSizeAnimation {
  //     from {
  //       width: 0;
  //       height: 0;
  //     }
  //     to {
  //       width: ${styleForm.menuWidth}mm;
  //       height: 100%;
  //     }
  //   }
  // `;

  return (
    // <>
    <div className="container-final-step">
      {/* <style>{animation}</style> */}
      <div
        className={`${
          showPreviewTool ? "final-step-show" : "final-step-hidden"
        }`}
        // style={{ animation: "menuSizeAnimation 0.5s linear forwards" }}
      >
        {children[0]} {/* Renders preview tool*/}
        {custom && newCustomArray.length ? (
          <CustomCategoriesMenu />
        ) : (
          <CategoriesMenu organizedData={dataSample} />
        )}
      </div>
      <div className="tool-section no-print">
        {children[1]} {/* Renders format dropdown*/}
        {children[2]} {/* Renders layout tools*/}
      </div>
    </div>
  );
};

export default PreviewMenu;
