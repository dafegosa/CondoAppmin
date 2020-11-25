import React from 'react';
import styled from 'styled-components';

const UnitsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;

  & div {
    width: 45%;
  }
`;

class AddResidentForm extends React.Component {
  state = {
    unit: '',
    building: '',
    message: '',
  };
  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
  render() {
    const { unit, building, message } = this.state;
    return (
      <UnitsForm onSubmit={this.handleSubmit}>
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
        {message}
      </UnitsForm>
    );
  }
}

export default AddResidentForm;
