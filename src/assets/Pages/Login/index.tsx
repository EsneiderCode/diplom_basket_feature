
import { useState } from 'react';
import logoBasketFeature from '../../Images/Login/logo-basket-feature.png';
import { NavLink } from 'react-router-dom';

import './login.css';
import PopUpResetPassword from '../../Components/PopUpResetPassword';

export default function Login(){
const [displayPopUp, setDisplayPopUp] = useState<boolean>(false);

function openPopUp(){
    setDisplayPopUp(true);
}

function closePopUp(){
    setDisplayPopUp(false);
}

    return (
        <div className="login-container">
            <div className="login-content">
                <img src={logoBasketFeature} alt="basket-feature" id="logo-basket-feature"/>
                <form action="" id="login-form">
                    <input type="email" name="email" id="email-login" className="input-basic" placeholder="Электронная почта" required/>
                    <input type="password" name="password" id="password-login" className="input-basic" placeholder="Пароль" required/>
                    <p id="reset-password-link" onClick={openPopUp}>забыл пароль</p>
                    <input id="input-submit" className="input-basic" type="submit" value="Войти" />
                    <NavLink id="signup-link" to="/sign-up">зарегистрироваться</NavLink>
                </form>
                <PopUpResetPassword display={displayPopUp} onClose={closePopUp}/>
            </div>
        </div>
       
    );
}