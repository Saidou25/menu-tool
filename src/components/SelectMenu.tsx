import "./SelectMenu.css";

type SelectMenuProps = {
  selectMenuFunc: (menu: string) => void;
};
export default function SelectMenu({ selectMenuFunc }: SelectMenuProps) {
  const menuList = ["Dinner", "Desert"]; // Dropdown menu items

  return (
      <div className="container-select-menu">
        <h4>Select the menu you would like to work with</h4>

        <br />
        <div className="btn-group">
          <button type="button" className="btn btn-danger">
            view available menus
          </button>
          <button
            type="button"
            className="btn btn-danger dropdown-toggle dropdown-toggle-split"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            {menuList.map((item, index) => (
              <li key={index}>
                <button
                  className="dropdown-item"
                  onClick={() => selectMenuFunc(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}
