import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { retrieveUnits } from '../../../../../store/unitReducer'
import {
  globalHandleChange,
  globalUpdateDocument,
} from '../../../../../store/sessionReducer'
import {
  RESIDENT_ERROR_SET,
  RESIDENT_FORM_CLEAN,
  RESIDENT_MESSAGE_CLEAN,
} from '../../../../../store/residentReducer'

export const AddResidentDiv = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  & input,
  & select {
    color: black;
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

function ContentEditResident() {
  const { units } = useSelector(({ unitReducer: { units } }) => {
    return { units }
  })
  const { currentCondoId } = useSelector(
    ({ condoReducer: { currentCondoId } }) => {
      return { currentCondoId }
    }
  )
  const {
    residents,
    currentResident,
    resName,
    resLastname,
    resIdNumber,
    resPhone,
    resEmail,
    resUnit,
    message,
    error,
  } = useSelector(
    ({
      residentReducer: {
        residents,
        currentResident,
        resName,
        resLastname,
        resIdNumber,
        resPhone,
        resEmail,
        resPassword,
        resUnit,
        message,
        error,
      },
    }) => {
      return {
        residents,
        currentResident,
        resName,
        resLastname,
        resIdNumber,
        resPhone,
        resEmail,
        resPassword,
        resUnit,
        message,
        error,
      }
    }
  )
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: RESIDENT_FORM_CLEAN })
    dispatch({ type: RESIDENT_ERROR_SET })
    dispatch({ type: RESIDENT_MESSAGE_CLEAN })

    dispatch(
      globalHandleChange(
        { target: { name: 'resName', value: currentResident.name } },
        'RESIDENT'
      )
    )
    dispatch(
      globalHandleChange(
        { target: { name: 'resLastname', value: currentResident.lastName } },
        'RESIDENT'
      )
    )
    dispatch(
      globalHandleChange(
        { target: { name: 'resIdNumber', value: currentResident.idNumber } },
        'RESIDENT'
      )
    )
    dispatch(
      globalHandleChange(
        { target: { name: 'resPhone', value: currentResident.phone } },
        'RESIDENT'
      )
    )
    dispatch(
      globalHandleChange(
        { target: { name: 'resEmail', value: currentResident.email } },
        'RESIDENT'
      )
    )
    dispatch(
      globalHandleChange(
        { target: { name: 'resUnit', value: currentResident.unitId._id } },
        'RESIDENT'
      )
    )

    async function getUnits() {
      await dispatch(retrieveUnits(currentCondoId))
    }
    getUnits()
  }, [])

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'RESIDENT'))
  }

  const updateDocument = async (e) => {
    e.preventDefault()

    const updatedResident = {
      name: resName,
      lastName: resLastname,
      idNumber: resIdNumber,
      phone: resPhone,
      email: resEmail,
      password: currentResident.password,
      unitId: resUnit,
      condoId: currentResident.condoId,
    }
    dispatch(
      globalUpdateDocument(
        'resident',
        currentResident._id,
        updatedResident,
        residents
      )
    )
  }
  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <AddResidentDiv>
      <SectionTitle>Agregar Residentes</SectionTitle>
      <ResidentsForm onSubmit={updateDocument}>
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
        <input
          type='text'
          name='resUnit'
          id='service-select'
          value={resUnit}
          onChange={handleChange}
          required
        >
          {!!units &&
            units.length &&
            units.map((unit) => {
              return (
                <option value={unit._id} key={unit._id}>
                  {unit.name}
                </option>
              )
            })}
        </input>
        <button type='submit'>Enviar</button>
        {message || error}
      </ResidentsForm>
    </AddResidentDiv>
  )
}

export default ContentEditResident
