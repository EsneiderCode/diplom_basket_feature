import { ThrowType } from "../../Interfaces";
import "./throwresult.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  nextThrow: React.Dispatch<React.SetStateAction<boolean>>;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  throwTypeOptions: ThrowType[];
  setThrowTypeChoosen: React.Dispatch<React.SetStateAction<ThrowType>>;
}

export default function ThrowResult(props: Props) {
  const {
    display,
    toggle,
    nextThrow,
    next,
    throwTypeOptions,
    setThrowTypeChoosen,
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
        <p className="category-title">Результат броска</p>
        <ul className="type-results-ul">
          {throwTypeOptions.map((throwType: ThrowType) => {
            return (
              <>
                <li
                  onClick={() => {
                    toggle();
                    nextThrow(true);
                    setThrowTypeChoosen(throwType);
                  }}
                  className="attack-type"
                  key={throwType.id}
                >
                  {throwType.description}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
