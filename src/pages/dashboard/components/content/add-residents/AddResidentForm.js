import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const ResidentsForm = styled.form`
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;
`

class AddResidentForm extends React.Component {
  state = {
    units: [],
  }

  async componentDidMount() {
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: `/unit/${this.props.resData.condoid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      this.setState({ ...this.state, units: data.data })
    } catch (err) {}
  }

  render() {
    const { resData, handleChange, addToDb } = this.props
    const { units } = this.state
    const {
      resName,
      resLastname,
      resIdNumber,
      resPhone,
      resEmail,
      resPassword,
      resUnit,
      message,
    } = resData
    return (
      <ResidentsForm onSubmit={addToDb}>
        <label htmlFor='resName'>Nombre</label>
        <input
          id='resName'
          name='resName'
          type='text'
          onChange={handleChange}
          value={resName}
        />
        <label htmlFor='resLastname'>Apellido</label>
        <input
          id='resLastname'
          name='resLastname'
          type='text'
          onChange={handleChange}
          value={resLastname}
        />

        <label htmlFor='resIdNumber'>Cédula</label>
        <input
          id='resIdNumber'
          name='resIdNumber'
          type='text'
          onChange={handleChange}
          checked={resIdNumber}
        />

        <label htmlFor='resPhone'>Teléfono</label>
        <input
          id='resPhone'
          name='resPhone'
          type='resPhone'
          onChange={handleChange}
          checked={resPhone}
        />

        <label htmlFor='resEmail'>Email</label>
        <input
          id='resEmail'
          name='resEmail'
          type='email'
          onChange={handleChange}
          checked={resEmail}
        />
        <label htmlFor='resUnit'>Unidad</label>
        <select
          name='resUnit'
          id='service-select'
          value={resUnit}
          onChange={handleChange}
          required
        >
          {!!units &&
            units.length &&
            units.map((unit) => {
              return (
                <option value={unit._id} key={unit._id}>
                  {unit.name}
                </option>
              )
            })}
        </select>
        <label htmlFor='resPassword'>password</label>
        <input
          id='resPassword'
          name='resPassword'
          type='password'
          onChange={handleChange}
          checked={resPassword}
        />
        <button type='submit'>Submit</button>
        {message}
      </ResidentsForm>
    )
  }
}

export default AddResidentForm
