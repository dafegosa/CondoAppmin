import React from 'react'
import styled from 'styled-components'
import AddResidentForm from './AddResidentForm'

const AddResidentDiv = styled.div`
  /* border: 1px solid red; */
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  & input, & select {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    
  }
`

export const SectionTitle = styled.h2`
  font-weight: 500;
  font-size: 24px;
`

class ContentAddResident extends React.Component {

  state = {
    name: '',
    lastName: '',
    idNumber: false,
    phone: '',
    email: '',
    password: '',
  }

  handleChange = (e) => {

  }

  render () {
    return (
      <AddResidentDiv>
        <SectionTitle>Agregar Usuarios</SectionTitle>
        <AddResidentForm />
      </AddResidentDiv>
    )
  }
}

export default ContentAddResident