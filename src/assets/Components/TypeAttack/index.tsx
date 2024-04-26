import { AttackType } from "../../Interfaces";
import "../AttackStart/attackstart.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  attackTypeOptions: AttackType[];
  setAttackTypeChoosen: React.Dispatch<React.SetStateAction<AttackType>>;
}

export default function TypeAttack(props: Props) {
  const {
    display,
    toggle,
    next,
    back,
    attackTypeOptions,
    setAttackTypeChoosen,
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
          {attackTypeOptions.map((attacktype: AttackType) => {
            return (
              <li
                onClick={() => {
                  toggle();
                  next(true);
                  setAttackTypeChoosen(attacktype);
                }}
                className="attack-type"
                key={attacktype.id}
              >
                {attacktype.description}
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
