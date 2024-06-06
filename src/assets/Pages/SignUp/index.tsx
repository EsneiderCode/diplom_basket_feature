import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { errorMessages } from "../../utils/errorMessages";
import { successMessages } from "../../utils/successMessages";
export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [rePassword, setRePassword] = useState<string>("");
  const [rePasswordError, setRePasswordError] = useState<boolean>(false);
  const [displayPopUpEmailConfirmation, setDisplayPopUpEmailConfirmation] =
    useState<boolean>(false);
  const [emailExists, setEmailExists] = useState<boolean>(false);

  function checkNextSignUp() {
    if (email === "" && password === "" && rePassword === "") {
      toast.error(errorMessages.registrationIsEmpty);
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

    if (rePasswordError) {
      toast.error(errorMessages.passwordsDoNotMatchError);
      return;
    }
    if (password.length < 6) {
      toast.error(errorMessages.passwordLengthError);
      return;
    }

    if (password !== rePassword) {
      toast.error(errorMessages.passwordsDoNotMatchError);
      return;
    }

    setTimeout(() => {
      handleSubmit();
    }, 2000);
  }

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          apikey: `${process.env.REACT_APP_SERVER_API}`,
        },
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/v1/signup`,
        {
          email,
          password,
        },
        config
      );
      if (res.status === 200) {
        toast.success(successMessages.successSignUp);
        setEmailExists(false);
        setDisplayPopUpEmailConfirmation(true);
      } else {
        toast.error(errorMessages.emailAlreadyRegisteredError);
        setEmailExists(true);
        console.log(res);
      }
    } catch (e: any) {
      toast.error(errorMessages.emailAlreadyRegisteredError);
      if (e?.response.data.detail === "Email already registered") {
        setEmailExists(true);
        setTimeout(() => {
          setEmailExists(false);
        }, 3000);
      }
    }
  };
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
            <span
              className={
                emailExists === true
                  ? "format-invalid-open"
                  : "format-invalid-closed"
              }
            >
              *Данная почта уже зарегистрирована
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
              checkNextSignUp();
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
      <ToastContainer />
    </div>
  );
}
