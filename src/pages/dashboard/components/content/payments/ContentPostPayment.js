import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { retrieveUnits } from '../../../../../store/unitReducer'
import { getAdmin, globalHandleChange, globalCreateDocument } from '../../../../../store/sessionReducer'
import { RESIDENT_FORM_CLEAN, RESIDENT_MESSAGE_CLEAN } from '../../../../../store/residentReducer'

export const AddPaymentDiv = styled.div`
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

export const SectionTitle = styled.h1`
  font-weight: 500;
  font-size: 24px;
`

const PaymentsForm = styled.form`
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;
`

function ContentPostPayment () {

  const { unit, service, value, dueDate, message, error } = useSelector(( { paymentReducer: { unit, service, value, dueDate, message, error }}) => {
    return { unit, service, value, dueDate, message, error }
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
    dispatch(globalHandleChange(e, 'PAYMENT'))
  }

  const createDocument = async (e) => {
    e.preventDefault()

    const { data } = await getAdmin()

    const newDocument = {
      admin: data.id,
      resident: '', 
      condo: currentCondoId, 
      unit: unit, 
      service: service, 
      value: value, 
      dueDate: dueDate, 
    }
    console.log('residente', newDocument)
    const token = localStorage.getItem('token')
    dispatch(globalCreateDocument('payment', newDocument, token))
  }
  return (
    !admin ? <Redirect to="/dashboard" /> :
    <AddPaymentDiv>
      <SectionTitle>Generar Pagos</SectionTitle>
      <PaymentsForm onSubmit={createDocument}>
        <label htmlFor='resLastname'>Servicio</label>
        <input
          id='service'
          name='service'
          type='text'
          onChange={handleChange}
          value={service}
        />
        <label htmlFor='value'>Valor</label>
        <input
          id='value'
          name='value'
          type='number'
          onChange={handleChange}
          value={value}
        />
        <label htmlFor='dueDate'>Fecha límite de pago</label>
        <input
          id='dueDate'
          name='dueDate'
          type='date'
          onChange={handleChange}
          value={dueDate}
        />
        <label htmlFor='unit'>Unidad</label>
        <select
          type='text'
          name='unit'
          id='service-select'
          value={unit}
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
        <button type='submit'>Submit</button>
        {message || error}
      </PaymentsForm>
    </AddPaymentDiv>
  )
}

export default ContentPostPayment
