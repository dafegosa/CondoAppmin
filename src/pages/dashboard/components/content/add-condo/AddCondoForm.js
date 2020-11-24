import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const CondosForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;

  & div {
    width: 45%;
  }
`

class AddCondoForm extends React.Component {


  state = {
    name: '',
    address: '',
    adminid: '123455678',
    message: ''
  }
  handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    this.setState({ ...this.state, [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { name , address } = this.state
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: 'http://localhost:8080',
        url: '/condo',
        data: { name, address }
      })
      this.setState({...this.state, name: '', address: '', message: data.message})

    }
    catch (err) {
      this.setState({...this.state, message: 'No fue posible agregar el condominio'})
    } 
  }

  render () {
    const { name, address, message } = this.state
    return (
      <CondosForm onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={this.handleChange}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={this.handleChange}
            value={address}
          />
        </div>
        <button type="submit">Submit</button>
        {message && message}
      </CondosForm>
    )
  }
}

export default AddCondoForm