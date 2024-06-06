import "./assist.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  handleSubmitAction: () => void;
  setIsAssist: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Assist(props: Props) {
  const { display, toggle, handleSubmitAction, setIsAssist } = props;

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <p className="category-title">Ассист</p>
        <ul className="type-results-ul">
          <li
            onClick={() => {
              toggle();
              handleSubmitAction();
              setIsAssist(true);
            }}
            className="attack-type"
          >
            Да
          </li>
          <li
            onClick={() => {
              toggle();
              handleSubmitAction();
            }}
            className="attack-type"
          >
            Нет
          </li>
        </ul>
      </div>
    </div>
  );
}
