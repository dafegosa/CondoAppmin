import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Dashboard from './pages/dashboard/Dashboard';
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const theme = {
  mainColor: 'rgba(96, 125, 139, 1)',
  secondaryColor: 'rgba(96, 125, 139, 0.7)',
  thirdColor: 'rgba(255, 191, 91, 0.9)',
}

class App extends React.Component {

  
  render() {
    return (
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/dashboard/:path?">
                <Switch>
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/dashboard/:path" component={Dashboard} />
                </Switch>
              </Route>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </ThemeProvider>
      </header>
    )

  }
}

export default App
