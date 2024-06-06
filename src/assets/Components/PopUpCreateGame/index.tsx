import Select from "react-select";
import axios from "axios";
import { useEffect, useState } from "react";
import { User, Team, TeamInfo, Game } from "../../Interfaces";
import "./popupcreate.scss";
import { RootState, store } from "../../../app/store";
import { fetchTeams, selectTeamsStatus } from "../../Pages/Teams/teamSlice";
import { useSelector } from "react-redux";

interface PopUpProps {
  display: boolean;
  toggleDisplay: () => void;
  user: User;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  teamA: TeamInfo;
  teamB: TeamInfo;
  gameDate: string | undefined;
  setTeamA: React.Dispatch<React.SetStateAction<TeamInfo>>;
  setTeamB: React.Dispatch<React.SetStateAction<TeamInfo>>;
  setGameDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setGameInProcess: React.Dispatch<React.SetStateAction<Game>>;
  getGames: (user: User) => Promise<void>;
  games: Game[];
}

export default function PopUpCreateGame(props: PopUpProps) {
  const {
    display,
    toggleDisplay,
    user,
    next,
    teamA,
    teamB,
    gameDate,
    setGameDate,
    setTeamA,
    setTeamB,
    getGames,
    setGameInProcess,
    games,
  } = props;

  const teams = useSelector((state: RootState) => state.team.teams);
  const teamStatus = useSelector(selectTeamsStatus);
  const [selectOptions, setSelectOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (user && user.access_token && teamStatus === "idle") {
      store.dispatch(fetchTeams(user));
    }

    if (teams.length > 1) {
      setSelectOptions(
        teams.map((team: Team) => {
          return {
            label: team.name,
            value: team.id,
          };
        })
      );
    }
  }, [teams, user]);

  const createGame = async (user: User) => {
    if (teamA != null && teamB != null && user != null) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            apikey: `${process.env.REACT_APP_SERVER_API}`,
          },
        };

        const data = {
          user_id: user.user.id,
          date: gameDate,
          team_a: teamA.id,
          team_b: teamB.id,
          game_name: `${teamA.name} + 2${teamB.name}`,
        };

        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/games`,
          data,
          config
        );
        if (res.status === 201) {
          setGameInProcess(JSON.parse(res.config.data));
          getGames(user);
          toggleDisplay();
        } else {
          console.log(res);
        }
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  function checkSubmit() {
    if (teamA != null && teamB != null && gameDate != null) {
      createGame(user);
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
            options={selectOptions}
            onChange={(e) => {
              if (e?.value != null) {
                setTeamA({ id: e?.value, name: e?.label });
              }
            }}
          />
          <Select
            className="select-basic"
            defaultValue={{ label: "Выберите команду Б", value: "none" }}
            options={selectOptions}
            onChange={(e) => {
              if (e?.value != null) {
                setTeamB({ id: e?.value, name: e?.label });
              }
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
            className="button-continue"
            type="button"
            onClick={() => {
              checkSubmit();
            }}
          >
            Далее
          </button>
        </form>
      </div>
    </div>
  );
}
