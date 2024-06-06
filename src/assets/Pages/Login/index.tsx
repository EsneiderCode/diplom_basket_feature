import React, { useState } from "react";
import axios from "axios";
import PopUpResetPassword from "../../Components/PopUpResetPassword";
import PopUpConfirmation from "../../Components/PopUpConfirmation";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.scss";
import logoBasketFeature from "../../Images/Login/logo-basket-feature.png";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import { errorMessages } from "../../utils/errorMessages";
import { successMessages } from "../../utils/successMessages";
import "react-toastify/dist/ReactToastify.css";
import {
  togglePopUp,
  emailHandler,
  passwordHandler,
  validatePassword,
  validateEmail,
} from "../../Functions";

export default function Login() {
  const [displayPopUpEmail, setDisplayPopUpEmail] = useState<boolean>(false);
  const [displayPopUpCodeConfirmation, setDisplayPopUpCodeConfirmation] =
    useState<boolean>(false);
  const [displayPopUpNewPassword, setDisplayPopUpNewPassword] =
    useState<boolean>(false);
  const [displayPopUpConfirmation, setDisplayPopUpConfirmation] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [incorrectCredentials, setIncorrectCredentials] =
    useState<boolean>(false);
  const navigate = useNavigate();

  function checkNextLogin() {
    if (email === "" && password === "") {
      toast.error(errorMessages.loginIsEmpty);
      return;
    }
    if (email === "" || emailError) {
      toast.error(errorMessages.emailFormatError);
      return;
    }

    if (passwordError) {
      toast.error(errorMessages.passwordInvalidError);
      return;
    }
    if (password.length < 6) {
      toast.error(errorMessages.passwordLengthError);
      return;
    }
    if (
      emailError === false &&
      passwordError === false &&
      email !== "" &&
      password !== ""
    ) {
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          apikey: `${process.env.REACT_APP_SERVER_API}`,
        },
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/v1/token?grant_type=password`,
        {
          email,
          password,
        },
        config
      );

      if (res.status === 200) {
        toast.success(successMessages.successLogin);
        localStorage.setItem("user", JSON.stringify(res.data));
        setTimeout(() => {
          navigate("/teams");
        }, 2000);
      } else {
        console.log(res);
        toast.error(errorMessages.userDoesNotExist);
      }
    } catch (e: any) {
      if (e?.response.data.detail === "Wrong password") {
        toast.error(errorMessages.userDoesNotExist);
        setIncorrectCredentials(true);
        setTimeout(() => {
          setIncorrectCredentials(false);
        }, 3000);
      }
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <div
        className={
          displayPopUpEmail === true ||
          displayPopUpCodeConfirmation === true ||
          displayPopUpNewPassword === true ||
          displayPopUpConfirmation === true
            ? "login-content blur-container"
            : "login-content"
        }
      >
        <img
          src={logoBasketFeature}
          alt="basket-feature"
          className="logo-basket-feature"
        />
        <form action="" className="login-form">
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
            <span
              className={
                incorrectCredentials === true
                  ? "format-invalid-open"
                  : "format-invalid-closed"
              }
            >
              *Неверные данные
            </span>
          </div>
          <p
            className="reset-password-link"
            onClick={() => setDisplayPopUpEmail(true)}
          >
            забыл пароль
          </p>
          <button
            type="button"
            className="input-submit"
            onClick={() => {
              checkNextLogin();
            }}
          >
            Войти
          </button>
          <NavLink className="signup-link" to="/sign-up">
            Зарегистрироваться
          </NavLink>
        </form>
      </div>
      <PopUpResetPassword
        header="Восстановить пароль"
        description="К какой почте привязан ваш аккаунт?"
        inputEmail={true}
        buttonSendEmail={true}
        display={displayPopUpEmail}
        toggle={() => togglePopUp(displayPopUpEmail, setDisplayPopUpEmail)}
        next={setDisplayPopUpCodeConfirmation}
      />
      <PopUpResetPassword
        header="Восстановить пароль"
        description="Вам на почту был отправлен код для восстановления"
        inputCode={true}
        aditionalSpan="повторный код через 0:15"
        buttonSendCode={true}
        next={setDisplayPopUpNewPassword}
        display={displayPopUpCodeConfirmation}
        toggle={() =>
          togglePopUp(
            displayPopUpCodeConfirmation,
            setDisplayPopUpCodeConfirmation
          )
        }
      />
      <PopUpResetPassword
        header="Восстановить пароль"
        description="Введите новый пароль"
        inputPassword={true}
        inputRePassword={true}
        buttonSetNewPassword={true}
        display={displayPopUpNewPassword}
        next={setDisplayPopUpConfirmation}
        toggle={() =>
          togglePopUp(displayPopUpNewPassword, setDisplayPopUpNewPassword)
        }
      />
      <PopUpConfirmation
        header="Пароль изменен"
        description="Войдите заново"
        lineHr={true}
        buttonDescription="Ок"
        display={displayPopUpConfirmation}
        linkTo="/"
        toggle={() =>
          togglePopUp(displayPopUpConfirmation, setDisplayPopUpConfirmation)
        }
      />
      <ToastContainer />
    </div>
  );
}
