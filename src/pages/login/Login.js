import React, { Component } from 'react'


class Login extends Component {

  render() {
    // console.log(this.state)
    const { email, password, message } = this.props.user
    return (
      <>
        <form onSubmit={this.props.handleSubmit}>
          <label
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={this.props.handleChange}
            value={email}
          />
          <label
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={this.props.handleChange}
            value={password}
          />
          <button type="submit">Submit</button>
        </form>
        {message && message}
      </>
    )
  }
}

export default Login
