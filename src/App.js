import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import PrivateRoute from './pages/dashboard/PrivateRoute'
import './App.css'

const theme = {
  mainColor: 'rgba(96, 125, 139, 1)',
  secondaryColor: 'rgba(96, 125, 139, 0.7)',
  thirdColor: 'rgba(255, 191, 91, 0.9)',
}

class App extends React.Component {
  render() {
    return (
      <header className='App-header'>
        <Router>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute
                exact
                path='/dashboard/:path?/:innerpath?/:superinner?'
                component={Dashboard}
              />
              <Redirect to='login' />
            </Switch>
          </ThemeProvider>
        </Router>
      </header>
    )
  }
}

export default App
