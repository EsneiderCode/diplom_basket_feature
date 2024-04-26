import { LossOption } from "../../Interfaces";
import "../ResultAttack/resultattack.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  lossOptions: LossOption[];
  setLossOptionChoosen: React.Dispatch<React.SetStateAction<LossOption>>;
}

export default function LossResult(props: Props) {
  const { display, toggle, next, back, lossOptions, setLossOptionChoosen } =
    props;

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <p className="category-title">Потеря</p>
        <ul className="type-results-ul">
          {lossOptions.map((lossoption: LossOption) => {
            return (
              <li
                onClick={() => {
                  toggle();
                  next(true);
                  setLossOptionChoosen(lossoption);
                }}
                className="attack-type"
                key={lossoption.id}
              >
                {lossoption.description}
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
