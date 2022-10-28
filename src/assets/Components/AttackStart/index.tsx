import { useState } from "react";
import "./attackstart.scss";

interface Props{
    display:boolean;
}


export default function AttackStart(props:Props) {
const {display} = props;

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
      
            <p className="category-title">Начало атаки</p>
            <ul className="type-attacks-ul">
                <li  className="attack-type">подбор</li>
                <li  className="attack-type">перехват</li>
                <li  className="attack-type">лицевая</li>
                <li  className="attack-type">мертвый мяч</li>
                <li  className="attack-type">подбор в нап.</li>
            </ul>
            <button className="back-button">&#8592;</button>
      </div>
    </div>
  );
}