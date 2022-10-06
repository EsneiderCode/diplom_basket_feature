import Select from "react-select";
import { useState } from "react";
import "./popupcreate.scss";

interface PopUpProps {
  display: boolean;
  toggleDisplay: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUpCreateGame(props: PopUpProps) {
  const { display, toggleDisplay, next } = props;

  const localTeams = [
    { label: "Moscu", value: "Moscu" },
    { label: "Taganrog", value: "Taganrog" },
    { label: "Tver", value: "Tver" },
  ];

  const oponentTeams = [
    { label: "Rostov", value: "Rostov" },
    { label: "Krasnodar", value: "Krasnodar" },
    { label: "Kazan", value: "Kazan" },
  ];

  const [teamA, setTeamA] = useState<string | undefined>(undefined);
  const [teamB, setTeamB] = useState<string | undefined>(undefined);
  const [gameDate, setGameDate] = useState<string | undefined>(undefined);
  function checkNextTeams() {
    if (teamA != null && teamB != null && gameDate != null) {
      next(true);
      toggleDisplay();
    }
  }

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
        <h2 className="popup-title">Новая игра</h2>
        <form action="" className="popup-form">
          <Select
            className="select-basic"
            defaultValue={{ label: "Выберите команду А", value: "none" }}
            options={localTeams}
            onChange={(e) => {
              setTeamA(e?.value);
            }}
          />
          <Select
            className="select-basic"
            defaultValue={{ label: "Выберите команду Б", value: "none" }}
            options={oponentTeams}
            onChange={(e) => {
              setTeamB(e?.value);
            }}
          />
          <input
            className="input-date"
            type="date"
            name="date"
            id="date-game"
            onChange={(e) => {
              setGameDate(e.target.value);
            }}
          />

          <button
            type="button"
            className="button-continue"
            onClick={() => {
              checkNextTeams();
            }}
          >
            Далее
          </button>
        </form>
      </div>
    </div>
  );
}
