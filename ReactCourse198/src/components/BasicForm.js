import useInput from "./../hooks/use-input";

const BasicForm = (props) => {
  /*
  value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  */

  const {
    value: enteredFirstname,
    hasError: firstnameHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetFirstname,
  } = useInput((firstName) => firstName.trim() !== "");

  const {
    value: enteredLastname,
    hasError: lastnameHasError,
    valueChangeHandler: lastnameChangeHandler,
    inputBlurHandler: lastnameBlurHandler,
    reset: resetLastname,
  } = useInput((lastName) => lastName.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((email) => email.includes("@"));

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if(firstnameHasError || lastnameHasError || emailHasError) {
      return;
    }

    console.log(enteredFirstname);
    console.log(enteredLastname);
    console.log(enteredEmail);

    resetFirstname();
    resetLastname();
    resetEmail();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstnameHasError ? "form-control invalid" : "form-control"}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstnameChangeHandler}
            onBlur={firstnameBlurHandler}
          />
        </div>
        <div className={lastnameHasError ? "form-control invalid" : "form-control"}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastnameChangeHandler}
            onBlur={lastnameBlurHandler}
          />
        </div>
      </div>
      <div className={emailHasError ? "form-control invalid" : "form-control"}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
