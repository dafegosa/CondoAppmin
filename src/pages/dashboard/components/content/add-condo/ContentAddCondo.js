import React from 'react'
import styled from 'styled-components'
import AddCondoForm from './AddCondoForm'

const AddCondoDiv = styled.div`
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

class ContentAddCondo extends React.Component {

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
    const { adminid, handleChange, addToDb, condoData } = this.props
    return (
      <AddCondoDiv>
        <SectionTitle>Agregar Condominio</SectionTitle>
        <AddCondoForm 
          adminid={adminid} 
          condoData={condoData} 
          handleChange={handleChange} 
          addToDb={addToDb('condo', {name: '', address: '', admin: adminid})}
        />
      </AddCondoDiv>
    )
  }
}

export default ContentAddCondo