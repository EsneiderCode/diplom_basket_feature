import { useState } from "react";
import "./possession.scss";

interface Props {
  display: boolean;
  toggle: () => void;
  back: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Possession(props: Props) {
  const [rangeValue, setRangeValue] = useState<string>("1");
  const { display, toggle, back } = props;
  const [typeTime, setTypeTime] = useState<number>(24);

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
          <p
            onClick={() => setTypeTime(12)}
            className={
              typeTime === 12
                ? " type-time-value active-time"
                : "type-time-value"
            }
          >
            12
          </p>
          <p
            onClick={() => setTypeTime(24)}
            className={
              typeTime === 24
                ? " type-time-value active-time"
                : "type-time-value"
            }
          >
            24
          </p>
        </div>
        <p className="category-title">Владение мячом</p>
        <div className="possession-players">
          <p className="player">0</p>
          <p className="player">25</p>
          <p className="player player-active">31</p>
          <p className="player">41</p>
          <p className="player">43</p>
        </div>
        <p className="category-title">Секунда на табло</p>
        <div className="input-segs-container">
          <label htmlFor="segs">{rangeValue}</label>
          <input
            defaultValue="1"
            type="range"
            name="segs"
            id="segs-range"
            min="1"
            max="24"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRangeValue(e.target.value)
            }
          />
        </div>
        <button className="orange-button">Ok</button>
      </div>
    </div>
  );
}
