import { useState } from "react";
import { User } from "../../Interfaces";
import { validateTeamName, validateTeamNameHandler } from "../../Functions";
import axios from "axios";
import "./popupcreateteam.scss";

interface PopUpProps {
  display: boolean;
  toggleDisplay: () => void;
  next?: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  getTeams: () => void;
}

export default function PopUpCreateTeam(props: PopUpProps) {
  const { display, toggleDisplay, user, getTeams } = props;
  const [teamName, setTeamName] = useState<string>("");
  const [teamNameError, setTeamNameError] = useState<boolean>(false);

  const createTeam = async (user: User) => {
    if (teamNameError === false && teamName !== "") {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/teams/create/${user.id}`,
          {
            name: teamName,
          }
        );
        if (res.status === 200) {
          getTeams();
          setTeamName("");
          toggleDisplay();
        } else {
          console.log(res);
        }
      } catch (e: any) {
        console.log(e);
      }
    }
  };

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
              value={teamName}
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

          <button
            type="button"
            className="button-continue"
            onClick={() => createTeam(user)}
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
}
