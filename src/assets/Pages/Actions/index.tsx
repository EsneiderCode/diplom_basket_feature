import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./actions.scss";
import { User, Team, Game, CreateAction, Action } from "../../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../app/store";
import Spinner from "../../Components/Spinner/Spinner";
import { useNavigate, useParams } from "react-router";
import { RadarDiagram } from "../../Diagrams/RadarDiagram";
import ZoneDiagram from "../../Diagrams/ZoneDiagram";
import TableDiagram from "../../Diagrams/TableDiagram";
import { fetchActions, selectActionsStatus } from "./actionSlice";
import { fetchTeams } from "../Teams/teamSlice";
import BottomNavigationComponent from "../../Components/Navigation";

export default function Actions() {
  const [displayTeam_1, setDisplayTeam_1] = useState<boolean>(true);
  const [displayTeam_2, setDisplayTeam_2] = useState<boolean>(false);
  const navigate = useNavigate();
  const actionStatus = useSelector(selectActionsStatus);
  const [user, setUser] = useState<User>({} as User);
  const { gameId } = useParams();
  const actions = useSelector((state: RootState) => state.action.actions);
  const teams = useSelector((state: RootState) => state.team.teams);
  const [teamA, setTeamA] = useState<Team>();
  const [teamB, setTeamB] = useState<Team>();
  const [actionsTeamA, setActionsTeamA] = useState<Action[]>([]);
  const [actionsTeamB, setActionsTeamB] = useState<Action[]>([]);

  let actionsContent;
  let text = `Действия загружаются...`;
  if (actionStatus === "loading") {
    actionsContent = <Spinner text={text} />;
  } else if (actionStatus === "succeeded") {
  } else if (actionStatus === "failed") {
    actionsContent = <Spinner text={text} />;
  }

  useEffect(() => {
    if (actionStatus === "succeeded") {
      const team_a_id = actions[0]?.team_id;
      const team_b_id = actions.find(
        (action) => action.team_id !== team_a_id
      )?.team_id;
      const teamA = teams.find((team) => team.id === team_a_id);
      const teamB = teams.find((team) => team.id === team_b_id);
      setTeamA(teamA);
      setTeamB(teamB);
      setActionsTeamA(actions.filter((action) => action.team_id === teamA?.id));
      setActionsTeamB(actions.filter((action) => action.team_id === teamB?.id));
    }
  }, [actions, teams, actionStatus]);

  useEffect(() => {
    const fetchUserAndTeams = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          throw new Error("User not found in local storage");
        }
        const user = JSON.parse(userString);
        setUser(user);

        if (user && user.access_token && gameId && actionStatus === "idle") {
          await store.dispatch(fetchActions({ user, gameId }));
          await store.dispatch(fetchTeams(user));
        }
      } catch (error) {
        console.error("Error fetching user or teams:", error);
        navigate("/");
      }
    };

    fetchUserAndTeams();
  }, []);
  const hrStyle = {
    border: "none",
    height: "2px",
    backgroundColor: "#f0a500",
    margin: "20px 0",
  };
  if (!actions) return <>Error</>;
  return (
    <div className="actions-container">
      <div className="actions-content">
        <div className="header-actions">
          <h2 className="page-title">Таблица действий</h2>
        </div>
        <section className="actions__teams-section">
          <div className="actions__team-container">
            <div className="team__header-container">
              <h2 className="team__name">{teamA?.name}</h2>
              <p
                className={
                  displayTeam_1
                    ? "svg__bottom-arrow"
                    : "svg__bottom-arrow arrow-display-closed"
                }
                onClick={() => setDisplayTeam_1(!displayTeam_1)}
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                      fill="#000000"
                    ></path>
                  </g>
                </svg>
              </p>
            </div>
            <section
              className={
                displayTeam_1
                  ? "diagrams__container team-display-open"
                  : "diagrams__container team-display-closed"
              }
            >
              <div className="diagram_container diagram__table-container ">
                <TableDiagram actions={actionsTeamA} />
              </div>
              <hr style={hrStyle} />
              <div className="diagram_container diagram__radar-container ">
                {actionsTeamA && actionsTeamB && teamA && teamB && (
                  <RadarDiagram
                    actionsFirstTeam={actionsTeamA}
                    actionsSecondTeam={actionsTeamB}
                    teams={[teamA, teamB]}
                  />
                )}
              </div>
              <hr style={hrStyle} />
              <div className="diagram_container diagram__square-container">
                <ZoneDiagram actions={actionsTeamA} />
              </div>
              <hr style={hrStyle} />
            </section>
          </div>
          <div className="actions__team-container">
            <div className="team__header-container">
              <h2 className="team__name">{teamB?.name}</h2>
              <p
                className={
                  displayTeam_2
                    ? "svg__bottom-arrow"
                    : "svg__bottom-arrow arrow-display-closed"
                }
                onClick={() => setDisplayTeam_2(!displayTeam_2)}
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                      fill="#000000"
                    ></path>
                  </g>
                </svg>
              </p>
            </div>
            <section
              className={
                displayTeam_2
                  ? "diagrams__container team-display-open"
                  : "diagrams__container team-display-closed"
              }
            >
              <div className="diagram_container diagram__table-container ">
                <TableDiagram actions={actionsTeamB} />
              </div>
              <hr style={hrStyle} />
              <div className="diagram_container diagram__radar-container ">
                {actionsTeamA && actionsTeamB && teamA && teamB && (
                  <RadarDiagram
                    actionsFirstTeam={actionsTeamB}
                    actionsSecondTeam={actionsTeamA}
                    teams={[teamB, teamA]}
                  />
                )}
              </div>
              <hr style={hrStyle} />
              <div className="diagram_container diagram__square-container ">
                <ZoneDiagram actions={actionsTeamB} />
              </div>
            </section>
          </div>
        </section>
      </div>
      <BottomNavigationComponent page="profile"></BottomNavigationComponent>
    </div>
  );
}
