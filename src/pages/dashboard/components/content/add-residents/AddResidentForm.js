import React from 'react'
import styled from 'styled-components'

const ResidentsForm = styled.form`
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;
`

class AddResidentForm extends React.Component {

  state = {
    name: '',
    lastName: '',
    idNumber: '',
    phone: '',
    email: '',
    password: '',
    message: ''
  }

  handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    this.setState({ ...this.state, [name]: value })
  }

  handleSubmit = async (e) => {


  }

  render () {
    const { name, lastName, idNumber, phone, email, password } = this.state
    return (
      <ResidentsForm onSubmit={this.handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={this.handleChange}
          value={name}
        />
        <label htmlFor="lastname">Apellido</label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          onChange={this.handleChange}
          value={lastName}
        />
        <label htmlFor="idnumber" >Cédula</label>
        <input
          id="idnumber"
          name="idnumber"
          type="text"
          onChange={this.handleChange}
          checked={idNumber}
        />
        <label htmlFor="phone" >Teléfono</label>
        <input
          id="phone"
          name="phone"
          type="phone"
          onChange={this.handleChange}
          checked={phone}
        />
        <label htmlFor="email" >Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={this.handleChange}
          checked={email}
        />
        <label htmlFor="unit" >Unidad</label>
        <select name="unit" id="service-select" required>
          <option value="09-301">
            09-301
          </option>
          <option value="09-302">
            09-302
          </option>
          <option value="08-301">
            08-301
          </option>
          <option value="08-302">
            08-302
          </option>
        </select>
        <label htmlFor="password" >password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={this.handleChange}
          checked={password}
        />
        <button type="submit">Submit</button>
      </ResidentsForm>
    )
  }
}

export default AddResidentForm