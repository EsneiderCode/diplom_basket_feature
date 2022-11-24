import "./attackstart.scss";
import { StartAttack } from "../../Interfaces";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  setAttackBeginning: React.Dispatch<React.SetStateAction<StartAttack>>;
  startAttack: StartAttack[];
}

export default function AttackStart(props: Props) {
  const { display, toggle, next, back, setAttackBeginning, startAttack } =
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
        <p className="category-title">Начало атаки</p>
        <ul className="type-attacks-ul">
          {startAttack.map((el: StartAttack) => {
            return (
              <li
                onClick={() => {
                  toggle();
                  next(true);
                  setAttackBeginning(el);
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
