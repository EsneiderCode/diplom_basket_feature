import { NavLink } from "react-router-dom";

import "./popupconfirmation.scss";
interface PopUpProps {
  header: string;
  description: string;
  lineHr?: boolean;
  buttonDescription: string;
  display: boolean;
  linkTo?: string;
  toggle: () => void;
  next?: React.Dispatch<React.SetStateAction<boolean>>;
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
    next,
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
        {linkTo != null ? (
          <NavLink
            className="link-to-home"
            to={linkTo}
            onClick={() => toggle()}
          >
            {buttonDescription}
          </NavLink>
        ) : (
          <button
            type="button"
            className="link-to-home"
            onClick={() => {
              toggle();
              next != null && next(true);
            }}
          >
            {buttonDescription}
          </button>
        )}
      </div>
    </div>
  );
}
