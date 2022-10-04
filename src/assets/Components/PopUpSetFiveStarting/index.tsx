import { useState } from "react";
import { DragAndDrop } from "../DragAndDrop/DragAndDrop";
import "./popupsetfivestarting.scss";

interface PopUpProps {
  description: string;
  buttonText?: string;
  display: boolean;
  toggleDisplay: () => void;
  back: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUpSetFiveStarting(props: PopUpProps) {
  const { description, display, toggleDisplay, back } = props;

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container">
        <span
          className="popup-back-icon five-starting-popup-back"
          onClick={() => {
            toggleDisplay();
            back(true);
          }}
        >
          &#60;
        </span>

        <h2 className="popup-title five-starting-title">Стартовая пятерка</h2>
        <span
          className="popup-close-icon five-starting-popup-close"
          onClick={() => toggleDisplay()}
        >
          &#x2715;
        </span>
        <p className="description five-starting-description">{description}</p>

        <DragAndDrop setButtonDisabled={setButtonDisabled} />

        <button className="button-continue" disabled={buttonDisabled}>
          Далее
        </button>
      </div>
    </div>
  );
}
