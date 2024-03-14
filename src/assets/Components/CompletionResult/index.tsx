import { PlayType } from "../../Interfaces";
import "./completionresult.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  getPlayType: PlayType[];
  setPlayTypeChoosen: React.Dispatch<React.SetStateAction<PlayType>>;
}

export default function CompletionResult(props: Props) {
  const { display, toggle, next, back, getPlayType, setPlayTypeChoosen } =
    props;

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <p className="category-title">Способ завершения</p>
        <ul className="type-results-completion-ul">
          {getPlayType.map((playtype: PlayType) => {
            return (
              <li
                onClick={() => {
                  toggle();
                  next(true);
                  setPlayTypeChoosen(playtype);
                }}
                className="attack-type"
                key={playtype.id}
              >
                {playtype.description}
              </li>
            );
          })}
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
