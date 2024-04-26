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
  foulOptions: FoulOption[];
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
    foulOptions,
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
          {foulOptions.map((foulOption) => {
            const handleFoulOptionClick = () => {
              toggle();
              setFoulOptionChoosen(foulOption);
              switch (foulOption.abbreviate) {
                case "one_shot":
                  nextOneThrow(true);
                  break;
                case "two_shots":
                  nextTwoThrow(true);
                  break;
                case "three_shots":
                  nextThreeThrow(true);
                  break;
                case "unblocked":
                  console.log("Yes");
                  break;
                default:
                  break;
              }
            };

            return (
              <li
                key={foulOption.id}
                onClick={handleFoulOptionClick}
                className="attack-type"
              >
                {foulOption.description}
              </li>
            );
          })}
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
