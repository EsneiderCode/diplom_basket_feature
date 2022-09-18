import React from "react";

export  function togglePopUp(popUp:boolean, setPopUp:React.Dispatch<React.SetStateAction<boolean>>){
    setPopUp(!popUp);
}

export  function emailHandler(e: React.ChangeEvent<HTMLInputElement>,
    setEmail:React.Dispatch<React.SetStateAction<string>>,
    setEmailError: React.Dispatch<React.SetStateAction<boolean>>){
    setEmail(e.target.value);
    validateEmail(e, setEmailError);
}

function validateEmail (e:React.ChangeEvent<HTMLInputElement>, setEmailError:React.Dispatch<React.SetStateAction<boolean>> ) {
    const  regex = /\S+@\S+\.\S+/;
    const isValid = regex.test(e.target.value);
    if ( ((e.target.value.length > 8) && (isValid === true))  || (e.target.value === "")) {
        setEmailError(false);
    }else{
        setEmailError(true);
    }
}

export function passwordHandler(e: React.ChangeEvent<HTMLInputElement>, setPassword:React.Dispatch<React.SetStateAction<string>>,
    setPasswordError: React.Dispatch<React.SetStateAction<boolean>>){
    setPassword(e.target.value);
    validatePassword(e, setPasswordError);
}

function validatePassword(e:React.ChangeEvent<HTMLInputElement>,
     setPasswordError: React.Dispatch<React.SetStateAction<boolean>>){
    const  regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number.
    const isValid = regex.test(e.target.value);

    if ( ((e.target.value.length > 8)  &&  (isValid === true)) || (e.target.value === "")) {
        setPasswordError(false);
    }else{
        setPasswordError(true);
    }
}

export function rePasswordHandler(e: React.ChangeEvent<HTMLInputElement>, setRePassword:React.Dispatch<React.SetStateAction<string>>,
    setRePasswordError: React.Dispatch<React.SetStateAction<boolean>>){
    setRePassword(e.target.value);
    validateRePassword(e, setRePasswordError);
}

function validateRePassword(e:React.ChangeEvent<HTMLInputElement>,
     setRePasswordError: React.Dispatch<React.SetStateAction<boolean>>){
    const  regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number.
    const isValid = regex.test(e.target.value);

    if ( ((e.target.value.length > 8)  &&  (isValid === true)) || (e.target.value === "")) {
        setRePasswordError(false);
    }else{
        setRePasswordError(true);
    }
}

export  function codeConfirmationHandler(e: React.ChangeEvent<HTMLInputElement>,
    setEmail:React.Dispatch<React.SetStateAction<string>>,
    setEmailError: React.Dispatch<React.SetStateAction<boolean>>){
    setEmail(e.target.value);
    validateEmail(e, setEmailError);
}

function validateCodeConfirmation (e:React.ChangeEvent<HTMLInputElement>, setEmailError:React.Dispatch<React.SetStateAction<boolean>> ) {
    const isValid = e.target.value.length >= 4;
    if ( ((e.target.value.length > 8) && (isValid === true))  || (e.target.value === "")) {
        setEmailError(false);
    }else{
        setEmailError(true);
    }
}


