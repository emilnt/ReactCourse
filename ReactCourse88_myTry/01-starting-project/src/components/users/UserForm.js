import React, { useState } from "react";

import styles from "./UserForm.module.css";
import Button from "../ui/button/Button";

const UserForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const nameInputChangeHandler = (event) => {
      setEnteredName(event.target.value);
  };

  const ageInputChangeHandler = (event) => {
      setEnteredAge(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    let validationPassed = true;

    if (enteredName.trim().length === 0) {
      validationPassed = false;
      props.onModalMessage("Navn er ikke gyldig");
    }

    if (enteredAge.trim().length === 0) {
      validationPassed = false;
      props.onModalMessage("Alder er ikke gyldig");
    }

    if (!validationPassed) {
      props.onShowModal();
      return;
    }

    props.onAddUser({ age: enteredAge, name: enteredName });
    setEnteredName("");
    setEnteredAge("");
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div id={`${styles["user-form"]}`}>
        <label>Name</label>
        <input type="text" onChange={nameInputChangeHandler} /><br />
        <label>Age</label>
        <input type="text" onChange={ageInputChangeHandler} />
      </div>
      <Button type="submit">Add user</Button>
    </form>
  );
};

export default UserForm;
