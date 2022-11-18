import "./throwresult.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  nextThrow: React.Dispatch<React.SetStateAction<boolean>>;
  next: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ThrowResult(props: Props) {
  const { display, toggle, nextThrow, next } = props;

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
          <li
            onClick={() => {
              toggle();
              nextThrow(true);
            }}
            className="attack-type"
          >
            Попадание
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            Промах
          </li>
        </ul>
      </div>
    </div>
  );
}
