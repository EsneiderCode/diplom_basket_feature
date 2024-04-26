import { useEffect, useState } from "react";
import axios from "axios";
import "./teams.scss";
import { User, Team } from "../../Interfaces";
import PopUpCreateTeam from "../../Components/PopUpCreateTeam";
import PopUpConfirmation from "../../Components/PopUpConfirmation";
import { togglePopUp } from "../../Functions";
import { confirm } from "react-confirm-box";
import { Helmet } from "react-helmet";
import BottomNavigationComponent from "../../Components/Navigation";
import EditTeam from "./EditTeam";
import { OptionsForLabel } from "../../Types/types";
import DeleteTeam from "../../Components/DeleteTeam";
import UpdateOption from "../../Components/UpdateTeam";
import { deleteTeamFetch, fetchTeams, selectTeamsStatus } from "./teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../app/store";
import Spinner from "../../Components/Spinner/Spinner";
import { useNavigate } from "react-router";
import { updateTeamFetch } from "./teamSlice";

export default function Teams() {
  //Modal window for updating team
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [displayPopUpCreate, setDisplayPopUpCreate] = useState<boolean>(false);
  const [displayPopUpDeleteTeam, setDisplayPopUpDeleteTeam] =
    useState<boolean>(false);
  const [user, setUser] = useState<User>({} as User);
  const dispatch = useDispatch();
  const teams = useSelector((state: RootState) => state.team.teams);
  const teamStatus = useSelector(selectTeamsStatus);

  const navigate = useNavigate();

  const confirmDelete = async ({ team }: { team: Team }) => {
    const optionsWithLabelChange: OptionsForLabel = {
      closeOnOverlayClick: false,
      labels: {
        confirmable: "Подтвердить",
        cancellable: "Отменить",
      },
    };
    const result = await confirm(
      "Вы уверены, что хотите удалить эту команду?",
      optionsWithLabelChange
    );
    if (result) {
      store.dispatch(deleteTeamFetch({ user, team }));
      setDisplayPopUpDeleteTeam(true);
      return;
    }
  };

  useEffect(() => {
    const fetchUserAndTeams = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          throw new Error("User not found in local storage");
        }

        const user = JSON.parse(userString);
        setUser(user);

        if (user && teamStatus === "idle") {
          await store.dispatch(fetchTeams(user));
        }
      } catch (error) {
        console.error("Error fetching user or teams:", error);
        navigate("/");
      }
    };

    fetchUserAndTeams();
  }, []);

  const handleEditClick = (team: Team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const TeamExcerpt = ({ team }: { team: Team }) => {
    return (
      <li className="team-container" key={team.id}>
        <div
          className="team"
          onClick={() => {
            navigate(`/players/${team.id}`);
          }}
        >
          <span>{team.name}</span>
        </div>
        <div className="options-container">
          <UpdateOption handleEditClick={handleEditClick} team={team} />
          <DeleteTeam confirmDelete={confirmDelete} team={team} />
        </div>
      </li>
    );
  };

  function handleUpdateTeam(selectedTeam: Team) {
    if (user) {
      store.dispatch(
        updateTeamFetch({
          user,
          selectedTeam,
          newTeamName,
        })
      );
    }
  }

  let teamsContent;

  if (teamStatus === "loading") {
    teamsContent = <Spinner text="Комадны загружаются..." />;
  } else if (teamStatus === "succeeded") {
    teamsContent = teams.map((team) => <TeamExcerpt team={team} />);
  } else if (teamStatus === "failed") {
    teamsContent = <Spinner text="Комадны загружаются..." />;
  }

  return (
    <div className="teams-container">
      <Helmet>
        <title>Команды</title>
      </Helmet>
      <div className="teams-content">
        <div className="header-teams">
          <h2 className="page-title">Команды</h2>
          <span
            className="icon-new-teams"
            onClick={() => {
              setDisplayPopUpCreate(true);
            }}
          >
            +
          </span>
        </div>
        <span
          className="link-create-new-teams"
          onClick={() => setDisplayPopUpCreate(true)}
        >
          Создайте команду
        </span>
        <ul className="list-teams">{teamsContent}</ul>
      </div>
      <PopUpCreateTeam
        display={displayPopUpCreate}
        toggleDisplay={() => {
          togglePopUp(displayPopUpCreate, setDisplayPopUpCreate);
        }}
        user={user}
      />

      <PopUpConfirmation
        header="Команда удалена"
        description="сохранения изменены"
        buttonDescription="Ok"
        display={displayPopUpDeleteTeam}
        lineHr={true}
        linkTo="/teams"
        toggle={() => {
          togglePopUp(displayPopUpDeleteTeam, setDisplayPopUpDeleteTeam);
        }}
      />
      {isModalOpen && selectedTeam && (
        <EditTeam
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={() => {
            handleUpdateTeam(selectedTeam);
          }}
          newTeamName={newTeamName}
          setNewTeamName={(newName: string) => setNewTeamName(newName)}
        />
      )}

      <BottomNavigationComponent page="/teams"></BottomNavigationComponent>
    </div>
  );
}
