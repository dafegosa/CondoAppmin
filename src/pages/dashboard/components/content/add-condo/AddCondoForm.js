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
    adminid: '',
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
    const { adminid } = this.props
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: 'http://localhost:8080',
        url: '/condo',
        data: { name, address, admin: adminid }
      })
      this.setState({...this.state, name: '', address: '', message: data.message})

    }
    catch (err) {
      this.setState({...this.state, message: 'No fue posible agregar el condominio'})
    } 
  }

  render () {
    const { adminid, handleChange, addToDb, condoData } = this.props
    const { condoName, condoAddress, condoid, message } = condoData
    return (
      <CondosForm onSubmit={addToDb}>
        <div>
          <label htmlFor="condoName">Nombre</label>
          <input
            id="condoName"
            name="condoName"
            type="text"
            onChange={handleChange}
            value={condoName}
          />
        </div>
        <div>
          <label htmlFor="condoAddress">Dirección</label>
          <input
            id="condoAddress"
            name="condoAddress"
            type="text"
            onChange={handleChange}
            value={condoAddress}
          />
        </div>
        <button type="submit">Submit</button>
        {message && message}
      </CondosForm>
    )
  }
}

export default AddCondoForm