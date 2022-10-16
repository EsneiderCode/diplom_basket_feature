import React from "react";

export function togglePopUp(
  popUp: boolean,
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>
) {
  setPopUp(!popUp);
}

function statusInput(
  e: React.ChangeEvent<HTMLInputElement>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (e.target.classList.contains("input-error")) {
    e.target.classList.remove("input-error");
    setError(false);
  }
  if (e.target.value.length >= 1) {
    e.target.classList.remove("input-inactive");
    e.target.classList.add("input-active");
  }
  if (
    e.target.value.length === 0 &&
    e.target.classList.contains("input-active")
  ) {
    e.target.classList.remove("input-active");
    e.target.classList.add("input-active");
  }
}

export function emailHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>
) {
  setEmail(e.target.value);
  statusInput(e, setEmailError);
}

export function validateEmail(
  e: React.ChangeEvent<HTMLInputElement>,
  setEmailError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const regex = /\S+@\S+\.\S+/;
  const isValid = regex.test(e.target.value);
  if (
    (e.target.value.length > 8 && isValid === true) ||
    e.target.value === ""
  ) {
    setEmailError(false);
  } else {
    setEmailError(true);
  }
}

export function passwordHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setPasswordError: React.Dispatch<React.SetStateAction<boolean>>
) {
  setPassword(e.target.value);
  statusInput(e, setPasswordError);
}

export function validatePassword(
  e: React.ChangeEvent<HTMLInputElement>,
  setPasswordError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number.
  const isValid = regex.test(e.target.value);

  if (
    (e.target.value.length > 8 && isValid === true) ||
    e.target.value === ""
  ) {
    setPasswordError(false);
  } else {
    setPasswordError(true);
  }
}

export function rePasswordHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setRePassword: React.Dispatch<React.SetStateAction<string>>,
  setRePasswordError: React.Dispatch<React.SetStateAction<boolean>>
) {
  setRePassword(e.target.value);
  statusInput(e, setRePasswordError);
}

export function validateRePassword(
  e: React.ChangeEvent<HTMLInputElement>,
  password: string,
  setRePasswordError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number.
  const isValid = regex.test(e.target.value);

  if (
    (e.target.value.length > 8 &&
      isValid === true &&
      e.target.value === password) ||
    e.target.value === ""
  ) {
    setRePasswordError(false);
  } else {
    setRePasswordError(true);
  }
}

export function codeConfirmationHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setCodeConfirmation: React.Dispatch<React.SetStateAction<string>>,
  setCodeConfirmationError: React.Dispatch<React.SetStateAction<boolean>>
) {
  setCodeConfirmation(e.target.value);
  statusInput(e, setCodeConfirmationError);
}

export function validateCodeConfirmation(
  e: React.ChangeEvent<HTMLInputElement>,
  setCodeConfirmationError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const isValid = e.target.value.length >= 4;
  if (isValid === true || e.target.value === "") {
    setCodeConfirmationError(false);
  } else {
    setCodeConfirmationError(true);
  }
}

export function validateTeamName(
  e: React.FocusEvent<HTMLInputElement, Element>,
  setTeamNameError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const isValid = e.target.value.length >= 4;
  if (isValid === true || e.target.value === "") {
    setTeamNameError(false);
  } else {
    setTeamNameError(true);
  }
}

export function validateTeamNameHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setTeamName: React.Dispatch<React.SetStateAction<string>>,
  setTeamNameError: React.Dispatch<React.SetStateAction<boolean>>
) {
  setTeamName(e.target.value);
  statusInput(e, setTeamNameError);
}

export function validateNamePlayer(
  name: any,
  setNameError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const isValid = name.target.value.length >= 5;
  if (isValid === true || name.value === "") {
    setNameError(false);
  } else {
    setNameError(true);
  }
}
export function validateLastnamePlayer(
  lastname: any,
  setLastNameError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const isValid = lastname.target.value.length >= 5;
  if (isValid === true || lastname.value === "") {
    setLastNameError(false);
  } else {
    setLastNameError(true);
  }
}
export function validatePsudonimPlayer(
  psudonim: any,
  setPseudonimError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const isValid = psudonim.target.value.length >= 5;
  if (isValid === true || psudonim.value === "") {
    setPseudonimError(false);
  } else {
    setPseudonimError(true);
  }
}
export function validateNumberPlayer(
  number: any,
  setNumberError: React.Dispatch<React.SetStateAction<boolean>>
) {
  const isValid = parseInt(number.target.value) >= 0;
  if (isValid === true || number.value === "") {
    setNumberError(false);
  } else {
    setNumberError(true);
  }
}

export function namePlayerHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setNameError: React.Dispatch<React.SetStateAction<boolean>>
) {
  setName(e.target.value);
  statusInput(e, setNameError);
}

export function lastnamePlayerHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setLastName: React.Dispatch<React.SetStateAction<string>>,
  setLastNameError: React.Dispatch<React.SetStateAction<boolean>>
) {
  setLastName(e.target.value);
  statusInput(e, setLastNameError);
}

export function psudonimPlayerHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setPseudonim: React.Dispatch<React.SetStateAction<string>>,
  setPseudonimError: React.Dispatch<React.SetStateAction<boolean>>
) {
  setPseudonim(e.target.value);
  statusInput(e, setPseudonimError);
}

export function numberPlayerHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setNumber: React.Dispatch<React.SetStateAction<number>>,
  setNumberError: React.Dispatch<React.SetStateAction<boolean>>
) {
  setNumber(parseInt(e.target.value));
  statusInput(e, setNumberError);
}
