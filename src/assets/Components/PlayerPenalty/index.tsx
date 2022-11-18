import "./playerpenalty.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlayerPenalty(props: Props) {
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
        <p className="category-title">Игрок на штрафной</p>
        <ul className="type-player-penalty-ul">
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            1
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            2
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            3
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            4
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            5
          </li>
        </ul>
      </div>
    </div>
  );
}
