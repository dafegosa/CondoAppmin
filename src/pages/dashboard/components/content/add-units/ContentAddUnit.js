import React from 'react'
import styled from 'styled-components'
import AddUnitsForm from './AddUnitForm'
import { SectionTitle } from '../add-residents/ContentAddResident'

const AddUnitDiv = styled.div`
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

class ContentAddUnits extends React.Component {

  state = {
    name: '',
    lastName: '',
    idNumber: false,
    phone: '',
    email: '',
    password: '',
  }

  render () {
    return (
      <AddUnitDiv>
        <SectionTitle>Agregar Apartamentos</SectionTitle>
        <AddUnitsForm />
      </AddUnitDiv>
    )
  }
}

export default ContentAddUnits