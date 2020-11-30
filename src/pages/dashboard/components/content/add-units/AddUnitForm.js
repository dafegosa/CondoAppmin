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
  render() {
    const { unitData, handleChange, addToDb } = this.props;
    const { unitName, message } = unitData;
    return (
      <UnitsForm onSubmit={addToDb}>
        <div>
          <label htmlFor="unitName">Nomenclatura</label>
          <input
            id="unitName"
            name="unitName"
            type="text"
            onChange={handleChange}
            value={unitName}
          />
        </div>
        <button type="submit">Submit</button>
        {message}
      </UnitsForm>
    );
  }
}

export default AddResidentForm;
