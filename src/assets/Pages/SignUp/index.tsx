import { NavLink } from "react-router-dom";
import {useForm } from "react-hook-form";

import '../../Constants/BasketStyle.css';
import './signup.css';
export default function SignUp(){
    return(
            <div className="signup-container">
                <div className="signup-content">
                    <form action="" id="form-signup">
                        <h2 className="title-page">Регистрация</h2>
                        <input type="email" name="email" id="email" placeholder="Электронная почта" required/>
                        <label id="label-password" htmlFor="password"> Пароль должен содержать минимум 8 символов латинскими буквами, а также хотя бы одну цифру</label>
                        <input type="password" name="password" id="password" placeholder="Пароль" required/>
                        <input type="password" name="repassword" id="repassword" placeholder="Повторите пароль" required/>
                        <input type="submit" id="input-submit" value="Зарегистрироваться" />
                        <NavLink id="forgot-password" to="/">уже есть аккаунт</NavLink>
                    </form>
                </div>
            </div>
    );
}