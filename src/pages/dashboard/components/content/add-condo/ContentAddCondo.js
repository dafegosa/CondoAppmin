import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getAdmin, globalHandleChange, globalCreateDocument } from '../../../../../store/sessionReducer'

const AddCondoDiv = styled.div`
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

function ContentAddCondo () {

  const { currentCondo, condoName, condoAddress, message } = useSelector(
    ({ condoReducer: { currentCondo, condoName, condoAddress, message } }) => {
    return { currentCondo, condoName, condoAddress, message }
    }) 
  const { admin, resident } = useSelector(({ sessionReducer: { admin, resident } }) => {
    return { admin, resident }
  })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'CONDO'))
  }

  const createDocument = async (e) => {
    e.preventDefault()

    const { data } = await getAdmin()
    const newDocument = {
      name: condoName,
      address: condoAddress,
      admin: data.id
    }

    dispatch(globalCreateDocument('condo', newDocument))
  }
  
  return (
    !admin ? <Redirect to="/dashboard" /> :
    (<AddCondoDiv>
      <SectionTitle>Agregar Condominio</SectionTitle>
      <CondosForm onSubmit={createDocument}>
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
    </AddCondoDiv>)
  )
}


export default ContentAddCondo