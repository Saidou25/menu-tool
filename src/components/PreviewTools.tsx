import "./PreviewTools.css";

type StyleFormType = {
  pagePaddingTopAndBottom: number;
  pagePaddingLeftAndRight: number;
};

type PreviewToolsProps = {
    styleForm: StyleFormType; 
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
};

export default function PreviewTools({ styleForm,setStyleForm }: PreviewToolsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Create a mapping for the input names to the state keys
    const keyMap: { [key: string]: keyof typeof styleForm } = {
      "padding top and bottom": "pagePaddingTopAndBottom",
      "padding left and right": "pagePaddingLeftAndRight",
    };

    // Update the state using the mapped key
    const keyToUpdate = keyMap[name as keyof typeof keyMap];
    if (keyToUpdate) {
      setStyleForm((prevState) => ({
        ...prevState,
        [keyToUpdate]: value,
      }));
    }
  };

  const displayLabels = [
    {
      label: "Page padding",
      subLabels: ["padding top and bottom", "padding left and right"],
    },
    {
      label: "Texts",
      subLabels: ["category", "item", "description"],
    },
  ];

  return (
    <div className="preview-tools-main">
      <div className="preview-tools-container">
        <h3 className="title">Preview tools</h3>
        {displayLabels.map((item) => (
          <div key={item.label} className="label-container">
            <span>{item.label}: </span>
            {item.subLabels.map((item) => (
              <ul className="line" key={item}>
                <li className="li">{item}</li>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  name={item}
                  onChange={handleChange}
                />
              </ul>
            ))}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
