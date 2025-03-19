import "./Footer.css";

type FooterProps = {
  marginTop: number;
  color: string;
};
export default function Footer({ marginTop, color }: FooterProps) {
  return (
    <div
      className="footer-container print"
      style={{ marginTop: `${marginTop}px`, color: color }}
    >
      <span className="footer-text">*SMC = super melty cheese</span>
      <span className="footer-text">
        LTOP = lettuce, tomato, onion + pickle
      </span>
      <span className="guy-fieri">#GuyFieriCherokee</span>
      <span className="footer-text">
        *Consuming raw or unddercooked meat, poultry, seafood or eggs may
        increase your risk of foodborne illness, especially in cases of certain
        medical conditions and pregnancies.
      </span>
      {/* <span className="footer-text">
        For parties of 6 or more, an automatic gratuity of 20% will be added.
      </span> */}
    </div>
  );
}
