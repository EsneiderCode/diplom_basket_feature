import { ThrowType } from "../../Interfaces";
import "./throwresult.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  nextThrow: React.Dispatch<React.SetStateAction<boolean>>;
  throwTypeOptions: ThrowType[];
  setThrowTypeChoosen: React.Dispatch<React.SetStateAction<ThrowType>>;
  handleSubmitAction: () => void;
}

export default function ThrowResult(props: Props) {
  const {
    display,
    toggle,
    nextThrow,
    throwTypeOptions,
    setThrowTypeChoosen,
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
        <p className="category-title">Результат броска</p>
        <ul className="type-results-ul">
          {throwTypeOptions.map((throwType: ThrowType) => {
            return (
              <>
                <li
                  onClick={() => {
                    toggle();
                    if (throwType.abbreviate === "miss") {
                      handleSubmitAction();
                    } else {
                      nextThrow(true);
                      setThrowTypeChoosen(throwType);
                    }
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
