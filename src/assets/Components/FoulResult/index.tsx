import { FoulOption } from "../../Interfaces";
import "../ResultAttack/resultattack.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  nextOneThrow: React.Dispatch<React.SetStateAction<boolean>>;
  nextTwoThrow: React.Dispatch<React.SetStateAction<boolean>>;
  nextThreeThrow: React.Dispatch<React.SetStateAction<boolean>>;
  foulOptions: FoulOption[];
  setFoulOptionChoosen: React.Dispatch<React.SetStateAction<FoulOption>>;
  handleSubmitAction: () => void;
}

export default function FoulResult(props: Props) {
  const {
    display,
    toggle,
    back,
    nextOneThrow,
    nextTwoThrow,
    nextThreeThrow,
    foulOptions,
    setFoulOptionChoosen,
    handleSubmitAction,
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
                case "SHOT_1":
                  nextOneThrow(true);
                  break;
                case "SHOT_2":
                  nextTwoThrow(true);
                  break;
                case "SHOT_3":
                  nextThreeThrow(true);
                  break;
                case "NOT_PUNCHY":
                  handleSubmitAction();
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
