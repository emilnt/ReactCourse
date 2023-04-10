import React, { useState } from "react";

import UserForm from "./components/users/UserForm";
import UsersList from "./components/users/UsersList";
import Modal from "./components/ui/modal/Modal";

function App() {
  const [usersList, setUsersList] = useState([{ name: "Max", age: "31", id: "u1" }]);
  const [modalIsHidden, setModalIsHidden] = useState(true);
  const [modalMessages, setModalMessages] = useState([]);

  const showModalHandler = () => {
    setModalIsHidden(false);
  };

  const dismissModalHandler = () => {
    setModalIsHidden(true);
    setModalMessages([]);
  };

  const modalMessageHandler = (newMessage) => {
    setModalMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      updatedMessages.unshift({text: newMessage, id: Math.random().toString()});
      return updatedMessages;
    });
  };

  const addUserHandler = (user) => {
    setUsersList(prevUsersList => {
      const updatedUsersList = [...prevUsersList];
      updatedUsersList.unshift({name: user.name, age: user.age, id: Math.random().toString()});
      return updatedUsersList;
    });
  };

  return (
    <div>
      <section id="user-form">
        <UserForm onAddUser={addUserHandler} onShowModal={showModalHandler} onModalMessage={modalMessageHandler} />
      </section>
      <section id="users-list">
        <UsersList items={usersList} />
      </section>
      <section id="modal">
        <Modal isHidden={modalIsHidden} onDismissal={dismissModalHandler} messages={modalMessages}/>
      </section>
    </div>
  );
}

export default App;
