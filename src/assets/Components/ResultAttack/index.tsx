import "./resultattack.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  nextFoul: React.Dispatch<React.SetStateAction<boolean>>;
  nextCompletion: React.Dispatch<React.SetStateAction<boolean>>;
  nextLoss: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResultAttack(props: Props) {
  const { display, toggle, nextFoul, nextCompletion, nextLoss, back } = props;

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
          <li
            onClick={() => {
              toggle();
              nextFoul(true);
            }}
            className="attack-type"
          >
            Фол
          </li>
          <li
            onClick={() => {
              toggle();
              nextCompletion(true);
            }}
            className="attack-type"
          >
            Бросок
          </li>
          <li
            onClick={() => {
              toggle();
              nextLoss(true);
            }}
            className="attack-type"
          >
            Потеря
          </li>
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
