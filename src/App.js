import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import React from 'react'
import styled from 'styled-components';
import Dashboard from './pages/Dashboard';


class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    )
  }
}

export default App;
