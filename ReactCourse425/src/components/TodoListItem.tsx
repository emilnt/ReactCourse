import classes from "./TodoListItem.module.css";

const TodoListItem: React.FC<{
  text: string;
  onRemoveItem: () => void;
}> = (props) => {
  const onClickHandler = () => {
    props.onRemoveItem();
  };

  return (
    <li className={classes.item} onClick={onClickHandler}>
      {props.text}
    </li>
  );
};

export default TodoListItem;
