import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './popupconfirmation.scss';
interface PopUpProps {
    header: string,
    description: string,
    lineHr?: boolean,
    buttonDescription: string,
    display: boolean,
    toggle: ()=>void,
}

export default function PopUpConfirmation (props: PopUpProps){
const {
    header,
    description,
    lineHr,
    buttonDescription,
    display,
    toggle
} = props;

    return(
    <div className={display === true ? "popup-confirmation-container popup-confirmation-open" : "popup-confirmation-container popup-confirmation-closed"}>
            <h2 className="popup-title">{header}</h2>
            <p className="popup-description">{description}</p>
            {lineHr === true && <hr className='linehr-basket'/>}
            <NavLink className="link-to-home" to="/" onClick={()=>toggle()}>{buttonDescription}</NavLink>
    </div>)
}