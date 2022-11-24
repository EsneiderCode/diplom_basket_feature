import { FoulOption } from "../../Interfaces";
import "../ResultAttack/resultattack.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  nextEnd: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  nextOneThrow: React.Dispatch<React.SetStateAction<boolean>>;
  nextTwoThrow: React.Dispatch<React.SetStateAction<boolean>>;
  nextThreeThrow: React.Dispatch<React.SetStateAction<boolean>>;
  nextTeamFoul: React.Dispatch<React.SetStateAction<boolean>>;
  getFoulOptions: FoulOption[];
  setFoulOptionChoosen: React.Dispatch<React.SetStateAction<FoulOption>>;
}

export default function FoulResult(props: Props) {
  const {
    display,
    toggle,
    nextEnd,
    back,
    nextOneThrow,
    nextTwoThrow,
    nextThreeThrow,
    nextTeamFoul,
    getFoulOptions,
    setFoulOptionChoosen,
  } = props;

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <p className="category-title">Фол</p>
        <ul className="type-results-ul">
          <li
            onClick={() => {
              toggle();
              nextOneThrow(true);
              const fouloption = getFoulOptions.find(
                ({ abbreviate }) => abbreviate === "f1"
              );
              if (fouloption != null) setFoulOptionChoosen(fouloption);
            }}
            className="attack-type"
          >
            1 бросок
          </li>
          <li
            onClick={() => {
              toggle();
              nextTwoThrow(true);
              const fouloption = getFoulOptions.find(
                ({ abbreviate }) => abbreviate === "f2"
              );
              if (fouloption != null) setFoulOptionChoosen(fouloption);
            }}
            className="attack-type"
          >
            2 броска
          </li>
          <li
            onClick={() => {
              toggle();
              nextThreeThrow(true);
              const fouloption = getFoulOptions.find(
                ({ abbreviate }) => abbreviate === "f3"
              );
              if (fouloption != null) setFoulOptionChoosen(fouloption);
            }}
            className="attack-type"
          >
            3 броска
          </li>
          <li
            onClick={() => {
              toggle();
              nextEnd(true);
              const fouloption = getFoulOptions.find(
                ({ abbreviate }) => abbreviate === "f"
              );
              if (fouloption != null) setFoulOptionChoosen(fouloption);
            }}
            className="attack-type"
          >
            непробивной
          </li>
          {/* <li
            onClick={() => {
              toggle();
              nextTeamFoul(true);
            }}
            className="attack-type"
          >
            технический
          </li>
          <li
            onClick={() => {
              toggle();
              nextTeamFoul(true);
            }}
            className="attack-type"
          >
            против зоны
          </li> */}
        </ul>
        <button
          className="back-button"
          onClick={() => {
            toggle();
            back(true);
          }}
        >
          &#8592;
        </button>
      </div>
    </div>
  );
}
