import { NavLink } from "react-router-dom";
import './signup.css';

export default function SignUp(){
    return(
            <div className="signup-container">
                <div className="signup-content">
                    <form action="" id="form-signup">
                        <h2 className="title-page">Регистрация</h2>
                        <input type="email" name="email" id="email-signup" className="input-basic" placeholder="Электронная почта" required/>
                        <label id="label-password" htmlFor="password"> Пароль должен содержать минимум 8 символов латинскими буквами, а также хотя бы одну цифру</label>
                        <input type="password" name="password" id="password-signup" className="input-basic" placeholder="Пароль" required/>
                        <input type="password" name="repassword" id="repassword-signup" className="input-basic" placeholder="Повторите пароль" required/>
                        <input type="submit" id="input-submit" className="input-basic" value="Зарегистрироваться" />
                        <NavLink id="forgot-password" to="/">уже есть аккаунт</NavLink>
                    </form>
                </div>
            </div>
    );
}