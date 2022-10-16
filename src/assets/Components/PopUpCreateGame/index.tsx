import Select from "react-select";
import axios from "axios";
import { useState } from "react";
import { User, Team } from "../../Interfaces";
import "./popupcreate.scss";

interface PopUpProps {
  display: boolean;
  toggleDisplay: () => void;
  user: User;
  getGames: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUpCreateGame(props: PopUpProps) {
  const { display, toggleDisplay, user, getGames } = props;

  let localTeams = [] as any;
  if (user.teams != null) {
    localTeams = user.teams.map((team: Team) => {
      return {
        label: team.name,
        value: team.id,
      };
    });
  }

  const oponentTeams = localTeams;

  const [teamA, setTeamA] = useState<string | undefined>(undefined);
  const [teamB, setTeamB] = useState<string | undefined>(undefined);
  const [gameDate, setGameDate] = useState<string | undefined>(undefined);

  function checkSubmit() {
    if (teamA != null && teamB != null && gameDate != null) {
      createGame(user);
    }
  }

  const createGame = async (user: User) => {
    if (teamA != null && teamB != null) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/games/create/${user.id}`,
          {
            team_a_id: teamA,
            team_b_id: teamB,
            date: gameDate,
          }
        );
        if (res.status === 200) {
          getGames();
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
              var timestamp = new Date(e.target.value).toISOString();
              setGameDate(timestamp);
            }}
          />

          <button
            type="button"
            className="button-continue"
            onClick={() => {
              checkSubmit();
            }}
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
}
