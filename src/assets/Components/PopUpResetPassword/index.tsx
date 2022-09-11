import '../PopUpResetPassword/popupresetpassword.css';
interface PopUpProps {
    display:boolean, 
    onClose: ()=>void
}
export default function PopUpResetPassword(props: PopUpProps){
    return(
    <div className={props.display === false ? "popup-container set-popup-close" : "popup-container set-popup-open"}>
            <span className="popup-close-icon" onClick={props.onClose}>&#x2715;</span>
            <h2 className="popup-title">Восстановить пароль</h2>
            <form action="" id="popup-form">
                <p className="popup-description">Введите электронную почту</p>
                <input type="email" name="email" id="email-popup-reset-password" placeholder="Электронная почта" required/>
                <input type="submit" value="Подтвердить" id="input-submit" />
            </form>
    </div>)
}