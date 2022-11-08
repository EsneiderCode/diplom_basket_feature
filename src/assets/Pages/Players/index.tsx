import { useEffect, useState } from "react";
import axios from "axios";
import "./players.scss";
import { Team, PlayerTeam } from "../../Interfaces";
import { togglePopUp } from "../../Functions";
import { useNavigate } from "react-router";
import PopUpCreatePlayer from "../../Components/PopUpCreatePlayer";
import BottomNavigationComponent from "../../Components/Navigation";

export default function Players() {
  const [displayPopUpCreate, setDisplayPopUpCreate] = useState<boolean>(false);
  const [team, setTeam] = useState<Team>({} as Team);
  const [players, setPlayers] = useState<[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let team: Team;
    const teamString = localStorage.getItem("team");
    if (teamString != null) {
      team = JSON.parse(teamString);
      setTeam(team);
      getPlayers(team);
    } else {
      navigate("/teams");
    }
  }, [navigate]);

  const getPlayers = async (team: Team) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/teams/${team.id}`
      );
      if (res.status === 200) {
        setPlayers(res.data);
      } else {
        console.log(res);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className="players-page-container">
      <div className="players-content">
        <div className="header-players">
          <h2 className="page-title">{team.name}</h2>
          <span
            className="icon-new-players"
            onClick={() => {
              setDisplayPopUpCreate(true);
            }}
          >
            +
          </span>
        </div>
        <span
          className="link-create-new-player"
          onClick={() => setDisplayPopUpCreate(true)}
        >
          Добавить игрока в команду
        </span>
        <ul className="list-players">
          {players.map((player: PlayerTeam) => {
            return (
              <li className="player-container" key={player.id}>
                <div className="player">
                  <span>
                    {player.first_name} {player.last_name}
                  </span>
                  <span className="player-number">{player.number}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <PopUpCreatePlayer
        display={displayPopUpCreate}
        toggleDisplay={() =>
          togglePopUp(displayPopUpCreate, setDisplayPopUpCreate)
        }
        getPlayers={() => getPlayers(team)}
        team={team}
      />
      <BottomNavigationComponent page="profile"></BottomNavigationComponent>
    </div>
  );
}
