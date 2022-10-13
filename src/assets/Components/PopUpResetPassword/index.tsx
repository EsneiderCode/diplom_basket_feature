import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  passwordHandler,
  emailHandler,
  rePasswordHandler,
  codeConfirmationHandler,
  validateCodeConfirmation,
  validateEmail,
  validatePassword,
  validateRePassword,
} from "../../Functions";
import "./popupresetpassword.scss";

interface PopUpProps {
  header: string;
  description: string;
  inputEmail?: boolean;
  inputPassword?: boolean;
  inputRePassword?: boolean;
  inputCode?: boolean;
  aditionalSpan?: string;
  redMessage?: string;
  buttonSendEmail?: boolean;
  buttonSendCode?: boolean;
  buttonSetNewPassword?: boolean;
  buttonToHome?: string;
  display: boolean;
  toggle: () => void;
  next?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PopUpResetPassword(props: PopUpProps) {
  const {
    header,
    description,
    inputEmail,
    inputPassword,
    inputRePassword,
    inputCode,
    aditionalSpan,
    buttonSendEmail,
    buttonSendCode,
    buttonSetNewPassword,
    buttonToHome,
    redMessage,
    display,
    toggle,
    next,
  } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [codeConfirmation, setCodeConfirmation] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [rePasswordError, setRePasswordError] = useState<boolean>(false);
  const [codeConfirmationError, setCodeConfirmationError] =
    useState<boolean>(false);

  function checkNextEmail(next: React.Dispatch<React.SetStateAction<boolean>>) {
    if (emailError === false && email !== "") {
      toggle();
      next(true);
    }
  }

  function checkNextCode(next: React.Dispatch<React.SetStateAction<boolean>>) {
    if (codeConfirmationError === false && codeConfirmation !== "") {
      toggle();
      next(true);
    }
  }

  function checkNextPassword(
    next: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (passwordError === false && password !== "") {
      toggle();
      next(true);
    }
  }

  return (
    <div
      className={
        display === true
          ? "popup-container popup-display-open"
          : "popup-container popup-display-closed"
      }
    >
      <div className="popup-content-container">
        <span className="popup-close-icon" onClick={() => toggle()}>
          &#x2715;
        </span>
        <h2 className="popup-title">{header}</h2>
        <form action="" className="popup-form">
          <p className="popup-description">{description}</p>
          {inputEmail === true && (
            <div className="input-container">
              <input
                type="email"
                name="email"
                id="email-login"
                className={
                  emailError === false && email.length >= 1
                    ? "input-basic input-active"
                    : emailError === true
                    ? "input-basic input-error"
                    : "input-basic input-inactive"
                }
                placeholder="Электронная почта"
                onChange={(e) => {
                  emailHandler(e, setEmail, setEmailError);
                }}
                onBlur={(e) => validateEmail(e, setEmailError)}
                required
              />
              <span
                className={
                  emailError === true
                    ? "format-invalid-open"
                    : "format-invalid-closed"
                }
              >
                *Неверный формат
              </span>
            </div>
          )}
          {inputPassword === true && (
            <div className="input-container">
              <input
                type="password"
                name="password"
                id="password-login"
                className={
                  passwordError === false && password.length >= 1
                    ? "input-basic input-active"
                    : passwordError === true
                    ? "input-basic input-error"
                    : "input-basic input-inactive"
                }
                placeholder="Пароль"
                onChange={(e) => {
                  passwordHandler(e, setPassword, setPasswordError);
                }}
                onBlur={(e) => validatePassword(e, setPasswordError)}
                required
              />
              <span
                className={
                  passwordError === true
                    ? "format-invalid-open"
                    : "format-invalid-closed"
                }
              >
                *Неверный формат
              </span>
            </div>
          )}
          {inputRePassword === true && (
            <div className="input-container">
              <input
                type="password"
                name="repassword"
                className={
                  rePasswordError === false && rePassword.length >= 1
                    ? "input-basic input-active"
                    : rePasswordError === true
                    ? "input-basic input-error"
                    : "input-basic input-inactive"
                }
                placeholder="Повторите пароль"
                onChange={(e) => {
                  rePasswordHandler(e, setRePassword, setRePasswordError);
                }}
                onBlur={(e) =>
                  validateRePassword(e, password, setRePasswordError)
                }
                required
              />
              <span
                className={
                  rePasswordError === true
                    ? "format-invalid-open"
                    : "format-invalid-closed"
                }
              >
                *Пароли не совпадают
              </span>
            </div>
          )}
          {inputCode === true && (
            <div className="input-container">
              <input
                type="text"
                name="code-confirmation"
                id="input-code-confirmation"
                className={
                  codeConfirmationError === false &&
                  codeConfirmation.length >= 1
                    ? "input-basic input-active"
                    : codeConfirmationError === true
                    ? "input-basic input-error"
                    : "input-basic input-inactive"
                }
                onBlur={(e) =>
                  validateCodeConfirmation(e, setCodeConfirmationError)
                }
                placeholder="Введите код"
                onChange={(e) => {
                  codeConfirmationHandler(
                    e,
                    setCodeConfirmation,
                    setCodeConfirmationError
                  );
                }}
                required
              />
              <span
                className={
                  codeConfirmationError === true
                    ? "format-invalid-open"
                    : "format-invalid-closed"
                }
              >
                *Неверный формат
              </span>
            </div>
          )}
          {aditionalSpan != null && (
            <span className="span-time-wait">{aditionalSpan}</span>
          )}
          {redMessage != null && (
            <span className="red-message">{redMessage}</span>
          )}
          {buttonSendEmail === true && next != null && (
            <button
              type="button"
              className="input-submit input-basic"
              onClick={() => {
                checkNextEmail(next);
              }}
            >
              Восстановить пароль
            </button>
          )}
          {buttonSendCode === true && next != null && (
            <button
              type="button"
              className="input-submit 
                       input-basic"
              onClick={() => {
                checkNextCode(next);
              }}
            >
              Подтвердить
            </button>
          )}
          {buttonSetNewPassword === true && next != null && (
            <button
              type="button"
              className="input-submit
                       input-basic"
              onClick={() => {
                checkNextPassword(next);
              }}
            >
              Подтвердить
            </button>
          )}
          {buttonToHome != null && (
            <NavLink className="input-submit input-basic" to="/">
              {buttonToHome}
            </NavLink>
          )}
        </form>
      </div>
    </div>
  );
}
