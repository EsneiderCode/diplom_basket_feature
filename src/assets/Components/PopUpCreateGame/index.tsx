import Select from "react-select";
import axios from "axios";
import { useEffect, useState } from "react";
import { User, Team } from "../../Interfaces";
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
}

export default function PopUpCreateGame(props: PopUpProps) {
  const { display, toggleDisplay, user, setGameTeams, next } = props;
  const [teamA, setTeamA] = useState<{}>({});
  const [teamB, setTeamB] = useState<{}>({});
  const [gameDate, setGameDate] = useState<string | undefined>(undefined);
  const [allTeams, setAllTeams] = useState<[]>([]);

  const getTeams = async (user: User) => {
    if (user.id != null) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/users/${user.id}`
        );
        if (res.status === 200) {
          if (res.data.teams != null) {
            setAllTeams(
              res.data.teams.map((team: Team) => {
                return {
                  label: team.name,
                  value: team.id,
                };
              })
            );
          }
        } else {
          console.log(res);
        }
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  //  const createGame = async (user: User) => {
  //   if (teamA != null && teamB != null) {
  //     try {
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_SERVER_ENDPOINT}/games/create/${user.id}`,
  //         {
  //           team_a_id: teamA,
  //           team_b_id: teamB,
  //           date: gameDate,
  //         }
  //       );
  //       if (res.status === 200) {
  //         getGames();
  //         toggleDisplay();
  //       } else {
  //         console.log(res);
  //       }
  //     } catch (e: any) {
  //       console.log(e);
  //     }
  //   }
  // };

  function checkSubmit() {
    if (
      teamA != null &&
      teamA !== "" &&
      teamB != null &&
      teamB !== "" &&
      gameDate != null
    ) {
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
                setTeamA({ id: parseInt(e?.value), name: e?.label });
              }
            }}
          />
          <Select
            className="select-basic"
            defaultValue={{ label: "Выберите команду Б", value: "none" }}
            options={allTeams}
            onChange={(e) => {
              if (e?.value != null) {
                setTeamB({ id: parseInt(e?.value), name: e?.label });
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
          {/* 
          <button
            type="button"
            className="button-continue"
            onClick={() => {
              checkSubmit();
            }}
          >
            Создать
          </button> */}

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
