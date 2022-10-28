import axios from "axios";
import { useState } from "react";
import { Team } from "../../Interfaces";
import {
  validateNamePlayer,
  validateLastnamePlayer,
  validatePsudonimPlayer,
  validateNumberPlayer,
  namePlayerHandler,
  lastnamePlayerHandler,
  psudonimPlayerHandler,
  numberPlayerHandler,
} from "../../Functions";
import "./popupcreateplayer.scss";

interface PopUpProps {
  display: boolean;
  toggleDisplay: () => void;
  getPlayers: () => void;
  team: Team;
}

export default function PopUpCreatePlayer(props: PopUpProps) {
  const { display, toggleDisplay, team, getPlayers } = props;
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [pseudonim, setPseudonim] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [nameError, setNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [pseudonimError, setPseudonimError] = useState<boolean>(false);
  const [numberError, setNumberError] = useState<boolean>(false);

  function checkSubmit() {
    if ((name !== "" || lastName !== "") && numberError === false) {
      createPlayer(team);
    }
  }

  const createPlayer = async (team: Team) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/players/create/${team.id}`,
        {
          number: number,
          first_name: name,
          last_name: lastName,
          middle_name: pseudonim,
        }
      );
      if (res.status === 200) {
        getPlayers();
        setLastName("");
        setName("");
        setPseudonim("");
        toggleDisplay();
      } else {
        console.log(res);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container">
        <span className="popup-close-icon" onClick={() => toggleDisplay()}>
          &#x2715;
        </span>
        <h2 className="popup-title">Новый игрок</h2>
        <form action="" className="popup-form">
          <div className="input-container">
            <input
              type="text"
              name="lastname"
              className={
                lastNameError === false && lastName.length >= 1
                  ? "input-basic input-active"
                  : lastNameError === true
                  ? "input-basic input-error"
                  : "input-basic input-inactive"
              }
              placeholder="Фамилия"
              onChange={(e) => {
                lastnamePlayerHandler(e, setLastName, setLastNameError);
              }}
              onBlur={(e) => validateLastnamePlayer(e, setLastNameError)}
              value={lastName}
              required
            />
            <span
              className={
                lastNameError === true
                  ? "format-invalid-open"
                  : "format-invalid-closed"
              }
            >
              *Неверный формат
            </span>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="name"
              className={
                nameError === false && name.length >= 1
                  ? "input-basic input-active"
                  : nameError === true
                  ? "input-basic input-error"
                  : "input-basic input-inactive"
              }
              placeholder="Имя"
              onChange={(e) => {
                namePlayerHandler(e, setName, setNameError);
              }}
              onBlur={(e) => validateNamePlayer(e, setNameError)}
              value={name}
              required
            />
            <span
              className={
                nameError === true
                  ? "format-invalid-open"
                  : "format-invalid-closed"
              }
            >
              *Неверный формат
            </span>
          </div>
          <div className="input-container">
            <input
              type="text"
              name="psudonim"
              className={
                pseudonimError === false && pseudonim.length >= 1
                  ? "input-basic input-active"
                  : pseudonimError === true
                  ? "input-basic input-error"
                  : "input-basic input-inactive"
              }
              placeholder="Отчество"
              onChange={(e) => {
                psudonimPlayerHandler(e, setPseudonim, setPseudonimError);
              }}
              onBlur={(e) => validatePsudonimPlayer(e, setPseudonimError)}
              value={pseudonim}
              required
            />
            <span
              className={
                pseudonimError === true
                  ? "format-invalid-open"
                  : "format-invalid-closed"
              }
            >
              *Неверный формат
            </span>
          </div>
          <div className="input-container">
            <input
              type="number"
              name="number"
              className={
                numberError === false && number >= 1
                  ? "input-basic input-active"
                  : numberError === true
                  ? "input-basic input-error"
                  : "input-basic input-inactive"
              }
              placeholder="Номер*"
              onChange={(e) => {
                numberPlayerHandler(e, setNumber, setNameError);
              }}
              onBlur={(e) => validateNumberPlayer(e, setNumberError)}
              min="0"
              value={number}
              required
            />
            <span
              className={
                numberError === true
                  ? "format-invalid-open"
                  : "format-invalid-closed"
              }
            >
              *Неверный формат
            </span>
          </div>
          <button
            type="button"
            className="button-continue"
            onClick={() => {
              checkSubmit();
            }}
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
}
