import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Game,
  TeamInfo,
  StartAttack,
  Time,
  TimeType,
  Player,
  AttackType,
  LossOption,
  PlayType,
  FoulOption,
} from "../../Interfaces";
import "./games.scss";
import PopUpCreateGame from "../../Components/PopUpCreateGame";
import PopUpSetFiveStarting from "../../Components/PopUpSetFiveStarting";
import PopUpConfirmation from "../../Components/PopUpConfirmation";
//Game windows.
import ChooseTeam from "../../Components/ChooseTeam";
import AttackStart from "../../Components/AttackStart";
import Possession from "../../Components/Possession";
import TypeAttack from "../../Components/TypeAttack";
import ResultAttack from "../../Components/ResultAttack";
import FoulResult from "../../Components/FoulResult";
import CompletionResult from "../../Components/CompletionResult";
import LossResult from "../../Components/LossResult";
import ThrowOne from "../../Components/ThrowOne";
import ThrowTwo from "../../Components/ThrowTwo";
import ThrowThree from "../../Components/ThrowThree";
import TeamFoul from "../../Components/TeamFoul";
import PlayerPenalty from "../../Components/PlayerPenalty";
import ThrowResult from "../../Components/ThrowResult";
import Assist from "../../Components/Assist";
import ChooseZone from "../../Components/ChooseZone";
import FinishGame from "../../Components/FinishGame";
//End game windows.
//Calling functions for db actions.
import {
  GetAttackType,
  GetFoulOptions,
  GetLossOptions,
  GetPlayType,
  GetStartAttack,
  GetTime,
  GetTimeType,
} from "../../Functions/FunctionsDb";
//End calling functions db
import { togglePopUp } from "../../Functions";
import { confirm } from "react-confirm-box";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import BottomNavigationComponent from "../../Components/Navigation";

const optionsWithLabelChange = {
  closeOnOverlayClick: false,
  labels: {
    confirmable: "Подтвердить",
    cancellable: "Отменить",
  },
};

