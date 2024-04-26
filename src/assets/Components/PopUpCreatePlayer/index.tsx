import axios from "axios";
import { useState } from "react";
import { Team } from "../../Interfaces";
import { User } from "../../Interfaces";
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
import { store } from "../../../app/store";
import { addPlayerFetch, fetchPlayers } from "../../Pages/Players/playerSlice";

interface PopUpProps {
  display: boolean;
  toggleDisplay: () => void;
  team: Team;
  user: User;
}

export default function PopUpCreatePlayer(props: PopUpProps) {
  const { display, toggleDisplay, team, user } = props;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [fatherName, setFatherName] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const [nameError, setNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [pseudonimError, setPseudonimError] = useState<boolean>(false);
  const [numberError, setNumberError] = useState<boolean>(false);

  const handleSubmit = async () => {
    if ((firstName !== "" || lastName !== "") && numberError === false) {
      const data = {
        user_id: user.user.id,
        team_id: team.id,
        number: number,
        first_name: firstName,
        name: lastName,
        father_name: fatherName,
      };

      try {
        await store.dispatch(addPlayerFetch({ user, data }));
        await store.dispatch(fetchPlayers({ user, team }));
        setLastName("");
        setFirstName("");
        setFatherName("");
        setNumber(0);
        toggleDisplay();
      } catch (error) {
        console.error("Error adding new team:", error);
      }
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
              name="firstName"
              className={
                nameError === false && firstName.length >= 1
                  ? "input-basic input-active"
                  : nameError === true
                  ? "input-basic input-error"
                  : "input-basic input-inactive"
              }
              placeholder="Имя"
              onChange={(e) => {
                namePlayerHandler(e, setFirstName, setNameError);
              }}
              onBlur={(e) => validateNamePlayer(e, setNameError)}
              value={firstName}
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
                pseudonimError === false && fatherName.length >= 1
                  ? "input-basic input-active"
                  : pseudonimError === true
                  ? "input-basic input-error"
                  : "input-basic input-inactive"
              }
              placeholder="Отчество"
              onChange={(e) => {
                psudonimPlayerHandler(e, setFatherName, setPseudonimError);
              }}
              onBlur={(e) => validatePsudonimPlayer(e, setPseudonimError)}
              value={fatherName}
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
              handleSubmit();
            }}
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
}
