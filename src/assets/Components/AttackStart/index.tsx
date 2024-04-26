import "./attackstart.scss";
import { StartAttack } from "../../Interfaces";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  startAttackOptions: StartAttack[];
  setStartAttackChoosen: React.Dispatch<React.SetStateAction<StartAttack>>;
}

export default function AttackStart(props: Props) {
  const {
    display,
    toggle,
    next,
    back,
    setStartAttackChoosen,
    startAttackOptions,
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
        <p className="category-title">Начало атаки</p>
        <ul className="type-attacks-ul">
          {startAttackOptions.map((el: StartAttack) => {
            return (
              <li
                onClick={() => {
                  toggle();
                  next(true);
                  setStartAttackChoosen(el);
                }}
                className="attack-type"
                key={el.id}
              >
                {el.description}
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
