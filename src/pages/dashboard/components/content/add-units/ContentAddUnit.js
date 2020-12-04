import React from 'react'
import { Redirect } from  'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { globalHandleChange, globalCreateDocument } from '../../../../../store/sessionReducer'

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
export const SectionTitle = styled.h2`
  font-weight: 500;
  font-size: 24px;
`

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
`

function ContentAddUnit () {

  const { unitName, message } = useSelector(
    ({ unitReducer: { unitName, message } }) => {
    return { unitName, message }
    }) 
  const { currentCondo } = useSelector(
    ({ condoReducer: { currentCondo } }) => {
    return { currentCondo }
    }) 
  const { admin, resident } = useSelector(({ sessionReducer: { admin, resident } }) => {
    return { admin, resident }
  })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'UNIT'))
  }

  const createDocument = async (e) => {
    e.preventDefault()

    const newDocument = {
      name: unitName,
      condoId: currentCondo,
    }

    dispatch(globalCreateDocument('unit', newDocument))
  }

  return (
    !admin ? <Redirect to="/dashboard" /> :
    <AddUnitDiv>
      <SectionTitle>Agregar Usuarios</SectionTitle>
      <UnitsForm onSubmit={createDocument}>
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
    </AddUnitDiv>
  )
}

export default ContentAddUnit