import "./possession.scss";
import { Player, TimeType } from "../../Interfaces";
// @ts-ignore
import { useLongPress } from "use-long-press";
interface Props {
  display: boolean;
  toggle: () => void;
  back: React.Dispatch<React.SetStateAction<boolean>>;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  timeType: TimeType[];
  setTimeTypeChoosen: React.Dispatch<React.SetStateAction<TimeType>>;
  timeTypeChoosen: TimeType;
  activePlayers: Player[];
  setPlayerChoosen: React.Dispatch<React.SetStateAction<Player>>;
  playerChoosen: Player;
  setSeconds: React.Dispatch<React.SetStateAction<string>>;
  seconds: string;
}

export default function Possession(props: Props) {
  const {
    display,
    toggle,
    back,
    next,
    timeType,
    setTimeTypeChoosen,
    timeTypeChoosen,
    activePlayers,
    setPlayerChoosen,
    playerChoosen,
    setSeconds,
    seconds,
  } = props;
  const onlyPlayersActive: Player[] = activePlayers.filter((player) => {
    return player.status === "firstFive";
  });
  const bind = useLongPress(() => {
    console.log("Long pressed!");
  });
  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <p className="category-title">Владение</p>
        <button
          className="back-button orange-button"
          onClick={() => {
            toggle();
            back(true);
          }}
        >
          &#8592;
        </button>
        <p className="category-title">Тип времени</p>
        <div className="type-time-container">
          {timeType.map((type: TimeType) => {
            return (
              <p
                onClick={() => setTimeTypeChoosen(type)}
                className={
                  timeTypeChoosen.id === type.id
                    ? " type-time-value active-time"
                    : "type-time-value"
                }
                key={type.id}
              >
                {type.time_type}
              </p>
            );
          })}
        </div>
        <p className="category-title">Владение мячом</p>
        <div className="possession-players">
          {onlyPlayersActive.map((player: Player) => {
            return (
              <p
                key={player.id}
                className={
                  playerChoosen.id === player.id
                    ? "player player-active"
                    : "player"
                }
                onClick={() => {
                  setPlayerChoosen(player);
                }}
                {...bind()}
              >
                {player.number}
              </p>
            );
          })}
        </div>
        <p className="category-title">Секунда на табло</p>
        <div className="input-segs-container">
          <label htmlFor="segs">{seconds}</label>
          <input
            defaultValue={seconds}
            type="range"
            name="segs"
            id="segs-range"
            min="1"
            max="24"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSeconds(e.target.value)
            }
          />
        </div>
        <button
          className="orange-button"
          onClick={() => {
            toggle();
            next(true);
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
