import Select from "react-select";
import axios from "axios";
import { useEffect } from "react";
import { User, Team, TeamInfo } from "../../Interfaces";
import "./popupcreate.scss";

interface PopUpProps {
  display: boolean;
  toggleDisplay: () => void;
  user: User;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  setGameTeams: React.Dispatch<
    React.SetStateAction<{
      firstTeam: {};
      secondTeam: {};
    }>
  >;
  teamA: TeamInfo;
  teamB: TeamInfo;
  gameDate: string | undefined;
  allTeams: [];
  setTeamA: React.Dispatch<React.SetStateAction<TeamInfo>>;
  setTeamB: React.Dispatch<React.SetStateAction<TeamInfo>>;
  setGameDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAllTeams: React.Dispatch<React.SetStateAction<[]>>;
  getGames: (user: User) => Promise<void>;
}

export default function PopUpCreateGame(props: PopUpProps) {
  const {
    display,
    toggleDisplay,
    user,
    setGameTeams,
    next,
    teamA,
    teamB,
    gameDate,
    allTeams,
    setAllTeams,
    setGameDate,
    setTeamA,
    setTeamB,
    getGames,
  } = props;

  const getTeams = async (user: User) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        apikey: `${process.env.REACT_APP_SERVER_API}`,
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/rest/v1/teams?select=*`,
        config
      );
      setAllTeams(
        res.data.map((team: Team) => {
          return {
            label: team.name,
            value: team.id,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

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
      setGameTeams({
        firstTeam: teamA,
        secondTeam: teamB,
      });
      next(true);
      toggleDisplay();
    }
  }

  useEffect(() => {
    getTeams(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
            options={allTeams}
            onChange={(e) => {
              if (e?.value != null) {
                setTeamA({ id: e?.value, name: e?.label });
              }
            }}
          />
          <Select
            className="select-basic"
            defaultValue={{ label: "Выберите команду Б", value: "none" }}
            options={allTeams}
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
