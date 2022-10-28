import { useState } from "react";
import "./choosetime.scss";

interface Props{
    display:boolean;
}


export default function ChooseTime(props:Props) {
const {display} = props;
const [timeChoosen, setTimeChoosen] = useState<number>(1);


  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container popup-game">
        <section className="time-section">
            <p className="category-title">Тайм</p>
            <ul className="alltimes-ul">
                <li onClick={()=>setTimeChoosen(1)} className={timeChoosen === 1 ? "active-time" : "alltimes-ul"}>1</li>
                <li onClick={()=>setTimeChoosen(2)} className={timeChoosen === 2 ? "active-time" : "alltimes-ul"}>2</li>
                <li onClick={()=>setTimeChoosen(3)} className={timeChoosen === 3 ? "active-time" : "alltimes-ul"}>3</li>
                <li onClick={()=>setTimeChoosen(4)} className={timeChoosen === 4 ? "active-time" : "alltimes-ul"}>4</li>
                <li onClick={()=>setTimeChoosen(5)} className={timeChoosen === 5 ? "active-time" : "alltimes-ul"}>от</li>
            </ul>
        </section>
        <p className="category-title">Команда</p>
         <section className="teams-section">
            <div className="team-info-container">
                <p className="team-name">
                    Химки
                </p>
            </div>
            <div className="team-info-container">
                <p className="team-name">
                    ЦСКА
                </p>
            </div>
        </section>
         <section className="actions-section">
            <div className="close-action">
                <p className="content-action">X</p>
            </div>
            <div className="table-action">
                <p className="content-action">Таблица</p>
            </div>
        </section>
      </div>
    </div>
  );
}