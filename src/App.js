import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const theme = {
  mainColor: 'rgba(96, 125, 139, 1)',
  secondaryColor: 'rgba(96, 125, 139, 0.7)',
  thirdColor: 'rgba(255, 191, 91, 0.9)',
};

class App extends React.Component {
  render() {
    return (
      <header className="App-header">
        <Router>
          <Switch>
            <ThemeProvider theme={theme}>
              <Route exact path="/" component={Home} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </ThemeProvider>
          </Switch>
        </Router>
      </header>
    );
  }
}

export default App;
