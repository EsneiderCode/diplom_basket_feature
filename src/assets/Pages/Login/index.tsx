
import React, { useState } from 'react';
import PopUpResetPassword from '../../Components/PopUpResetPassword';
import PopUpConfirmation from '../../Components/PopUpConfirmation';
import { NavLink } from 'react-router-dom';
import './login.scss';
import logoBasketFeature from '../../Images/Login/logo-basket-feature.png';
import { togglePopUp, emailHandler, passwordHandler } from '../../Functions';

export default function Login() {
    const [displayPopUpEmail, setDisplayPopUpEmail] = useState<boolean>(false);
    const [displayPopUpCodeConfirmation, setDisplayPopUpCodeConfirmation] = useState<boolean>(false);
    const [displayPopUpNewPassword, setDisplayPopUpNewPassword] = useState<boolean>(false);
    const [displayPopUpConfirmation, setDisplayPopUpConfirmation] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    return (
        <div className="login-container">
            <div className={
                (displayPopUpEmail === true ||
                displayPopUpCodeConfirmation === true ||
                displayPopUpNewPassword === true ||
                displayPopUpConfirmation === true)
                ? "login-content blur-container" : "login-content"}>
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
                            className={emailError === true ?
                                "input-basic input-active" :
                                "input-basic input-inactive"}
                            placeholder="Электронная почта"
                            onChange={(e) => { emailHandler(e, setEmail, setEmailError) }}
                            required
                        />
                        <span
                            className={emailError === true ?
                                "format-invalid-open" :
                                "format-invalid-closed"}>
                            *Неверный формат
                        </span>
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            name="password"
                            className={passwordError === true ?
                                "input-basic input-active" :
                                "input-basic input-inactive"}
                            placeholder="Пароль"
                            onChange={(e) => { passwordHandler(e, setPassword, setPasswordError) }}
                            required
                        />
                        <span
                            className={passwordError === true ?
                                "format-invalid-open" :
                                "format-invalid-closed"}>
                            *Неверный формат
                        </span>
                    </div>
                    <p className="reset-password-link">забыл пароль</p>
                    <input className="input-submit" type="submit" value="Войти" />
                    <NavLink className="signup-link" to="/sign-up">Зарегистрироваться</NavLink>
                </form>
            </div>
            <PopUpResetPassword
                header="Восстановить пароль"
                description="К какой почте привязан ваш аккаунт?"
                inputEmail={true}
                buttonSendEmail={true}
                display={displayPopUpEmail}
                toggle={() => togglePopUp(displayPopUpEmail, setDisplayPopUpEmail)}
            />
            <PopUpResetPassword
                header="Восстановить пароль"
                description="Вам на почту был отправлен код для восстановления"
                inputCode={true}
                aditionalSpan="повторный код через 0:15"
                buttonSendCode={true}
                display={displayPopUpCodeConfirmation}
                toggle={() => togglePopUp(displayPopUpCodeConfirmation, setDisplayPopUpCodeConfirmation)}
            />
            <PopUpResetPassword
                header="Восстановить пароль"
                description="Введите новый пароль"
                inputPassword={true}
                inputRePassword={true}
                buttonSetNewPassword={true}
                display={displayPopUpNewPassword}
                toggle={() => togglePopUp(displayPopUpNewPassword, setDisplayPopUpNewPassword)}
            />
            <PopUpConfirmation
                header="Пароль изменен"
                description="Войдите заново"
                lineHr={true}
                buttonDescription="Ок"
                display={displayPopUpConfirmation}
                toggle={() => togglePopUp(displayPopUpConfirmation, setDisplayPopUpConfirmation)}
            />
        </div>

    );
}