import { Component } from "react";

import classes from "./User.module.css";

class User extends Component {

  componentWillUnmount() { // Tilsvarer useEffekt med ryddemetode (ryddemetode garantert å kjøre før unmount)
    console.log('user will unmount');
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

/*const User = (props) => {
  return <li className={classes.user}>{props.name}</li>;
};*/

export default User;