export default function Games() {
  const [displayPopUpCreate, setDisplayPopUpCreate] = useState<boolean>(false);
  const [displayPopUpDeleteGame, setDisplayPopUpDeleteGame] =
    useState<boolean>(false);
  const [displayActivePlayersFirstTeam, setDisplayActivePlayersFirstTeam] =
    useState<boolean>(false);
  const [displayActivePlayersSecondTeam, setDisplayActivePlayersSecondTeam] =
    useState<boolean>(false);
  //Start game popups
  const [displayChooseTeam, setDisplayChooseTeam] = useState<boolean>(false);
  const [displayAttackStart, setDisplayAttackStart] = useState<boolean>(false);
  const [displayPossession, setDisplayPossession] = useState<boolean>(false);
  const [displayTypeAttack, setDisplayTypeAttack] = useState<boolean>(false);
  const [displayCurrentPlayers, setDisplayCurrentPlayers] =
    useState<boolean>(false);
  const [displayResultAttack, setDisplayResultAttack] =
    useState<boolean>(false);
  const [displayFoulResult, setDisplayFoulResult] = useState<boolean>(false);
  const [displayCompletionResult, setDisplayCompletionResult] =
    useState<boolean>(false);
  const [displayLossResult, setDisplayLossResult] = useState<boolean>(false);
  const [displayThrowOne, setDisplayThrowOne] = useState<boolean>(false);
  const [displayThrowTwo, setDisplayThrowTwo] = useState<boolean>(false);
  const [displayThrowThree, setDisplayThrowThree] = useState<boolean>(false);
  const [displayTeamFoul, setDisplayTeamFoul] = useState<boolean>(false);
  const [displayPlayerPenalty, setDisplayPlayerPenalty] =
    useState<boolean>(false);
  const [displayThrowResult, setDisplayThrowResult] = useState<boolean>(false);
  const [displayAssist, setDisplayAssist] = useState<boolean>(false);
  const [displayActionSaved, setDisplayActionSaved] = useState<boolean>(false);
  const [displayChooseZone, setDisplayChooseZone] = useState<boolean>(false);
  const [displayFinishGame, setDisplayFinishGame] = useState<boolean>(false);
  // End game popups
  const [games, setGames] = useState<[]>([]);
  const [user, setUser] = useState<User>({} as User);
  const navigate = useNavigate();
  // const [firstTeamActivePlayers, setFirstTeamActivePlayers] = useState<{}>({});
  //const [secondTeamActivePlayers, setSecondTeamActivePlayers] = useState<{}>({});
  const [gameTeams, setGameTeams] = useState<{ firstTeam: {}; secondTeam: {} }>(
    { firstTeam: {}, secondTeam: {} }
  );

  //All actions for db

  const [firstPlayers, setFirstPlayers] = useState<Player[]>([]);
  const [secondPlayers, setSecondPlayers] = useState<Player[]>([]);
  const [timeChoosen, setTimeChoosen] = useState<Time>({} as Time);
  const [teamA, setTeamA] = useState<TeamInfo>({} as TeamInfo);
  const [teamB, setTeamB] = useState<TeamInfo>({} as TeamInfo);
  const [gameDate, setGameDate] = useState<string | undefined>(undefined);
  const [allTeams, setAllTeams] = useState<[]>([]);
  const [teamActive, setTeamActive] = useState<TeamInfo>({} as TeamInfo);
  const [attackStart, setAttackStart] = useState<StartAttack>(
    {} as StartAttack
  );
  const [timeTypeChoosen, setTimeTypeChoosen] = useState<TimeType>(
    {} as TimeType
  );
  const [activePlayers, setActivePlayers] = useState<Player[]>([]);
  const [playerChoosen, setPlayerChoosen] = useState<Player>({} as Player);
  const [seconds, setSeconds] = useState<string>("1");
  const [attackTypeChoosen, setAttackTypeChoosen] = useState<AttackType>(
    {} as AttackType
  );
  const [lossOptionChoosen, setLossOptionChoosen] = useState<LossOption>(
    {} as LossOption
  );
  const [playTypeChoosen, setPlayTypeChoosen] = useState<PlayType>(
    {} as PlayType
  );
  const [FoulOptionChoosen, setFoulOptionChoosen] = useState<FoulOption>(
    {} as FoulOption
  );
  //End actions for db

  //Getting info from db
  const [getTime, setGetTime] = useState<Time[]>([]);
  const [getStartAttack, setGetStartAttack] = useState<StartAttack[]>([]);
  const [getTimeType, setGetTimeType] = useState<TimeType[]>([]);
  const [getattackType, setGetAttackType] = useState<AttackType[]>([]);
  const [getLossOptions, setGetLossOptions] = useState<LossOption[]>([]);
  const [getPlayType, setGetPlayType] = useState<PlayType[]>([]);
  const [getFoulOptions, setGetFoulOptions] = useState<FoulOption[]>([]);
  //End getting info from db
  const confirmDelete = async (options: {}) => {
    const result = await confirm(
      "Вы уверены, что хотите удалить эту игру?",
      options
    );
    if (result) {
      console.log("Да, удалить");
      setDisplayPopUpDeleteGame(true);
      return;
    }
    console.log("Нет");
  };

  const getGames = async (user: User) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/games/user/${user.id}`
      );
      if (res.status === 200) {
        setGames(res.data);
      } else {
        console.log(res);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    let user: User;
    const userString = localStorage.getItem("user");
    if (userString != null) {
      user = JSON.parse(userString);
      setUser(user);
      getGames(user);
    } else {
      //  navigate("/");
    }
    getAllDicts();
  }, [navigate]);

  async function getAllDicts() {
    setGetStartAttack(await GetStartAttack());
    setGetAttackType(await GetAttackType());
    setGetLossOptions(await GetLossOptions());
    setGetPlayType(await GetPlayType());
    setGetFoulOptions(await GetFoulOptions());

    //Getting all times and setting by default the first one.
    const times = await GetTime();
    setGetTime(times);
    setTimeChoosen(times[0]);

    //Getting all time types and setting by default the first one.
    const timeTypes = await GetTimeType();
    setGetTimeType(timeTypes);
    setTimeTypeChoosen(timeTypes[0]);
  }

  return (
    <div className="games-container">
      <Helmet>
        <title>Игры</title>
      </Helmet>
      <div className="games-content">
        <div className="header-games">
          <h2 className="page-title">Игры</h2>
          <span
            className="icon-new-games"
            onClick={() => {
              setDisplayPopUpCreate(true);
            }}
          >
            +
          </span>
        </div>
        <span
          className="link-create-new-games"
          onClick={() => {
            setDisplayPopUpCreate(true);
          }}
        >
          Создайте игру
        </span>
        <ul className="list-games">
          {games.map((game: Game) => {
            return (
              <li className="game-container" key={game.id}>
                <div className="game-info-container">
                  <div className="teams">
                    <span>{game.team_a.name}</span>
                    <span> - </span>
                    <span>{game.team_b.name}</span>
                  </div>
                  {game.date != null ? (
                    <span className="date-game">{game.date}</span>
                  ) : (
                    <span className="date-game">Дата не определена</span>
                  )}
                </div>
                <div className="options-container">
                  <div className="option-game share-game">
                    <svg
                      width="26"
                      height="35"
                      viewBox="0 0 26 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.3 8.1L13 2.8L7.70005 8.1L6.30005 6.7L13 0L19.7001 6.7L18.3 8.1Z"
                        fill="white"
                      />
                      <path d="M12 1.3999H14V22.3999H12V1.3999Z" fill="white" />
                      <path
                        d="M23 34.3999H3C1.3 34.3999 0 33.0999 0 31.3999V13.3999C0 11.6999 1.3 10.3999 3 10.3999H10V12.3999H3C2.4 12.3999 2 12.7999 2 13.3999V31.3999C2 31.9999 2.4 32.3999 3 32.3999H23C23.6 32.3999 24 31.9999 24 31.3999V13.3999C24 12.7999 23.6 12.3999 23 12.3999H16V10.3999H23C24.7 10.3999 26 11.6999 26 13.3999V31.3999C26 33.0999 24.7 34.3999 23 34.3999Z"
                        fill="white"
                      />
                    </svg>
                  </div>
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
      <PopUpCreateGame
        display={displayPopUpCreate}
        toggleDisplay={() => {
          togglePopUp(displayPopUpCreate, setDisplayPopUpCreate);
        }}
        next={setDisplayActivePlayersFirstTeam}
        user={user}
        setGameTeams={setGameTeams}
        teamA={teamA}
        teamB={teamB}
        gameDate={gameDate}
        allTeams={allTeams}
        setTeamA={setTeamA}
        setTeamB={setTeamB}
        setGameDate={setGameDate}
        setAllTeams={setAllTeams}
      />
      <PopUpSetFiveStarting
        infoFirstTeam={gameTeams.firstTeam}
        display={displayActivePlayersFirstTeam}
        toggleDisplay={() => {
          togglePopUp(
            displayActivePlayersFirstTeam,
            setDisplayActivePlayersFirstTeam
          );
        }}
        back={setDisplayPopUpCreate}
        next={setDisplayActivePlayersSecondTeam}
        firstPlayers={firstPlayers}
        setFirstPlayers={setFirstPlayers}
        secondPlayers={secondPlayers}
        setSecondPlayers={setSecondPlayers}
        user={user}
      />
      <PopUpSetFiveStarting
        infoSecondTeam={gameTeams.secondTeam}
        display={displayActivePlayersSecondTeam}
        toggleDisplay={() => {
          togglePopUp(
            displayActivePlayersSecondTeam,
            setDisplayActivePlayersSecondTeam
          );
        }}
        back={setDisplayActivePlayersFirstTeam}
        next={setDisplayChooseTeam}
        firstPlayers={firstPlayers}
        setFirstPlayers={setFirstPlayers}
        secondPlayers={secondPlayers}
        setSecondPlayers={setSecondPlayers}
        user={user}
        gameDate={gameDate}
        getGames={getGames}
      />
      <PopUpConfirmation
        header="Игра удалена"
        description="сохранения изменены"
        buttonDescription="Ok"
        display={displayPopUpDeleteGame}
        lineHr={true}
        linkTo="/games"
        toggle={() => {
          togglePopUp(displayPopUpDeleteGame, setDisplayPopUpDeleteGame);
        }}
      />
      <ChooseTeam
        display={displayChooseTeam}
        toggle={() => {
          togglePopUp(displayChooseTeam, setDisplayChooseTeam);
        }}
        close={setDisplayFinishGame}
        next={setDisplayAttackStart}
        setTimeChoosen={setTimeChoosen}
        timeChoosen={timeChoosen}
        teamA={teamA}
        teamB={teamB}
        setTeamActive={setTeamActive}
        firstPlayers={firstPlayers}
        secondPlayers={secondPlayers}
        setActivePlayers={setActivePlayers}
        setPlayerChoosen={setPlayerChoosen}
        getTime={getTime}
      />

      <AttackStart
        display={displayAttackStart}
        toggle={() => {
          togglePopUp(displayAttackStart, setDisplayAttackStart);
        }}
        next={setDisplayPossession}
        back={setDisplayChooseTeam}
        setAttackBeginning={setAttackStart}
        startAttack={getStartAttack}
      />

      <Possession
        display={displayPossession}
        toggle={() => {
          togglePopUp(displayPossession, setDisplayPossession);
        }}
        back={setDisplayAttackStart}
        next={setDisplayTypeAttack}
        timeType={getTimeType}
        setTimeTypeChoosen={setTimeTypeChoosen}
        timeTypeChoosen={timeTypeChoosen}
        activePlayers={activePlayers}
        setPlayerChoosen={setPlayerChoosen}
        playerChoosen={playerChoosen}
        setSeconds={setSeconds}
        seconds={seconds}
      />

      <PopUpSetFiveStarting
        infoSecondTeam={gameTeams.secondTeam}
        display={displayCurrentPlayers}
        toggleDisplay={() => {
          togglePopUp(displayCurrentPlayers, setDisplayCurrentPlayers);
        }}
        back={setDisplayPossession}
        next={setDisplayPossession}
        isChangePlayers={true}
        hideCloseIcon={true}
        firstPlayers={firstPlayers}
        setFirstPlayers={setFirstPlayers}
        secondPlayers={secondPlayers}
        setSecondPlayers={setSecondPlayers}
        user={user}
      />

      <TypeAttack
        display={displayTypeAttack}
        toggle={() => {
          togglePopUp(displayTypeAttack, setDisplayTypeAttack);
        }}
        next={setDisplayResultAttack}
        back={setDisplayPossession}
        getattackType={getattackType}
        setAttackTypeChoosen={setAttackTypeChoosen}
      />

      <ResultAttack
        display={displayResultAttack}
        toggle={() => {
          togglePopUp(displayResultAttack, setDisplayResultAttack);
        }}
        back={setDisplayTypeAttack}
        nextFoul={setDisplayFoulResult}
        nextCompletion={setDisplayCompletionResult}
        nextLoss={setDisplayLossResult}
      />

      <FoulResult
        display={displayFoulResult}
        toggle={() => {
          togglePopUp(displayFoulResult, setDisplayFoulResult);
        }}
        back={setDisplayResultAttack}
        nextEnd={setDisplayActionSaved}
        nextOneThrow={setDisplayThrowOne}
        nextTwoThrow={setDisplayThrowTwo}
        nextThreeThrow={setDisplayThrowThree}
        nextTeamFoul={setDisplayTeamFoul}
        getFoulOptions={getFoulOptions}
        setFoulOptionChoosen={setFoulOptionChoosen}
      />
      <CompletionResult
        display={displayCompletionResult}
        toggle={() => {
          togglePopUp(displayCompletionResult, setDisplayCompletionResult);
        }}
        back={setDisplayResultAttack}
        next={setDisplayChooseZone}
        setPlayTypeChoosen={setPlayTypeChoosen}
        getPlayType={getPlayType}
      />
      <LossResult
        display={displayLossResult}
        toggle={() => {
          togglePopUp(displayLossResult, setDisplayLossResult);
        }}
        back={setDisplayResultAttack}
        next={setDisplayActionSaved}
        getLossOptions={getLossOptions}
        setLossOptionChoosen={setLossOptionChoosen}
      />
      <ThrowOne
        display={displayThrowOne}
        toggle={() => {
          togglePopUp(displayThrowOne, setDisplayThrowOne);
        }}
        next={setDisplayActionSaved}
      />
      <ThrowTwo
        display={displayThrowTwo}
        toggle={() => {
          togglePopUp(displayThrowTwo, setDisplayThrowTwo);
        }}
        next={setDisplayActionSaved}
      />
      <ThrowThree
        display={displayThrowThree}
        toggle={() => {
          togglePopUp(displayThrowThree, setDisplayThrowThree);
        }}
        next={setDisplayActionSaved}
      />
      <TeamFoul
        display={displayTeamFoul}
        toggle={() => {
          togglePopUp(displayTeamFoul, setDisplayTeamFoul);
        }}
        next={setDisplayPlayerPenalty}
      />
      <PlayerPenalty
        display={displayPlayerPenalty}
        toggle={() => {
          togglePopUp(displayPlayerPenalty, setDisplayPlayerPenalty);
        }}
        next={setDisplayThrowResult}
      />
      <ThrowResult
        display={displayThrowResult}
        toggle={() => {
          togglePopUp(displayThrowResult, setDisplayThrowResult);
        }}
        nextThrow={setDisplayAssist}
        next={setDisplayActionSaved}
      />
      <Assist
        display={displayAssist}
        toggle={() => {
          togglePopUp(displayAssist, setDisplayAssist);
        }}
        next={setDisplayActionSaved}
      />

      <ChooseZone
        display={displayChooseZone}
        toggle={() => {
          togglePopUp(displayChooseZone, setDisplayChooseZone);
        }}
        next={setDisplayThrowResult}
      />

      <PopUpConfirmation
        header="Готово!"
        description="действие записано"
        buttonDescription="Ok"
        display={displayActionSaved}
        lineHr={true}
        toggle={() => {
          togglePopUp(displayActionSaved, setDisplayActionSaved);
        }}
        next={setDisplayChooseTeam}
      />

      <FinishGame
        display={displayFinishGame}
        toggle={() => {
          togglePopUp(displayFinishGame, setDisplayFinishGame);
        }}
        back={setDisplayChooseTeam}
      />

      <BottomNavigationComponent page="games"></BottomNavigationComponent>
    </div>
  );
}
