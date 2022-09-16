import { useState } from 'react';
import '../PopUpResetPassword/popupresetpassword.css';
interface PopUpProps {
    display:boolean, 
    onClose: ()=>void
}

export default function PopUpResetPassword(props: PopUpProps){
const [email, setEmail] = useState<string>("");
const [emailError, setEmailError] = useState<boolean>(false);

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

    return(
    <div className={props.display === false ? "popup-container set-popup-close" : "popup-container set-popup-open"}>
            <span className="popup-close-icon" onClick={props.onClose}>&#x2715;</span>
            <h2 className="popup-title">Восстановить пароль</h2>
            <form action="" id="popup-form">
                <p className="popup-description">Введите электронную почту</p>
                <div className="input-container">
                    <input type="email" name="email" id="email-login" className={emailError === true? "input-basic input-active" : "input-basic input-inactive"} placeholder="Электронная почта" onChange={emailHandler} required/> 
                    <span className={emailError === true? "format-invalid-open" : "format-invalid-closed"}>*Неверный формат</span>
                </div>
                 <input type="submit" value="Подтвердить" className="input-submit input-basic" />
            </form>
    </div>)
}