import { useState } from "react";
import "./games.scss";
import PopUpCreateGame from "../../Components/PopUpCreateGame";
import PopUpSetFiveStarting from "../../Components/PopUpSetFiveStarting";
import { togglePopUp } from "../../Functions";

export default function Games() {
  const [displayPopUpCreate, setDisplayPopUpCreate] = useState<boolean>(false);
  const [displayPopUpSetFiveStarting, setDisplaySetFiveStarting] =
    useState<boolean>(false);
  return (
    <div className="games-container">
      <div className="games-content">
        <div className="header-games">
          <h2 className="page-title">Игры</h2>
          <span
            className="icon-new-games"
            onClick={() => {
              setDisplayPopUpCreate(true);
            }}
          >
            +
          </span>
        </div>
        <span className="link-create-new-games">Создайте игру</span>
        <ul className="list-games">
          <li className="game-container">
            <div className="game-info-container">
              <div className="teams">
                <span>Таганрог</span>
                <span>-</span>
                <span>Rostov</span>
              </div>
              <span className="date-game">21.09.2022</span>
            </div>
            <div className="options-container">
              <div className="option-game share-game">
                <svg
                  width="26"
                  height="35"
                  viewBox="0 0 26 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3 8.1L13 2.8L7.70005 8.1L6.30005 6.7L13 0L19.7001 6.7L18.3 8.1Z"
                    fill="white"
                  />
                  <path d="M12 1.3999H14V22.3999H12V1.3999Z" fill="white" />
                  <path
                    d="M23 34.3999H3C1.3 34.3999 0 33.0999 0 31.3999V13.3999C0 11.6999 1.3 10.3999 3 10.3999H10V12.3999H3C2.4 12.3999 2 12.7999 2 13.3999V31.3999C2 31.9999 2.4 32.3999 3 32.3999H23C23.6 32.3999 24 31.9999 24 31.3999V13.3999C24 12.7999 23.6 12.3999 23 12.3999H16V10.3999H23C24.7 10.3999 26 11.6999 26 13.3999V31.3999C26 33.0999 24.7 34.3999 23 34.3999Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="option-game edit-game">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.9577 5.76473L22.1626 0.952358C21.5368 0.362397 20.7167 0.0238854 19.8584 0.00121672C19.0001 -0.021452 18.1634 0.273304 17.5076 0.829415L1.75737 16.6365C1.19171 17.209 0.839497 17.9593 0.759863 18.7616L0.00735525 26.0856C-0.0162193 26.3428 0.0170404 26.6021 0.104763 26.845C0.192486 27.0878 0.332513 27.3083 0.514861 27.4906C0.678383 27.6534 0.872313 27.7822 1.08553 27.8696C1.29875 27.957 1.52706 28.0013 1.75737 28H1.91488L9.21246 27.3326C10.0119 27.2526 10.7595 26.8992 11.33 26.3314L27.0802 10.5244C27.6915 9.87626 28.0218 9.01133 27.9989 8.11916C27.9759 7.22699 27.6015 6.38033 26.9577 5.76473V5.76473ZM8.89745 23.8199L3.6474 24.3117L4.1199 19.0426L14.0075 9.24228L18.7326 13.9844L8.89745 23.8199ZM21.0076 11.6309L16.3175 6.92391L19.7301 3.41123L24.5076 8.20604L21.0076 11.6309Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="option-game delete-game">
                <svg
                  width="30"
                  height="29"
                  viewBox="0 0 30 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.6936 16.7944L26.2079 28.3086L28.3292 26.1873L16.815 14.6731L29.1634 2.32466L27.0421 0.20334L14.6936 12.5518L2.49037 0.348494L0.369052 2.46981L12.5723 14.6731L1.20327 26.0421L3.32459 28.1635L14.6936 16.7944Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <PopUpCreateGame
        header="Новая игра"
        chooseTeamA={true}
        chooseTeamB={true}
        chooseDate={true}
        display={displayPopUpCreate}
        toggleDisplay={() => {
          togglePopUp(displayPopUpCreate, setDisplayPopUpCreate);
        }}
        next={setDisplaySetFiveStarting}
      />
      <PopUpSetFiveStarting
        description="Москва"
        display={displayPopUpSetFiveStarting}
        toggleDisplay={() => {
          togglePopUp(displayPopUpSetFiveStarting, setDisplaySetFiveStarting);
        }}
        back={setDisplayPopUpCreate}
      />
    </div>
  );
}
