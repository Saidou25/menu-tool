import { WiStars } from "react-icons/wi";
import Logo from "./Logo";
import DropDown from "./DropDown";
import { useAppState } from "../hooks/useAppState";

export default function LandingPage() {
  const { showDropown, setShowDropdown, setSelectedMenu } = useAppState();
  return (
    <div className="row tool-container g-0">
      <Logo
        className="spotlight"
        h1ClassName="menu-tool"
        title="Menu tool"
        subtitle="Building menus made easy"
      />
      <div className="col-6 just-click-button">
        <WiStars className="stars1" />
        <h2 className="just-click">
          "Quickly build your menu with just a few clicks"
        </h2>
      </div>
      <WiStars className="stars2" />
      {!showDropown && (
        <div className="button-start">
          <button
            className="start"
            type="button"
            onClick={() => setShowDropdown(true)}
          >
            Start
          </button>
        </div>
      )}
      {showDropown && (
        <div className="dropDown-div">
          <DropDown
            message="menus"
            selectDropDownItem={setSelectedMenu}
            width="30"
          />
        </div>
      )}
      <WiStars className="stars3" />
    </div>
  );
}
