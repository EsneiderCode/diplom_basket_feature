import "./throwone.scss";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { orange } from "@mui/material/colors";
import { useState } from "react";

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  stateFirstBall: boolean;
  stateSecondBall: boolean;
  stateThirdBall: boolean;
  setStateFirstBall: React.Dispatch<React.SetStateAction<boolean>>;
  setStateSecondBall: React.Dispatch<React.SetStateAction<boolean>>;
  setStateThirdBall: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ThrowTwo(props: Props) {
  const {
    display,
    toggle,
    next,
    stateFirstBall,
    stateSecondBall,
    stateThirdBall,
    setStateFirstBall,
    setStateSecondBall,
    setStateThirdBall,
  } = props;

  function toggleOneBall() {
    if (stateSecondBall === true && stateFirstBall === true) {
      setStateSecondBall(false);
    } else if (stateSecondBall === false && stateFirstBall === true) {
      setStateFirstBall(false);
    } else {
      setStateFirstBall(true);
    }
  }

  function toggleTwoBalls() {
    setStateSecondBall(!stateSecondBall);
    setStateFirstBall(!stateSecondBall);
    if (stateThirdBall === true) {
      setStateThirdBall(false);
    }
  }
  function toggleThreeBalls() {
    setStateFirstBall(!stateThirdBall);
    setStateSecondBall(!stateThirdBall);
    setStateThirdBall(!stateThirdBall);
  }
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
            onClick={() => {
              toggleOneBall();
            }}
            className={
              stateFirstBall === true
                ? "basket-ball-icon basket-ball-icon-active"
                : "basket-ball-icon"
            }
          />
          <SportsBasketballIcon
            sx={{ fontSize: 60 }}
            onClick={() => {
              toggleTwoBalls();
            }}
            className={
              stateSecondBall === true
                ? "basket-ball-icon basket-ball-icon-active"
                : "basket-ball-icon"
            }
          />
          <SportsBasketballIcon
            sx={{ fontSize: 60 }}
            onClick={() => {
              toggleThreeBalls();
            }}
            className={
              stateThirdBall === true
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
