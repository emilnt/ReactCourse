import styles from "./Modal.module.css";
import Button from "../button/Button";

const Modal = (props) => {
  return (
    <div className={`${styles.modal} ${props.isHidden && styles.hidden}`}>
      {props.messages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}
      <Button onClick={props.onDismissal}>Ok</Button>
    </div>
  );
};

export default Modal;
