import { useState } from "react";
import { validateTeamName, validateTeamNameHandler } from "../../Functions";
import "./popupcreateteam.scss";
interface PopUpProps {
  display: boolean;
  toggleDisplay: () => void;
  next?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUpCreateTeam(props: PopUpProps) {
  const { display, toggleDisplay } = props;

  const [teamName, setTeamName] = useState<string>("");
  const [teamNameError, setTeamNameError] = useState<boolean>(false);

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container">
        <span className="popup-close-icon" onClick={() => toggleDisplay()}>
          &#x2715;
        </span>
        <h2 className="popup-title">Новая команда</h2>
        <form action="" className="popup-form">
          <div className="input-container">
            <input
              type="text"
              name="team_name"
              id="team_name"
              placeholder="Название"
              className={
                teamNameError === false && teamName.length >= 1
                  ? "input-basic team-name input-active"
                  : teamNameError === true
                  ? "input-basic team-name input-error"
                  : "input-basic team-name input-inactive"
              }
              onBlur={(e) => validateTeamName(e, setTeamNameError)}
              onChange={(e) => {
                validateTeamNameHandler(e, setTeamName, setTeamNameError);
              }}
            />
            <span
              className={
                teamNameError === true
                  ? "format-invalid-open"
                  : "format-invalid-closed"
              }
            >
              *Неверный формат
            </span>
          </div>

          <button type="button" className="button-continue">
            Далее
          </button>
        </form>
      </div>
    </div>
  );
}
