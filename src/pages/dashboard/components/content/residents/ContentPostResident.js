import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { retrieveUnits } from '../../../../../store/unitReducer'
import { globalHandleChange, globalCreateDocument } from '../../../../../store/sessionReducer'
import { RESIDENT_FORM_CLEAN, RESIDENT_MESSAGE_CLEAN } from '../../../../../store/residentReducer'

export const AddResidentDiv = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  & input,
  & select {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
  }
`

export const SectionTitle = styled.h1`
  font-weight: 500;
  font-size: 24px;
`

const ResidentsForm = styled.form`
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;
`

function ContentPostResident () {

  const { resName, resLastname, resIdNumber, resPhone, resEmail, resPassword, resUnit, message, error } = useSelector(( { residentReducer: { resName, resLastname, resIdNumber, resPhone, resEmail, resPassword, resUnit, message, error }}) => {
    return { resName, resLastname, resIdNumber, resPhone, resEmail, resPassword, resUnit, message, error }
  })
  const { units } = useSelector(( { unitReducer: { units }}) => {
    return { units }
  })
  const { currentCondoId } = useSelector(({ condoReducer: { currentCondoId } }) => {
      return { currentCondoId }
  })
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUnits () {
      await dispatch(retrieveUnits(currentCondoId))
    }
    dispatch({ type: RESIDENT_FORM_CLEAN })
    dispatch({ type: RESIDENT_MESSAGE_CLEAN })
    getUnits()
  }, [currentCondoId])

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'RESIDENT'))
  }

  const createDocument = async (e) => {
    e.preventDefault()

    const newDocument = {
      name: resName,
      lastName: resLastname,
      idNumber: resIdNumber,
      phone: resPhone,
      email: resEmail,
      password: resPassword,
      unitId: resUnit,
      condoId: currentCondoId
    }
    const token = localStorage.getItem('token')
    dispatch(globalCreateDocument('resident', newDocument, token))
  }
  return (
    !admin ? <Redirect to="/dashboard" /> :
    <AddResidentDiv>
      <SectionTitle>Agregar Residentes</SectionTitle>
      <ResidentsForm onSubmit={createDocument}>
        <label htmlFor='resName'>Nombre</label>
        <input
          id='resName'
          name='resName'
          type='text'
          onChange={handleChange}
          value={resName}
        />
        <label htmlFor='resLastname'>Apellido</label>
        <input
          id='resLastname'
          name='resLastname'
          type='text'
          onChange={handleChange}
          value={resLastname}
        />
        <label htmlFor='resIdNumber'>Cédula</label>
        <input
          id='resIdNumber'
          name='resIdNumber'
          type='text'
          onChange={handleChange}
          value={resIdNumber}
        />
        <label htmlFor='resPhone'>Teléfono</label>
        <input
          id='resPhone'
          name='resPhone'
          type='resPhone'
          onChange={handleChange}
          value={resPhone}
        />
        <label htmlFor='resEmail'>Email</label>
        <input
          id='resEmail'
          name='resEmail'
          type='email'
          onChange={handleChange}
          value={resEmail}
        />
        <label htmlFor='resUnit'>Unidad</label>
        <select
          type='text'
          name='resUnit'
          id='service-select'
          value={resUnit}
          onChange={handleChange}
          required
        >
          <option>
            Escoge unidad
          </option>
          {!!units &&
            units.length &&
            units.map((unit) => {
              return (
                <option value={unit._id} key={unit._id}>
                  {unit.name}
                </option>
              );
            })}
        </select>
        <label htmlFor="resPassword">password</label>
        <input
          id='resPassword'
          name='resPassword'
          type='password'
          onChange={handleChange}
          value={resPassword}
        />
        <button type='submit'>Submit</button>
        {message || error}
      </ResidentsForm>
    </AddResidentDiv>
  )
}

export default ContentPostResident
