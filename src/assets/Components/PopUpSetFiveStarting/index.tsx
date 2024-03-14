import { useState } from "react";
import { createGame } from "../../Functions/FunctionsDb";
import { Player, User } from "../../Interfaces";
import { DragAndDrop } from "../DragAndDrop/DragAndDrop";
import "./popupsetfivestarting.scss";

interface PopUpProps {
  buttonText?: string;
  display: boolean;
  toggleDisplay: () => void;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  infoFirstTeam?: any;
  infoSecondTeam?: any;
  isChangePlayers?: boolean;
  hideCloseIcon?: boolean;
  firstPlayers: Player[];
  setFirstPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  secondPlayers: Player[];
  setSecondPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  user: User;
  gameDate?: string | undefined;
  getGames?: (user: User) => Promise<void>;
}

export default function PopUpSetFiveStarting(props: PopUpProps) {
  const {
    display,
    toggleDisplay,
    next,
    back,
    infoFirstTeam,
    infoSecondTeam,
    isChangePlayers,
    hideCloseIcon,
    firstPlayers,
    setFirstPlayers,
    secondPlayers,
    setSecondPlayers,
    user,
    gameDate,
    getGames,
  } = props;
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  if (props.infoFirstTeam != null && props.infoFirstTeam.id !== undefined) {
    return (
      <div
        className={
          display === true
            ? "popup-container popup-display-open"
            : "popup-container popup-display-closed"
        }
      >
        <div className="popup-content-container">
          <span
            className="popup-back-icon five-starting-popup-back"
            onClick={() => {
              toggleDisplay();
              back(true);
            }}
          >
            &#60;
          </span>

          <h2 className="popup-title five-starting-title">Стартовая пятерка</h2>
          {hideCloseIcon !== true && (
            <span
              className="popup-close-icon five-starting-popup-close"
              onClick={() => toggleDisplay()}
            >
              &#x2715;
            </span>
          )}

          <p className="description five-starting-description">
            {infoFirstTeam.name}
          </p>

          <DragAndDrop
            setButtonDisabled={setButtonDisabled}
            firstTeamId={infoFirstTeam.id}
            firstPlayers={firstPlayers}
            setFirstPlayers={setFirstPlayers}
            secondPlayers={secondPlayers}
            setSecondPlayers={setSecondPlayers}
          />

          <button
            className="button-continue"
            disabled={buttonDisabled}
            onClick={(e) => {
              next(true);
              toggleDisplay();
            }}
          >
            {isChangePlayers !== true ? "Далее" : "Заменить"}
          </button>
        </div>
      </div>
    );
  } else if (
    props.infoSecondTeam != null &&
    props.infoSecondTeam.id !== undefined
  ) {
    return (
      <div
        className={
          display === true
            ? "popup-container popup-display-open"
            : "popup-container popup-display-closed"
        }
      >
        <div className="popup-content-container">
          <span
            className="popup-back-icon five-starting-popup-back"
            onClick={() => {
              toggleDisplay();
              back(true);
            }}
          >
            &#60;
          </span>

          <h2 className="popup-title five-starting-title">Стартовая пятерка</h2>
          <span
            className="popup-close-icon five-starting-popup-close"
            onClick={() => toggleDisplay()}
          >
            &#x2715;
          </span>
          <p className="description five-starting-description">
            {infoSecondTeam.name}
          </p>

          <DragAndDrop
            setButtonDisabled={setButtonDisabled}
            secondTeamId={infoSecondTeam.id}
            firstPlayers={firstPlayers}
            setFirstPlayers={setFirstPlayers}
            secondPlayers={secondPlayers}
            setSecondPlayers={setSecondPlayers}
          />

          <button
            className="button-continue-finish"
            disabled={buttonDisabled}
            onClick={(e) => {
              next(true);
              toggleDisplay();
              if (
                isChangePlayers !== true &&
                typeof gameDate === "string" &&
                getGames != null
              ) {
                let teamA = firstPlayers[0].team_id;
                let teamB = secondPlayers[0].team_id;
                let userId = user.id;
                createGame(userId, teamA, teamB, gameDate);
                getGames(user);
              }
            }}
          >
            {isChangePlayers !== true ? "Начать игру" : "Заменить"}
          </button>
        </div>
      </div>
    );
  }
  return null;
}
