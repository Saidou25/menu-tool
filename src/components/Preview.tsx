import { Field } from "../data/sharables";
import Button from "./Button";
import "./Preview.css";

type Props = {
  selectedWings?: Field[];
  selectedSharables?: Field[];
  selectedSalads?: Field[];
  selectedSoups?: Field[];
  goBack: () => void;
};

export default function Preview({
  selectedSharables,
  selectedWings,
  selectedSalads,
  selectedSoups,
  goBack,
}: Props) {
  return (
    <>
      {selectedSharables?.length ? (
        <div className="sharables-container">
          <h2>Sharables</h2>
          <div className="row sharables-row">
            {selectedSharables.map((selectedSharable) => (
              <div className="row sharables-row" key={selectedSharable.label}>
                <p className="col-12">{selectedSharable.label}:</p>
                <div className="col-12">
                  <span>{selectedSharable.description}</span>
                  <span>
                    {" "}
                    ${selectedSharable.price?.value?.toFixed(2) ?? "N/A"}
                  </span>{" "}
                  {/* Render updated price */}
                  <br />
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {selectedWings?.length ? (
        <div className="sharables-container">
          <h2>Ain't no thing butta chicken wing...</h2>
          <div className="row sharables-row">
            {selectedWings?.map((selectedWing) => (
              <div className="row sharables-row" key={selectedWing.label}>
                <p className="col-12">{selectedWing.label}:</p>
                <div className="col-12">
                  <span>{selectedWing.description}</span>
                  <span>
                    {" "}
                    ${selectedWing.price?.value?.toFixed(2) ?? "N/A"}
                  </span>{" "}
                  {/* Render updated price */}
                  <br />
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {selectedSalads?.length ? (
        <div className="sharables-container">
          <h2>Salads</h2>
          <div className="row sharables-row">
            {selectedSalads?.map((selectedSalad) => (
              <div className="row sharables-row" key={selectedSalad.label}>
                <p className="col-12">{selectedSalad.label}:</p>
                <div className="col-12">
                  <span>{selectedSalad.description}</span>
                  <span>
                    {" "}
                    ${selectedSalad.price?.value?.toFixed(2) ?? "N/A"}
                  </span>{" "}
                  {/* Render updated price */}
                  <br />
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {selectedSoups?.length ? (
        <div className="sharables-container">
          <h2>Soups</h2>
          <div className="row sharables-row">
            {selectedSoups?.map((selectedSoup) => (
              <div className="row sharables-row" key={selectedSoup.label}>
                <p className="col-12">{selectedSoup.label}:</p>
                <div className="col-12">
                  <span>{selectedSoup.description}</span>
                  <span>
                    {" "}
                    ${selectedSoup.price?.value?.toFixed(2) ?? "N/A"}
                  </span>{" "}
                  {/* Render updated price */}
                  <br />
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {/* </div> */}
      <Button type="button" onClick={goBack}>
        Edit
      </Button>
      {/* </div> */}
    </>
  );
}
