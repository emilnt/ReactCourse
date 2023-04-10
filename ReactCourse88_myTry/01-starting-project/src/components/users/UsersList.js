import styles from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <div id={`${styles["users-list"]}`}>
      <ul>
        {props.items.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
