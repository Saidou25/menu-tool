import { useEffect, useState } from "react";
import { Field, StyleFormType } from "../data/types";

import FrontMenu from "./FrontMenu";
import BackMenu from "./BackMenu"; // Import BackMenu component
import CustomMenu from "./CustomMenu";

import "./PreviewMenu.css";

type ModalProps = {
  custom: boolean;
  showJoinInputs: boolean;
  setShowJoinInputs: (item: boolean) => void;
  showColorInputs: boolean;
  showFinalStep: boolean;
  children: React.ReactNode[];
  showDisclaimer: boolean;
  message: string;
  onConfirm: () => void;
  goBack: () => void;
  dataSample: Record<string, { subtitle?: string; items: Field[] }>;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
};

const PreviewMenu = ({
  custom,
  showJoinInputs,
  showColorInputs,
  showFinalStep,
  children,
  showDisclaimer,
  dataSample,
  styleForm,
  setStyleForm,
}: // setStyleForm,
ModalProps) => {
  const [organizedData, setOrganizedData] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});

  const categoryOrder = Object.keys(dataSample).includes("Sharables")
    ? [
        "Sharables",
        "Ain't no thing butta chicken wing...",
        "Salads",
        "Soups",
        "Signature sandwiches",
        "Big bite burgers",
        "Big eats",
        "Sides",
      ]
    : Object.keys(dataSample);

  useEffect(() => {
    const orderedData: Record<string, { subtitle?: string; items: Field[] }> =
      {};
    categoryOrder.forEach((category) => {
      if (dataSample[category]) {
        orderedData[category] = dataSample[category]; // Keep the new structure (subtitle + items)
      }
    });

    // Only set state if orderedData has changed
    if (JSON.stringify(orderedData) !== JSON.stringify(organizedData)) {
      setOrganizedData(orderedData);
    }
  }, [dataSample, categoryOrder, organizedData]); // Include organizedData in dependencies for comparison

  // Split the categories into two parts
  const firstCategories = categoryOrder.slice(0, 5);
  const extraCategories = categoryOrder.slice(5);

  // Define secondPageData based on categories with data
  const secondPageData: Record<string, { subtitle?: string; items: Field[] }> =
    {};
  extraCategories.forEach((category) => {
    if (organizedData[category]?.items.length > 0) {
      secondPageData[category] = organizedData[category]; // Keep the new structure
    }
  });

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
    <>
      <div className="container-final-step no-print">
        {/* <style>{animation}</style> */}
        <div
          className={`${
            showFinalStep ? "final-step-show" : "final-step-hidden"
          }`}
          // style={{ animation: "menuSizeAnimation 0.5s linear forwards" }} 
        >
          {children[0]} {/* Renders FinalStep*/}
          {/* <br className="no-print" /> */}
          {Object.keys(secondPageData).length > 0 && !custom && (
            <h3 className="no-print">Menu front</h3>
          )}
          {/* <br className="no-print" /> */}
          {custom ? (
            <>
              <CustomMenu categoryOrder={categoryOrder} organizedData={organizedData} 
              styleForm={styleForm}
              setStyleForm={setStyleForm}
              showColorInputs={showColorInputs}
              showJoinInputs={showJoinInputs}
              showDisclaimer={showDisclaimer}
              />
            </>
          ) : (
            <>
              {/* Render the first set of categories: Front menu */}
              <FrontMenu
                // animation={animation}
                categoryOrder={firstCategories}
                styleForm={styleForm}
                organizedData={organizedData}
                showDisclaimer={showDisclaimer}
                setStyleForm={setStyleForm}
                showColorInputs={showColorInputs}
              />
              {/* Render BackMenu only if there are additional categories */}
              {Object.keys(secondPageData).length > 0 && (
                <BackMenu
                  styleForm={styleForm}
                  categoryOrder={extraCategories}
                  secondPageData={secondPageData}
                  showDisclaimer={showDisclaimer}
                />
              )}
            </>
          )}
        </div>
        <div className="tool-section no-print">
          {children[1]} {/* Renders dropdown*/}
          {children[2]} {/* Renders preview tools*/}
        </div>
      </div>
    </>
  );
};

export default PreviewMenu;
