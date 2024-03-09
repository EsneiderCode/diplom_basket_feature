import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  emailHandler,
  passwordHandler,
  rePasswordHandler,
  togglePopUp,
  validateEmail,
  validatePassword,
  validateRePassword,
} from "../../Functions";
import PopUpResetPassword from "../../Components/PopUpResetPassword";
import "./signup.scss";
import { Helmet } from "react-helmet";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [rePassword, setRePassword] = useState<string>("");
  const [rePasswordError, setRePasswordError] = useState<boolean>(false);
  const [displayPopUpEmailConfirmation, setDisplayPopUpEmailConfirmation] =
    useState<boolean>(false);

  function checkNextResetPassword() {
    if (
      emailError === false &&
      passwordError === false &&
      rePasswordError === false &&
      email !== "" &&
      password !== "" &&
      rePassword !== ""
    ) {
      setDisplayPopUpEmailConfirmation(true);
    }
  }

  return (
    <div className="signup-container">
      <Helmet>
        <title>Регистрация</title>
      </Helmet>
      <div
        className={
          displayPopUpEmailConfirmation === true
            ? "signup-content blur-container"
            : "signup-content"
        }
      >
        <form action="" className="form-signup">
          <h2 className="title-page">Регистрация</h2>
          <div className="input-container">
            <input
              type="email"
              name="email"
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
          <label className="label-password" htmlFor="password">
            Пароль должен содержать минимум 8 символов латинскими буквами, а
            также хотя бы одну цифру
          </label>
          <div className="input-container">
            <input
              type="password"
              name="password"
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
          <button
            type="button"
            className="input-submit input-basic"
            onClick={() => {
              checkNextResetPassword();
            }}
          >
            Зарегистрироваться
          </button>
          <NavLink className="forgot-password" to="/">
            уже есть аккаунт
          </NavLink>
        </form>
      </div>
      <PopUpResetPassword
        header="Подтверждение почты"
        description="Вам на почту был отправлена ссылка для подтверждения. Пройдите по ссылке, чтобы активировать ваш аккаунт."
        redMessage="*аккаунт не подтвержден, пройдите по ссылке в письме"
        display={displayPopUpEmailConfirmation}
        toggle={() =>
          togglePopUp(
            displayPopUpEmailConfirmation,
            setDisplayPopUpEmailConfirmation
          )
        }
        buttonToHome="Подтвердить"
      />
    </div>
  );
}
