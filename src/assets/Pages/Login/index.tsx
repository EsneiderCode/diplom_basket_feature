
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './login.css';
import PopUpResetPassword from '../../Components/PopUpResetPassword';
import logoBasketFeature from '../../Images/Login/logo-basket-feature.png';

export default function Login(){
const [displayPopUp, setDisplayPopUp] = useState<boolean>(false);
const [email, setEmail] = useState<string>("");
const [emailError, setEmailError] = useState<boolean>(false);
const [password, setPassword] = useState<string>("");
const [passwordError, setPasswordError] = useState<boolean>(false);

function openPopUp(){
    setDisplayPopUp(true);
}

function closePopUp(){
    setDisplayPopUp(false);
}

function emailHandler(e: React.ChangeEvent<HTMLInputElement>){
    const newEmail = e.target.value;

    setEmail(newEmail);
    validateEmail(e);
}

function validateEmail (e:React.ChangeEvent<HTMLInputElement>) {
    const  regex = /\S+@\S+\.\S+/;
    const isValid = regex.test(e.target.value);

    if ( ((e.target.value.length > 8) && (isValid === true))  || (e.target.value === "")) {
        setEmailError(false);
    }else{
        setEmailError(true);
    }
}

function passwordHandler(e: React.ChangeEvent<HTMLInputElement>){
    const passwordUser = e.target.value;

    setPassword(passwordUser);
    validatePassword(e);
}

function validatePassword(e:React.ChangeEvent<HTMLInputElement>){
    const  regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number.
    const isValid = regex.test(e.target.value);

    if ( ((e.target.value.length > 8)  &&  (isValid === true)) || (e.target.value === "")) {
        setPasswordError(false);
    }else{
        setPasswordError(true);
    }
}

    return (
        <div className="login-container">
            <div className="login-content">
                <img src={logoBasketFeature} alt="basket-feature" id="logo-basket-feature"/>
                <form action="" id="login-form">
                    <div className="input-container">
                         <input type="email" name="email" id="email-login" className={emailError === true? "input-basic input-active" : "input-basic input-inactive"} placeholder="Электронная почта" onChange={emailHandler} required/>
                         <span className={emailError === true? "format-invalid-open" : "format-invalid-closed"}>*Неверный формат</span>
                    </div>
                    <div className="input-container">
                         <input type="password" name="password" id="password-login" className={passwordError === true? "input-basic input-active" : "input-basic input-inactive"} placeholder="Пароль" onChange={passwordHandler} required/>
                         <span className={passwordError === true? "format-invalid-open" : "format-invalid-closed"}>*Неверный формат</span>
                    </div>
                    <p id="reset-password-link" onClick={openPopUp}>забыл пароль</p>
                    <input className="input-submit input-basic" type="submit" value="Войти" />
                    <NavLink id="signup-link" to="/sign-up">Зарегистрироваться</NavLink>
                </form>
                <PopUpResetPassword display={displayPopUp} onClose={closePopUp}/>
            </div>
        </div>
       
    );
}