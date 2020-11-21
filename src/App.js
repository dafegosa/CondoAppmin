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
import Login from './pages/login/Login'
import Register from './pages/register/Register'

const theme = {
  mainColor: 'rgba(96, 125, 139, 1)',
  secondaryColor: 'rgba(96, 125, 139, 0.7)',
  thirdColor: 'rgba(255, 191, 91, 0.9)',
}

class App extends React.Component {

/*   state = {
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
    }, () => console.log(this.state)) 

    users.push({user: email, password: password})
    console.log(users)
  } */

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

export default App
