import "./Preview.css";

type Props = {
  selectedSharables: {
    label: string;
    dataLabel: string;
    description: string;
    type: string;
    price: number;
  }[];
};

export default function Preview({ selectedSharables }: Props) {
  console.log(selectedSharables);
  return (
    <div className="sharables-container">
      {/* <div className="row sharables-row"> */}
      {selectedSharables &&
        selectedSharables.map((selectedSharable, index) => (
          <div className="row sharables-row" key={index}>
            <p className="col-12">{selectedSharable.label}:</p>
            <div className="col-12">
              <span>{selectedSharable.description}</span>
              <span> ${selectedSharable.price}</span>
              <br />
              <br />
            </div>
          </div>
        ))}
    </div>
    // </div>
  );
}
