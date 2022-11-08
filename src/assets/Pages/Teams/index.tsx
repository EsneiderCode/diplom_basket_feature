import { useEffect, useState } from "react";
import axios from "axios";
import "./teams.scss";
import { User, Team } from "../../Interfaces";
import PopUpCreateTeam from "../../Components/PopUpCreateTeam";
import PopUpConfirmation from "../../Components/PopUpConfirmation";
import { togglePopUp } from "../../Functions";
import { confirm } from "react-confirm-box";
import BottomNavigationComponent from "../../Components/Navigation";
import { useNavigate } from "react-router";

const optionsWithLabelChange = {
  closeOnOverlayClick: false,
  labels: {
    confirmable: "Подтвердить",
    cancellable: "Отменить",
  },
};

export default function Teams() {
  const [teams, setTeams] = useState<[]>([]);
  const [displayPopUpCreate, setDisplayPopUpCreate] = useState<boolean>(false);
  const [displayPopUpDeleteGame, setDisplayPopUpDeleteGame] =
    useState<boolean>(false);
  const [user, setUser] = useState<User>({} as User);
  const navigate = useNavigate();

  const confirmDelete = async (options: {}) => {
    const result = await confirm(
      "Вы уверены, что хотите удалить эту команду?",
      options
    );
    if (result) {
      setDisplayPopUpDeleteGame(true);
      return;
    }
  };

  useEffect(() => {
    let user: User;
    const userString = localStorage.getItem("user");
    if (userString != null) {
      user = JSON.parse(userString);
      setUser(user);
      getTeams(user);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const getTeams = async (user: User) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/users/${user.id}`
      );
      if (res.status === 200) {
        setTeams(res.data.teams);
      } else {
        console.log(res);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  function openTeam(team: Team) {
    localStorage.setItem("team", JSON.stringify(team));
    navigate("/players");
  }

  return (
    <div className="teams-container">
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
        <ul className="list-teams">
          {teams.map((team: Team) => {
            return (
              <li className="team-container" key={team.id}>
                <div
                  className="team"
                  onClick={() => {
                    openTeam(team);
                  }}
                >
                  <span>{team.name}</span>
                </div>
                <div className="options-container">
                  <div className="option-game edit-game">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.9577 5.76473L22.1626 0.952358C21.5368 0.362397 20.7167 0.0238854 19.8584 0.00121672C19.0001 -0.021452 18.1634 0.273304 17.5076 0.829415L1.75737 16.6365C1.19171 17.209 0.839497 17.9593 0.759863 18.7616L0.00735525 26.0856C-0.0162193 26.3428 0.0170404 26.6021 0.104763 26.845C0.192486 27.0878 0.332513 27.3083 0.514861 27.4906C0.678383 27.6534 0.872313 27.7822 1.08553 27.8696C1.29875 27.957 1.52706 28.0013 1.75737 28H1.91488L9.21246 27.3326C10.0119 27.2526 10.7595 26.8992 11.33 26.3314L27.0802 10.5244C27.6915 9.87626 28.0218 9.01133 27.9989 8.11916C27.9759 7.22699 27.6015 6.38033 26.9577 5.76473V5.76473ZM8.89745 23.8199L3.6474 24.3117L4.1199 19.0426L14.0075 9.24228L18.7326 13.9844L8.89745 23.8199ZM21.0076 11.6309L16.3175 6.92391L19.7301 3.41123L24.5076 8.20604L21.0076 11.6309Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div
                    className="option-game delete-game"
                    onClick={() => {
                      confirmDelete(optionsWithLabelChange);
                    }}
                  >
                    <svg
                      width="30"
                      height="29"
                      viewBox="0 0 30 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.6936 16.7944L26.2079 28.3086L28.3292 26.1873L16.815 14.6731L29.1634 2.32466L27.0421 0.20334L14.6936 12.5518L2.49037 0.348494L0.369052 2.46981L12.5723 14.6731L1.20327 26.0421L3.32459 28.1635L14.6936 16.7944Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <PopUpCreateTeam
        display={displayPopUpCreate}
        toggleDisplay={() => {
          togglePopUp(displayPopUpCreate, setDisplayPopUpCreate);
        }}
        getTeams={() => getTeams(user)}
        user={user}
      />

      <PopUpConfirmation
        header="Команда удалена"
        description="сохранения изменены"
        buttonDescription="Ok"
        display={displayPopUpDeleteGame}
        lineHr={true}
        linkTo="/teams"
        toggle={() => {
          togglePopUp(displayPopUpDeleteGame, setDisplayPopUpDeleteGame);
        }}
      />
      <BottomNavigationComponent page="teams"></BottomNavigationComponent>
    </div>
  );
}
