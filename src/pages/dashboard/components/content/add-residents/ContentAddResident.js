import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { retrieveUnits } from '../../../../../store/unitReducer'
import {
  globalHandleChange,
  globalCreateDocument,
} from '../../../../../store/sessionReducer'

const AddResidentDiv = styled.div`
  padding: 10px;
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

export const SectionTitle = styled.h2`
  font-weight: 500;
  font-size: 24px;
`

const ResidentsForm = styled.form`
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;
`

function ContentAddResident() {
  const { units } = useSelector(({ unitReducer: { units } }) => {
    return { units }
  })
  const { currentCondoId } = useSelector(
    ({ condoReducer: { currentCondoId } }) => {
      return { currentCondoId }
    }
  )
  const {
    resName,
    resLastname,
    resIdNumber,
    resPhone,
    resEmail,
    resPassword,
    resUnit,
    message,
  } = useSelector(
    ({
      residentReducer: {
        resName,
        resLastname,
        resIdNumber,
        resPhone,
        resEmail,
        resPassword,
        resUnit,
        message,
      },
    }) => {
      return {
        resName,
        resLastname,
        resIdNumber,
        resPhone,
        resEmail,
        resPassword,
        resUnit,
        message,
      }
    }
  )
  const { admin, resident } = useSelector(
    ({ sessionReducer: { admin, resident } }) => {
      return { admin, resident }
    }
  )
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUnits() {
      dispatch(retrieveUnits(currentCondoId))
    }
    getUnits()
  }, [])

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
    }

    dispatch(globalCreateDocument('resident', newDocument))
  }

  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <AddResidentDiv>
      <SectionTitle>Agregar Usuarios</SectionTitle>
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
          checked={resIdNumber}
        />
        <label htmlFor='resPhone'>Teléfono</label>
        <input
          id='resPhone'
          name='resPhone'
          type='resPhone'
          onChange={handleChange}
          checked={resPhone}
        />
        <label htmlFor='resEmail'>Email</label>
        <input
          id='resEmail'
          name='resEmail'
          type='email'
          onChange={handleChange}
          checked={resEmail}
        />
        <label htmlFor='resUnit'>Unidad</label>
        <input
          type='text'
          name='resUnit'
          id='service-select'
          value={resUnit}
          onChange={handleChange}
          required
        ></input>
        <label htmlFor='resPassword'>password</label>
        <input
          id='resPassword'
          name='resPassword'
          type='password'
          onChange={handleChange}
          checked={resPassword}
        />
        <button type='submit'>Submit</button>
        {message}
      </ResidentsForm>
    </AddResidentDiv>
  )
}

export default ContentAddResident
