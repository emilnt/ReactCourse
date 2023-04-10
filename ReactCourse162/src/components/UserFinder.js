import { Component } from "react";

import classes from "./UserFinder.module.css";
import Users from "./Users";
import UsersContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary";

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      //Unngå evig loop, må ha sjekk så man ikke unødig oppdaterer state
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  componentDidMount() {
    //Kjører bare én gang, når komponenten første gang renderes (lik useEffekt med dep [])
    this.setState({ filteredUsers: this.context.users });
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    // Kunne ha brukt provider i JSX også med klassekomponent
    return (
      <div className={classes.finder}>
        <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </div>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className={classes.finder}>
//       <input type="search" onChange={searchChangeHandler} />
//       <Users users={filteredUsers} />
//     </div>
//   );
// };

export default UserFinder;
