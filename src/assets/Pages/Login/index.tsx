import { NavLink } from 'react-router-dom';
import '../../Constants/BasketStyle.css';
import './login.css';
import logoBasketFeature from '../../Images/Login/logo-basket-feature.png';

export default function Login(){
    return (
        <div className="login-container">
            <div className="login-content">
                <img src={logoBasketFeature} alt="basket-feature" id="logo-basket-feature"/>
                <form action="" id="login-form">
                    <input type="email" name="email" id="email" placeholder="Электронная почта" />
                    <input type="password" name="password" id="password" placeholder="Пароль"/>
                    <NavLink to="/reset-password" id="reset-password-link">забыл пароль</NavLink>
                    <input id="input-submit-login" type="submit" value="Войти" />
                    <NavLink id="signup-link" to="/sign-up">зарегистрироваться</NavLink>
                </form>
            </div>
        </div>
       
    );
}