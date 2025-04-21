// import { StyleFormType } from "../data/types";
// import { useCategoryBackgroundColor } from "../hooks/useCategoryBackgrounColor";
// import { useCategoryPaddingTop } from "../hooks/useCategoryPaddingTop";
// import { useCategoryMarginTop } from "../hooks/useMarginCategoriesTop";

// type Props = {
//   styleForm: StyleFormType;
//   showDecorations: string;
//   setShowDecorations: (category: string) => void;
//   setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
//   showPaddingCategoriesTop: boolean;
//   showMarginCategoriesTop: boolean;
//   showJoinInputs: boolean;
//   showColorInputs: boolean;
//   showDecorationCheckboxes: boolean;
//   categoryIndex: number;
// };

// export default function Tools({
//   setStyleForm,
//   showPaddingCategoriesTop,
//   showMarginCategoriesTop,
//   showJoinInputs,
//   showColorInputs,
//   showDecorationCheckboxes,
//   categoryIndex,
// }: Props) {
//   const handleCategoryPaddingTop = useCategoryPaddingTop(setStyleForm);
//   const handleCategoryBackgroundColor =
//     useCategoryBackgroundColor(setStyleForm);
//   const handleCategoryMarginTop = useCategoryMarginTop(setStyleForm);

//   return (
//     <div>
//       {showPaddingCategoriesTop && (
//         <input
//           type="number"
//           className="no-print"
//           onChange={(event) =>
//             handleCategoryPaddingTop(+event.target.value, categoryIndex)
//           }
//         />
//       )}
//       &nbsp;
//       {showMarginCategoriesTop && (
//         <input
//           type="number"
//           className="no-print"
//           onChange={(event) =>
//             handleCategoryMarginTop(+event.target.value, categoryIndex)
//           }
//         />
//       )}
//       {showJoinInputs && <input className="custom-input" type="checkbox" />}
//       {showColorInputs && (
//         <>
//           <input
//             type="color"
//             className="no-print"
//             onChange={(event) =>
//               handleCategoryBackgroundColor(event.target.value, categoryIndex)
//             }
//           />
//           <button
//             type="button"
//             onClick={() => handleCategoryBackgroundColor("", categoryIndex)}
//           >
//             reset
//           </button>
//         </>
//       )}
//       {showDecorationCheckboxes && (
//         <input
//           type="checkbox"
//           className="no-print"
//           //   checked={showDecorations === category}
//           //   onChange={() => setShowDecorations(category)}
//         />
//       )}
//     </div>
//   );
// }
