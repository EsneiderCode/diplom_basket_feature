import "./chooseteam.scss";
import { Player, TeamInfo, Time } from "../../Interfaces";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeChoosen: React.Dispatch<React.SetStateAction<Time>>;
  timeChoosen: Time;
  teamA: { id: number; name: string };
  teamB: { id: number; name: string };
  setTeamActive: React.Dispatch<React.SetStateAction<TeamInfo>>;
  getTime: Time[];
  firstPlayers: Player[];
  secondPlayers: Player[];
  setActivePlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setPlayerChoosen: React.Dispatch<React.SetStateAction<Player>>;
}

export default function ChooseTeam(props: Props) {
  const {
    display,
    toggle,
    next,
    close,
    timeChoosen,
    setTimeChoosen,
    teamA,
    teamB,
    setTeamActive,
    getTime,
    firstPlayers,
    secondPlayers,
    setActivePlayers,
    setPlayerChoosen,
  } = props;
  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <section className="time-section">
          <div
            className="close-action"
            onClick={() => {
              toggle();
              close(true);
            }}
          >
            <p className="content-action">X</p>
          </div>
          <p className="category-title">Тайм</p>
          <ul className="alltimes-ul">
            {getTime.map((time: Time) => {
              return (
                <li
                  onClick={() => setTimeChoosen(time)}
                  className={
                    timeChoosen.id === time.id ? "active-time" : "alltimes-ul"
                  }
                  key={time.id}
                >
                  {time.time}
                </li>
              );
            })}
          </ul>
        </section>
        <p className="category-title">Команда</p>
        <section className="teams-section">
          <div
            className="team-info-container"
            onClick={() => {
              setTeamActive(teamA);
              setActivePlayers(firstPlayers);
              setPlayerChoosen(firstPlayers[0]);
              toggle();
              next(true);
            }}
          >
            <p className="team-name">{teamA.name}</p>
          </div>
          <div
            className="team-info-container"
            onClick={() => {
              setTeamActive(teamB);
              setActivePlayers(secondPlayers);
              setPlayerChoosen(secondPlayers[0]);
              toggle();
              next(true);
            }}
          >
            <p className="team-name">{teamB.name}</p>
          </div>
        </section>
        <section className="actions-section">
          <div className="table-action">
            <p className="content-action">Таблица</p>
          </div>
        </section>
      </div>
    </div>
  );
}
