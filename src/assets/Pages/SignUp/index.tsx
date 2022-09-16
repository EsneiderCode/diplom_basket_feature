import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './signup.css';

export default function SignUp(){

const [email, setEmail] = useState<string>("");
const [emailError, setEmailError] = useState<boolean>(false);
const [password, setPassword] = useState<string>("");
const [passwordError, setPasswordError] = useState<boolean>(false);
const [rePassword, setRePassword] = useState<string>("");
const [rePasswordError, setRePasswordError] = useState<boolean>(false);

function emailHandler(e: React.ChangeEvent<HTMLInputElement>){
    const newEmail = e.target.value;

    setEmail(newEmail);
    validateEmail(e);
}

function validateEmail(e: React.ChangeEvent<HTMLInputElement>){
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

function validatePassword(e: React.ChangeEvent<HTMLInputElement>){
    const  regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number.
    const isValid = regex.test(e.target.value);
    
    if ( ((e.target.value.length > 8)  &&  (isValid === true)) || (e.target.value === "")) {
        setPasswordError(false);
    }else{
        setPasswordError(true);
    }
}


function rePasswordHandler(e: React.ChangeEvent<HTMLInputElement>){
const rePasswordUser = e.target.value;

    setRePassword(rePasswordUser);
    validateRePassword(e);
}

function validateRePassword(e: React.ChangeEvent<HTMLInputElement>){
    const  regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number.
    const isValid = regex.test(e.target.value);
    
    if ( ((e.target.value.length > 8)  &&  (isValid === true)) || (e.target.value === "")) {
        setRePasswordError(false);
    }else{
        setRePasswordError(true);
    }
}

    return(
            <div className="signup-container">
                <div className="signup-content">
                    <form action="" id="form-signup">
                        <h2 className="title-page">Регистрация</h2>
                        <div className="input-container">
                            <input type="email" name="email" id="email-signup" className={emailError === true ? "input-basic input-active": "input-basic input-inactive"} placeholder="Электронная почта" onChange={emailHandler} required/>
                            <span className={emailError === true ? "format-invalid-open": "format-invalid-closed"}>*Неверный формат</span>
                        </div>
                        <label id="label-password" htmlFor="password"> Пароль должен содержать минимум 8 символов латинскими буквами, а также хотя бы одну цифру</label>
                        <div className="input-container">
                            <input type="password" name="password" id="password-signup" className={passwordError === true ? "input-basic input-active": "input-basic input-inactive"} placeholder="Пароль" onChange={passwordHandler} required/>
                            <span className={passwordError === true ? "format-invalid-open": "format-invalid-closed"}>*Неверный формат</span>
                        </div>
                        <div className="input-container">
                            <input type="password" name="repassword" id="repassword-signup" className={rePasswordError === true ? "input-basic input-active": "input-basic input-inactive"} placeholder="Повторите пароль" onChange={rePasswordHandler} required/>
                            <span className={rePasswordError === true ? "format-invalid-open": "format-invalid-closed"}>*Пароли не совпадают</span>
                        </div>
                        <input type="submit" className="input-submit input-basic" value="Зарегистрироваться" />
                        <NavLink id="forgot-password" to="/">уже есть аккаунт</NavLink>
                    </form>
                </div>
            </div>
    );
}