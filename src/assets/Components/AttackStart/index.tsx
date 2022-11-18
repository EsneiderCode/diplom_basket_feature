import "./attackstart.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AttackStart(props: Props) {
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
            подбор в защите
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            перехват
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            после забитого живой мяч
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            ввод мертвого мяча в игру
          </li>
          <li
            onClick={() => {
              toggle();
              next(true);
            }}
            className="attack-type"
          >
            подбор в нападении
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
