import React from 'react'
import styled from 'styled-components'

const ResidentsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  box-sizing: border-box;
  /* border: 1px solid blue; */
  width: 70%;

  & div {
    width: 45%;
  }
`

class AddResidentForm extends React.Component {


  state = {
    unit: '',
    building: '',
  }
  handleChange = (e) => {
    e.preventDefault()
    const { name, value, checked, type } = e.target;

    this.setState({ [name]: value }, () => console.log(this.state))
  }
  render () {
    const { unit, building } = this.state
    return (
      <ResidentsForm onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="unit">Apartamento</label>
          <input
            id="unit"
            name="unit"
            type="text"
            onChange={this.handleChange}
            value={unit}
          />
        </div>
        <div>
          <label htmlFor="building">Bloque</label>
          <input
            id="building"
            name="building"
            type="text"
            onChange={this.handleChange}
            value={building}
          />
        </div>
        <button type="submit">Submit</button>
      </ResidentsForm>
    )
  }
}

export default AddResidentForm