import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { emailHandler, passwordHandler, rePasswordHandler, togglePopUp } from "../../Functions";
import PopUpResetPassword from "../../Components/PopUpResetPassword";
import './signup.scss';

export default function SignUp(){
const [email, setEmail] = useState<string>("");
const [emailError, setEmailError] = useState<boolean>(false);
const [password, setPassword] = useState<string>("");
const [passwordError, setPasswordError] = useState<boolean>(false);
const [rePassword, setRePassword] = useState<string>("");
const [rePasswordError, setRePasswordError] = useState<boolean>(false);
const [displayPopUpEmailConfirmation, setDisplayPopUpEmailConfirmation] = useState<boolean>(false);

    return(
            <div className="signup-container">
                <div className={displayPopUpEmailConfirmation === true ? "signup-content blur-container" : "signup-content"}>
                    <form action="" className="form-signup">
                        <h2 className="title-page">Регистрация</h2>
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
                            <span  className={emailError === true ?
                                "format-invalid-open" :
                                "format-invalid-closed"}>*Неверный формат</span>
                        </div>
                        <label className="label-password" htmlFor="password">Пароль должен содержать минимум 8 символов латинскими буквами, а также хотя бы одну цифру</label>
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
                            <span  className={passwordError === true ?
                                "format-invalid-open" :
                                "format-invalid-closed"}>*Неверный формат</span>
                        </div>
                        <div className="input-container">
                            <input 
                                type="password" 
                                name="repassword" 
                                className={rePasswordError === true ?
                                    "input-basic input-active" :
                                    "input-basic input-inactive"}  
                                placeholder="Повторите пароль" 
                                onChange={(e) => { rePasswordHandler(e, setRePassword, setRePasswordError) }}
                                required
                            />
                            <span  className={rePasswordError === true ?
                                "format-invalid-open" :
                                "format-invalid-closed"}>*Пароли не совпадают</span>
                        </div>
                        <input type="submit" className="input-submit input-basic" value="Зарегистрироваться" />
                        <NavLink className="forgot-password" to="/">уже есть аккаунт</NavLink>
                    </form>
                </div>
               <PopUpResetPassword
                    header="Подтверждение почты"
                    description="Вам на почту был отправлена ссылка для подтверждения. Пройдите по ссылке, чтобы активировать ваш аккаунт."
                    redMessage="*аккаунт не подтвержден, пройдите по ссылке в письме"
                    display={displayPopUpEmailConfirmation}
                    toggle={() => togglePopUp(displayPopUpEmailConfirmation, setDisplayPopUpEmailConfirmation)}
                    buttonToHome="Подтвердить"
                />
            </div>
    );
}