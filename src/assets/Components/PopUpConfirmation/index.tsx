import { NavLink } from "react-router-dom";

import "./popupconfirmation.scss";
interface PopUpProps {
  header: string;
  description: string;
  lineHr?: boolean;
  buttonDescription: string;
  display: boolean;
  linkTo: string;
  toggle: () => void;
}

export default function PopUpConfirmation(props: PopUpProps) {
  const {
    header,
    description,
    lineHr,
    buttonDescription,
    display,
    toggle,
    linkTo,
  } = props;

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div
        className={
          display === true
            ? "popup-confirmation-container popup-confirmation-open"
            : "popup-confirmation-container popup-confirmation-closed"
        }
      >
        <h2 className="popup-title">{header}</h2>
        <p className="popup-description">{description}</p>
        {lineHr === true && <hr className="linehr-basket" />}
        <NavLink className="link-to-home" to={linkTo} onClick={() => toggle()}>
          {buttonDescription}
        </NavLink>
      </div>
    </div>
  );
}
