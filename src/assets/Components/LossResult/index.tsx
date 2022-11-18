import "../ResultAttack/resultattack.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LossResult(props: Props) {
  const { display, toggle, next, back } = props;

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
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            Пас-потеря
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            Техническая потеря
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            Фол в нападении
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            Тактическая потеря
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
