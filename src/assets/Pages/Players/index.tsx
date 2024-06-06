import { useEffect, useState } from "react";
import axios from "axios";
import "./players.scss";
import { Team, PlayerTeam, User, Player } from "../../Interfaces";
import { togglePopUp } from "../../Functions";
import { useNavigate } from "react-router";
import PopUpCreatePlayer from "../../Components/PopUpCreatePlayer";
import BottomNavigationComponent from "../../Components/Navigation";
import { OptionsForLabel } from "../../Types/types";
import { confirm } from "react-confirm-box";
import EditPlayer from "./EditPlayer";
import { RootState, store } from "../../../app/store";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  deletePlayerFetch,
  fetchPlayers,
  selectPlayersStatus,
  updatePlayerFetch,
} from "./playerSlice";
import Spinner from "../../Components/Spinner/Spinner";
import { Link } from "react-router-dom";
import { fetchTeams } from "../Teams/teamSlice";

export default function Players() {
  const [displayPopUpCreate, setDisplayPopUpCreate] = useState<boolean>(false);
  const [user, setUser] = useState<User>({} as User);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerTeam>();
  const [displayPopUpDeletePlayer, setDisplayPopUpDeletePlayer] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { teamId } = useParams();
  const team = useSelector((state: RootState) =>
    state.team.teams.find((team: Team) => team.id === teamId)
  );
  const playerStatus = useSelector(selectPlayersStatus);
  const players: PlayerTeam[] = useSelector(
    (state: RootState) => state.player.players
  );

  useEffect(() => {
    const recoveryTeamsAndPlayers = async () => {
      try {
        await store.dispatch(fetchTeams(user));
        if (team && user) {
          await store.dispatch(fetchPlayers({ user, team }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    recoveryTeamsAndPlayers();
  }, [team, user]);

  useEffect(() => {
    const fetchUserAndTeams = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          throw new Error("User not found in local storage");
        }

        const user = JSON.parse(userString);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user or teams:", error);
        navigate("/");
      }
    };

    fetchUserAndTeams();
  }, []);

  const confirmDelete = async ({ player }: { player: PlayerTeam }) => {
    const optionsWithLabelChange: OptionsForLabel = {
      closeOnOverlayClick: false,
      labels: {
        confirmable: "Подтвердить",
        cancellable: "Отменить",
      },
    };
    const result = await confirm(
      "Вы уверены, что хотите удалить этот игрок?",
      optionsWithLabelChange
    );
    if (result) {
      store.dispatch(deletePlayerFetch({ user, player }));
      setDisplayPopUpDeletePlayer(true);
      return;
    }
  };

  function handleUpdateTeam() {
    if (user && selectedPlayer) {
      const data = {
        user_id: user.id,
        name: newPlayerName,
        id: selectedPlayer.id,
      };
      store.dispatch(
        updatePlayerFetch({
          user,
          data,
        })
      );

      setNewPlayerName("");
    }
  }

  const handleEditClick = (player: PlayerTeam) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const PlayerExcerpt = ({ player }: { player: PlayerTeam }) => {
    {
      return (
        <li className="player-container" key={player.id}>
          <div className="player">
            <span>{player.name}</span>
            <span className="player-number">{player.number}</span>
          </div>
        </li>
      );
    }
  };

  let playersContent;
  let text = `Игрокы ${team?.name} загружаются...`;

  if (playerStatus === "loading") {
    playersContent = <Spinner text={text} />;
  } else if (playerStatus === "succeeded") {
    playersContent = players.map((player) => <PlayerExcerpt player={player} />);
  } else if (playerStatus === "failed") {
    playersContent = <Spinner text={text} />;
  }
  if (!team) {
    return (
      <>
        <h1>Произошла ошибка</h1>
        <Link to="/teams">Перейти в команды</Link>
      </>
    );
  }
  return (
    <div className="players-page-container">
      <div className="players-content">
        <div className="header-players">
          <h2 className="page-title">{team?.name}</h2>
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
        <ul className="list-players">{playersContent}</ul>
      </div>
      <PopUpCreatePlayer
        display={displayPopUpCreate}
        toggleDisplay={() =>
          togglePopUp(displayPopUpCreate, setDisplayPopUpCreate)
        }
        team={team}
        user={user}
      />
      {isModalOpen && selectedPlayer && (
        <EditPlayer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={() => handleUpdateTeam()}
          newPlayerName={newPlayerName}
          setNewPlayerName={(newName: string) => setNewPlayerName(newName)}
        />
      )}

      <BottomNavigationComponent page="profile"></BottomNavigationComponent>
    </div>
  );
}
