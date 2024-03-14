import "./finishgame.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  back: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FinishGame(props: Props) {
  const { display, toggle, back } = props;

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <p className="category-title">Завершить игру?</p>
        <ul className="type-results-finish-ul">
          <li
            onClick={() => {
              toggle();
              back(true);
            }}
            className="attack-type"
          >
            Отменить
          </li>
          <li
            onClick={() => {
              toggle();
            }}
            className="attack-type"
          >
            Завершить
          </li>
        </ul>
      </div>
    </div>
  );
}
