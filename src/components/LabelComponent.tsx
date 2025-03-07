// import React from "react";

// type LabelProps = {
//   displayLabels: { label: string; subLabels: string[] | null }[];
//   showColorInputs: boolean;
//   setShowColorInputs: (value: boolean) => void;
//   showDecorationCheckboxes: boolean;
//   setShowDecorationCheckboxes: (value: boolean) => void;
//   showJoinInputs: boolean;
//   setShowJoinInputs: (value: boolean) => void;
//   setHidePrices: (value: boolean) => void;
//   hidePrices: boolean;
// };

// const LabelComponent: React.FC<LabelProps> = ({
//   displayLabels,
//   showColorInputs,
//   setShowColorInputs,
//   showDecorationCheckboxes,
//   setShowDecorationCheckboxes,
//   showJoinInputs,
//   setShowJoinInputs,
//   setHidePrices,
//   hidePrices,
// }) => {
//   return (
//     <div>
//       {displayLabels.map((displayLabel, index) => (
//         <div
//           key={displayLabel.label}
//           className={
//             index === 0 || index === 10 || index === 13 || index === 17
//               ? ""
//               : "label-container"
//           }
//         >
//           <b>{displayLabel.label}: </b>

//           {displayLabel.label === "Colors" && (
//             <div className="ps-4">
//               <input
//                 type="checkbox"
//                 checked={showColorInputs}
//                 onChange={() => setShowColorInputs(!showColorInputs)}
//               />
//               &nbsp; Check if you want to show color inputs
//             </div>
//           )}

//           {displayLabel.subLabels &&
//             displayLabel.subLabels.map((item, subIndex) => (
//               <ul className="line" key={subIndex}>
//                 <li className="li ps-4 d-flex align-items-center">
//                   <span>{item}&nbsp;</span>
//                 </li>
//               </ul>
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LabelComponent;
