import { useState } from "react";
import { User } from "../../Interfaces";
import { validateTeamName, validateTeamNameHandler } from "../../Functions";
import axios from "axios";
import "./popupcreateteam.scss";
import { store } from "../../../app/store";
import { addTeamFetch, fetchTeams } from "../../Pages/Teams/teamSlice";
import { ToastContainer, toast } from "react-toastify";
import { successMessages } from "../../utils/successMessages";
import { errorMessages } from "../../utils/errorMessages";

interface PopUpProps {
  display: boolean;
  toggleDisplay: () => void;
  next?: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

export default function PopUpCreateTeam(props: PopUpProps) {
  const { display, toggleDisplay, user } = props;
  const [teamName, setTeamName] = useState<string>("");
  const [teamNameError, setTeamNameError] = useState<boolean>(false);

  const handleCreateTeam = async () => {
    if (teamName === "" || teamName.includes("@")) {
      toast.error(errorMessages.errorTeamNameFormat);
      return;
    }
    try {
      await store.dispatch(addTeamFetch({ user, teamName }));
      await store.dispatch(fetchTeams(user));
      toggleDisplay();
      toast.success(successMessages.successAddedTeam);
      setTeamName("");
    } catch (error) {
      console.error("Error adding new team:", error);
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
            onClick={() => handleCreateTeam()}
          >
            Создать
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
