import "./throwone.scss";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { orange } from "@mui/material/colors";
import { useState } from "react";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ThrowOne(props: Props) {
  const { display, toggle, next } = props;
  const [stateBall, setStateBall] = useState<boolean>(false);
  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <p className="category-title">Забитые мячи</p>
        <div className="ball-list">
          <SportsBasketballIcon
            sx={{ fontSize: 60 }}
            onClick={() => setStateBall(!stateBall)}
            className={
              stateBall === true
                ? "basket-ball-icon basket-ball-icon-active"
                : "basket-ball-icon"
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
          Засчитать
        </button>
      </div>
    </div>
  );
}
