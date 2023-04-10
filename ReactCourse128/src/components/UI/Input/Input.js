import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => { // Bruk sjeldent forwardRef, bryter med state-fremgangsmåten ellers.
  const InputRef = useRef();
  const Focus = () => {
    InputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: Focus,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
      ref={InputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />{" "}
    </div>
  );
});

export default Input;
