import { useEffect, useState } from "react";
import { Field, StyleFormType } from "../data/types";

import FrontMenu from "./FrontMenu";
import BackMenu from "./BackMenu"; // Import BackMenu component

import "./PreviewMenu.css";

type ModalProps = {
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
  children,
  showDisclaimer,
  dataSample,
  styleForm,
  // setStyleForm,
}: ModalProps) => {
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

  return (
    <div className="container-final-step">
      <div className="menu-section">
        {children[0]} {/* Renders FinalStep*/}
        {/* <br className="no-print" /> */}
        {Object.keys(secondPageData).length > 0 && (
          <h3 className="no-print">Menu front</h3>
        )}
        {/* <br className="no-print" /> */}
        {/* Render the first set of categories: Front menu */}
        <FrontMenu
          categoryOrder={firstCategories}
          styleForm={styleForm}
          organizedData={organizedData}
          showDisclaimer={showDisclaimer}
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
      </div>
      <div className="tool-section">
        {children[1]} {/* Renders MenuTools*/}
        {children[2]} {/* Renders MenuTools*/}
      </div>
    </div>
  );
};

export default PreviewMenu;
