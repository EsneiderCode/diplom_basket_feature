import "./choosezone.scss";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  container: {
    maxWidth: "900px",
  },

  root: {
    fill: "white",
    stroke: "black",
    strokeWidth: "5px",
  },
  text: {
    fontFamily: "sf-pro-display-regular",
    fontSize: "36px",
  },
});

interface Props {
  display: boolean;
  toggle: () => void;
  next: React.Dispatch<React.SetStateAction<boolean>>;
  setZoneAttempt: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChooseZone(props: Props) {
  const { display, toggle, next, setZoneAttempt } = props;
  const classes = useStyles();

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-content-container-zone popup-game">
        <p className="category-title">Выберите зону</p>
        <div className={classes.container}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            enableBackground="new 0 0 1366 768"
            viewBox="0 0 1366 768"
          >
            <g
              id="1"
              onClick={() => {
                setZoneAttempt(1);
                toggle();
                next(true);
              }}
            >
              <path
                id="1"
                d="M12.03 250.49h176.12c-25.85-62.73-40.12-131.46-40.12-203.53h-136v203.53z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="2"
              onClick={() => {
                setZoneAttempt(2);
                toggle();
                next(true);
              }}
            >
              <path
                id="2"
                d="M550.7 565.07C386.05 523.3 251.88 405.12 188.15 250.48H12.03v470.47h499l39.67-155.88z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="3"
              onClick={() => {
                setZoneAttempt(3);
                toggle();
                next(true);
              }}
            >
              <path
                id="3"
                d="M682.53 581.46c-45.5 0-89.66-5.69-131.83-16.39l-39.67 155.89h343l-39.67-155.89c-42.17 10.7-86.33 16.39-131.83 16.39z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="4"
              onClick={() => {
                setZoneAttempt(4);
                toggle();
                next(true);
              }}
            >
              <path
                id="4"
                d="M1176.91 250.48c-63.73 154.64-197.9 272.82-362.55 314.59l39.67 155.89h499V250.49l-176.12-.01z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="5"
              onClick={() => {
                setZoneAttempt(5);
                toggle();
                next(true);
              }}
            >
              <path
                id="5"
                d="M1217.03 46.96c0 72.06-14.27 140.79-40.12 203.53h176.12V46.96h-136z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="6"
              onClick={() => {
                setZoneAttempt(6);
                toggle();
                next(true);
              }}
            >
              <path
                id="6"
                d="M1059.49 425.89c97.31-96.8 157.54-230.83 157.54-378.93h-196.5c0 93.65-38.1 178.4-99.63 239.62l138.59 139.31z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="7"
              onClick={() => {
                setZoneAttempt(7);
                toggle();
                next(true);
              }}
            >
              <path
                id="7"
                d="M814.36 565.07c94.17-23.89 178.37-72.77 245.13-139.18L920.9 286.58c-19.99 19.88-42.44 37.29-66.87 51.7a335.837 335.837 0 01-88.13 36.31l48.46 190.48z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="8"
              onClick={() => {
                setZoneAttempt(8);
                toggle();
                next(true);
              }}
            >
              <path
                id="8"
                d="M682.53 581.46c45.5 0 89.66-5.69 131.83-16.39L765.9 374.59c-26.67 6.76-54.6 10.37-83.37 10.37s-56.7-3.6-83.37-10.37L550.7 565.07c42.17 10.7 86.33 16.39 131.83 16.39z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="9"
              onClick={() => {
                setZoneAttempt(9);
                toggle();
                next(true);
              }}
            >
              <path
                id="9"
                d="M599.16 374.59a335.697 335.697 0 01-88.13-36.31 339.155 339.155 0 01-66.87-51.7L305.57 425.89c66.75 66.41 150.96 115.29 245.13 139.18l48.46-190.48z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="10"
              onClick={() => {
                setZoneAttempt(10);
                toggle();
                next(true);
              }}
            >
              <path
                id="10"
                d="M444.16 286.58c-61.53-61.21-99.63-145.96-99.63-239.62h-196.5c0 148.1 60.24 282.13 157.54 378.93l138.59-139.31z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="11"
              onClick={() => {
                setZoneAttempt(11);
                toggle();
                next(true);
              }}
            >
              <path
                id="11"
                d="M511.03 338.28c2.15 1.27 4.31 2.5 6.49 3.72l81.29-145.34c-52.37-29.35-87.78-85.39-87.78-149.7h-166.5c0 124.07 66.85 232.53 166.5 291.32z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="12"
              onClick={() => {
                setZoneAttempt(12);
                toggle();
                next(true);
              }}
            >
              <path
                id="12"
                d="M682.53 384.96c59.93 0 116.21-15.6 165.01-42.96l-81.29-145.34c-24.76 13.88-53.32 21.8-83.72 21.8s-58.96-7.92-83.72-21.8L517.52 342c48.8 27.35 105.08 42.96 165.01 42.96z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="13"
              onClick={() => {
                setZoneAttempt(13);
                toggle();
                next(true);
              }}
            >
              <path
                id="13"
                d="M847.54 342c2.18-1.22 4.34-2.45 6.49-3.72 99.65-58.79 166.5-167.25 166.5-291.32h-166.5c0 64.31-35.4 120.34-87.78 149.7L847.54 342z"
                className={classes.root}
              ></path>
            </g>
            <g
              id="14"
              onClick={() => {
                setZoneAttempt(14);
                toggle();
                next(true);
              }}
            >
              <path
                id="14"
                d="M682.53 218.46c94.72 0 171.5-76.78 171.5-171.5h-343c0 94.72 76.78 171.5 171.5 171.5z"
                className={classes.root}
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
