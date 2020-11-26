import React from 'react'
import styled from 'styled-components'

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

  render () {
    const { handleChange, addToDb, condoData } = this.props
    const { condoName, condoAddress, message } = condoData

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