import "../AttackStart/attackstart.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TypeAttack(props: Props) {
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
        <p className="category-title">Начало атаки</p>
        <ul className="type-attacks-ul">
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            быстрый отрыв
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            раннее нападение
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            атака 2 шанса
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            позиционное нападение
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            против прессинга
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            против зоны
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
