import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { retrieveUnits } from '../../../../../store/unitReducer'
import {
  getAdmin,
  globalHandleChange,
  globalCreateDocument,
} from '../../../../../store/sessionReducer'
import {
  RESIDENT_FORM_CLEAN,
  RESIDENT_MESSAGE_CLEAN,
} from '../../../../../store/residentReducer'
import {
  PAYMENTS_SET_MESSAGE,
  PAYMENTS_SET_ERROR,
  PAYMENTS_CLEAN_ERROR,
  PAYMENTS_CLEAN_MESSAGE,
  PAYMENTS_FORM_CLEAN,
} from '../../../../../store/paymentReducer'
import Loader from '../../../Loader'

export const AddPaymentDiv = styled.div`
  padding: 2rem 0 5rem 0;
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
  color: darkblue;
  font-weight: 500;
  font-size: 24px;
`

const PaymentsForm = styled.form`
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;
  color: black;
`

function ContentPostPayment() {
  const [loading, setLoading] = useState(false)
  const {
    unit,
    service,
    value,
    description,
    dueDate,
    message,
    error,
  } = useSelector(
    ({
      paymentReducer: {
        unit,
        service,
        value,
        description,
        dueDate,
        message,
        error,
      },
    }) => {
      return { unit, service, value, description, dueDate, message, error }
    }
  )
  const { units } = useSelector(({ unitReducer: { units } }) => {
    return { units }
  })
  const { currentCondoId } = useSelector(
    ({ condoReducer: { currentCondoId } }) => {
      return { currentCondoId }
    }
  )
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUnits() {
      dispatch({ type: PAYMENTS_CLEAN_ERROR })
      dispatch({ type: PAYMENTS_CLEAN_MESSAGE })
      dispatch({ type: PAYMENTS_FORM_CLEAN })

      await dispatch(retrieveUnits(currentCondoId))
    }
    getUnits()
  }, [currentCondoId])

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'PAYMENT'))
  }

  const createDocument = async (e) => {
    e.preventDefault()
    setLoading(true)
    dispatch({ type: PAYMENTS_CLEAN_ERROR })
    dispatch({ type: PAYMENTS_CLEAN_MESSAGE })

    try {
      const { data } = await getAdmin()
      const chosenUnit = units.find((singleUnit) => singleUnit._id === unit)

      const newDocument = {
        admin: data.id,
        resident: chosenUnit.resident._id,
        condo: currentCondoId,
        unit: unit,
        service: service,
        description: description,
        value: value,
        dueDate: dueDate,
      }
      const token = localStorage.getItem('token')
      dispatch(globalCreateDocument('payment', newDocument, token)).then(() => {
        setLoading(false)
      })
    } catch (err) {
      dispatch({
        type: PAYMENTS_SET_ERROR,
        payload: 'Asigne un residente a esa unidad',
      })
    }
  }

  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <AddPaymentDiv>
      {loading ? <Loader show={loading}>Cargando...</Loader> : null}
      <SectionTitle>Generar Pagos</SectionTitle>
      <PaymentsForm onSubmit={createDocument}>
        <label htmlFor='resLastname'>Servicio</label>
        <input
          id='service'
          name='service'
          type='text'
          onChange={handleChange}
          value={service}
          className='form-control'
        />
        <label htmlFor='value'>Valor</label>
        <input
          id='value'
          name='value'
          type='number'
          onChange={handleChange}
          value={value}
          className='form-control'
        />
        <label htmlFor='description'>Concepto</label>
        <textarea
          id='description'
          name='description'
          rows='3'
          onChange={handleChange}
          value={description}
          className='form-control'
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '10px',
            boxSizing: 'border-box',
          }}
        >
          {description}
        </textarea>
        <label htmlFor='dueDate'>Fecha límite de pago</label>
        <input
          id='dueDate'
          name='dueDate'
          type='date'
          onChange={handleChange}
          value={dueDate}
          className='form-control'
        />
        <label htmlFor='unit'>Unidad</label>
        <select
          type='text'
          name='unit'
          id='service-select'
          value={unit}
          onChange={handleChange}
          required
          className='form-control'
        >
          <option>Escoge unidad</option>
          {!!units &&
            units.length > 0 &&
            units.map((unit) => {
              return (
                <option value={unit._id} key={unit._id}>
                  {unit.name}
                </option>
              )
            })}
        </select>
        <button
          type='submit'
          style={{
            marginTop: '20px',
            backgroundColor: '#505098',
            border: '1px solid white',
            padding: '0.7rem 1.1rem',
            color: 'white',
            borderRadius: '.5rem',
          }}
        >
          Generar
        </button>
        {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{message}</p>}
      </PaymentsForm>
    </AddPaymentDiv>
  )
}

export default ContentPostPayment
