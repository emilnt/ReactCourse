import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const resetErrorHandler = (event) => {
    setError(null);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUserAge = ageInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
        setError({title: 'invalid name',
    message: 'please enter valid name'});
      return;
    }

    if (+enteredUserAge < 1) {
        setError({title: 'invalid age',
    message: 'please enter valid age'})
      return;
    }

    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onResetError={resetErrorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (years)</label>
          <input
            type="number"
            id="age"
            ref={ageInputRef}
          />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
