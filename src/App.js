import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Dashboard from './pages/dashboard/Dashboard'

const theme = {
  mainColor: 'rgba(96, 125, 139, 1)',
  secondaryColor: 'rgba(96, 125, 139, 0.7)',
  thirdColor: 'rgba(255, 191, 91, 0.9)',
}

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <ThemeProvider theme={theme}>
            <Route exact path="/dashboard" component={Dashboard} />
          </ThemeProvider>
        </Switch>
      </Router>
    )
  }
}

export default App
