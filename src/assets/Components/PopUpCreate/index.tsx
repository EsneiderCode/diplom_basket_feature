import { useState } from "react";
import Select from "react-select";
import { NavLink } from "react-router-dom";
 
import "./popupcreate.scss";

interface PopUpProps {
  header: string;
  chooseTeamA?: boolean;
  chooseTeamB?: boolean;
  chooseDate?: boolean;
  buttonText?: string,
  display: boolean;
  toggle: () => void;
}

export default function PopUpCreate(props: PopUpProps) {
  const {
    header,
    chooseTeamA,
    chooseTeamB,
    chooseDate,
    buttonText,
    display,
    toggle,
  } = props;

  const localTeams = [
    {label: "Moscu", value: "Moscu"},
    {label: "Taganrog", value: "Taganrog"},
    {label: "Tver", value: "Tver"},
  ]

  

  const oponentTeams = [
    {label: "Rostov", value: "Rostov"},
    {label: "Krasnodar", value: "Krasnodar"},
    {label: "Kazan", value: "Kazan"},
  ]

  return (
    <div className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }>
    <div
      className="popup-content-container"
    >
      <span className="popup-close-icon" onClick={() => toggle()}>
        &#x2715;
      </span>
      <h2 className="popup-title">{header}</h2>
      <form action="" className="popup-form">
        {chooseTeamA === true && 
        <Select
        className="select-basic"
        defaultValue={{label:"Выберите команду А", value:"none"}}
        options={localTeams}
       />}
       {chooseTeamB === true && <Select 
        className="select-basic"
        defaultValue={{label:"Выберите команду Б", value:"none"}}
        options={oponentTeams}
       />}

       {chooseDate === true && 
        <input className="input-date" type="date" name="date" id="date-game" />}
       
       {buttonText !== "" && <p className="button-continue">{buttonText}</p>}
      </form>
    </div>
    </div>
  );
}
