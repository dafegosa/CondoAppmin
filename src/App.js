import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'

const theme = {
  mainColor: 'rgba(96, 125, 139, 1)',
  secondaryColor: 'rgba(96, 125, 139, 0.7)',
  thirdColor: 'rgba(255, 191, 91, 0.9)',
};

let users = [
  {
    user: 'juan@hotmail.com',
    password: '123456'
  },
  {
    user: 'albertostyle@hotmail.com',
    password: '123456789'
  },
  {
    user: 'jbalvin@hotmail.com',
    password: '123456908'
  },
]


class App extends React.Component {

  state = {
    login: {
      email: '',
      password: '',
      message: '',
    }
  };

  handleChange = (e) => {
    const { name, value, checked, type } = e.target

    this.setState({ login: { ...this.state.login, [name]: value }}, () => console.log(this.state))
    // this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    // console.log(this.state)
    const { email, password } = this.props.user

    const isFound = users.filter(user => {
      return user.user === email
    })

    if (isFound.length > 0) {
      if (isFound[0].password === password) {
        this.props.history.push('/dashboard')
      } else {
        this.setState({...this.props.user, message: 'Wrong password'})
      }
    }

    /* this.setState({
      email: email,
      password: password,
      message: 'Task created successfully'
    }, () => console.log(this.state)) */

    users.push({user: email, password: password})
    console.log(users)
  }

  render() {
    return (
      <Router>
        <Switch>
          <ThemeProvider theme={theme}>
            <Route exact path='/'>
              <Home />
            </Route>
            {/* <Route exact path='/login'>
              <Login 
                user={this.state.login} 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />
            </Route> */}
            <Route exact path='/dashboard'>
              <Dashboard name='Alejandro'/>
            </Route> 
          </ThemeProvider>
        </Switch>
      </Router>
    );
  }
}

export default App;
