import { ResultAttackI } from "../../Interfaces";
import "./resultattack.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  nextFoul: React.Dispatch<React.SetStateAction<boolean>>;
  nextCompletion: React.Dispatch<React.SetStateAction<boolean>>;
  nextLoss: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  setResultAttackChoosen: React.Dispatch<React.SetStateAction<ResultAttackI>>;
  resultAttackOptions: ResultAttackI[];
}

export default function ResultAttack(props: Props) {
  const {
    display,
    toggle,
    nextFoul,
    nextCompletion,
    nextLoss,
    back,
    resultAttackOptions,
    setResultAttackChoosen,
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
        <p className="category-title">Результат</p>
        <ul className="type-results-ul">
          {resultAttackOptions.map((resultAttack: ResultAttackI) => {
            return (
              <>
                <li
                  onClick={() => {
                    toggle();
                    setResultAttackChoosen(resultAttack);
                    resultAttack.id === 0
                      ? nextFoul(true)
                      : resultAttack.id === 1
                      ? nextCompletion(true)
                      : nextLoss(true);
                  }}
                  key={resultAttack.id}
                  className="attack-type"
                >
                  {resultAttack.description}
                </li>
              </>
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
