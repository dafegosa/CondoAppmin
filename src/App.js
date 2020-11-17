import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "styled-components";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { usersData } from "./data/usersData";
import "./App.css";

const theme = {
  mainColor: "rgba(96, 125, 139, 1)",
  secondaryColor: "rgba(96, 125, 139, 0.7)",
  thirdColor: "rgba(255, 191, 91, 0.9)",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: "",
      users: usersData,
    };
  }

  handleInputChange = (e) => {
    const { name, value, id, type } = e.target;
    this.setState({ [name]: type === "radio" ? id : value });
  };

  createUser = (e) => {
    e.preventDefault();

    const { email, password, user } = this.state;
    const newUser = {
      email,
      password,
      user,
    };

    this.setState(
      {
        users: [...this.state.users, newUser],
      },
      () => console.log("current", this.state)
    );
  };

  UserValidation = (e) => {
    e.preventDefault();
    const { email, password, user } = this.state;
    const validUser = {
      email,
      password,
      user,
    };

    const result = this.state.users.filter(
      (thisUser) =>
        thisUser.user == validUser.user &&
        thisUser.email == validUser.email &&
        thisUser.password == validUser.password
    );
  };

  render() {
    const { email, password, user } = this.state;
    return (
      <header className="App-header">
        <Router>
          <Switch>
            <ThemeProvider theme={theme}>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route
                exact
                path="/register"
                render={() => (
                  <Register
                    email={email}
                    password={password}
                    price={user}
                    createUser={this.createUser}
                    handleInputChange={this.handleInputChange}
                  />
                )}
              />
              <Route
                exact
                path="/login"
                render={() => (
                  <Login
                    email={email}
                    password={password}
                    price={user}
                    userValidation={this.UserValidation}
                    handleInputChange={this.handleInputChange}
                  />
                )}
              />
            </ThemeProvider>
          </Switch>
        </Router>
      </header>
    );
  }
}

export default App;
