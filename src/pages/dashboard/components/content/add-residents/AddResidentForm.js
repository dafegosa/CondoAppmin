import React from 'react'
import styled from 'styled-components'

const ResidentsForm = styled.form`
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;
`

class AddResidentForm extends React.Component {


  render () {
    const { resData, handleChange, addToDb } = this.props
    const { resName, resLastname, resIdNumber, resPhone, resEmail, resPassword, message } = resData
    return (
      <ResidentsForm onSubmit={addToDb}>
        <label htmlFor="resName">Nombre</label>
        <input
          id="resName"
          name="resName"
          type="text"
          onChange={handleChange}
          value={resName}
        />
        <label htmlFor="resLastname">Apellido</label>
        <input
          id="resLastname"
          name="resLastname"
          type="text"
          onChange={handleChange}
          value={resLastname}
        />
        <label htmlFor="resIdNumber" >Cédula</label>
        <input
          id="resIdNumber"
          name="resIdNumber"
          type="text"
          onChange={handleChange}
          checked={resIdNumber}
        />
        <label htmlFor="resPhone" >Teléfono</label>
        <input
          id="resPhone"
          name="resPhone"
          type="resPhone"
          onChange={handleChange}
          checked={resPhone}
        />
        <label htmlFor="resEmail" >Email</label>
        <input
          id="resEmail"
          name="resEmail"
          type="email"
          onChange={handleChange}
          checked={resEmail}
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
        <label htmlFor="resPassword" >password</label>
        <input
          id="resPassword"
          name="resPassword"
          type="password"
          onChange={handleChange}
          checked={resPassword}
        />
        <button type="submit">Submit</button>
        {message}
      </ResidentsForm>
    )
  }
}

export default AddResidentForm