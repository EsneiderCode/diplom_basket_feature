import "./teamfoul.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TeamFoul(props: Props) {
  const { display, toggle, next } = props;

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <p className="category-title">Какой команде фол</p>
        <ul className="type-results-ul">
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            Химки
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            ЦСКА
          </li>
        </ul>
      </div>
    </div>
  );
}
