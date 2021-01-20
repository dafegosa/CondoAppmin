import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  globalHandleChange,
  globalCreateDocument,
} from '../../../../../store/sessionReducer'
import {
  UNIT_FORM_CLEAN,
  UNIT_MESSAGE_CLEAN,
} from '../../../../../store/unitReducer'

const AddUnitDiv = styled.div`
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
  margin: 10px 0 40px 0;
  font-weight: 500;
  font-size: 28px;
  color: rgba(96, 125, 139, 0.9);
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

function ContentPostUnit() {
  const { unitName, message } = useSelector(
    ({ unitReducer: { unitName, message } }) => {
      return { unitName, message }
    }
  )
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
    dispatch({ type: UNIT_FORM_CLEAN })
    dispatch({ type: UNIT_MESSAGE_CLEAN })
  }, [])

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'UNIT'))
  }

  const createDocument = async (e) => {
    e.preventDefault()

    const newDocument = {
      name: unitName,
      condoId: currentCondoId,
    }
    const token = localStorage.getItem('token')
    dispatch(globalCreateDocument('unit', newDocument, token))
  }

  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <AddUnitDiv>
      <SectionTitle>Agregar Unidades</SectionTitle>
      <UnitsForm onSubmit={createDocument}>
        <div>
          <label htmlFor='unitName'>Nomenclatura</label>
          <input
            className='form-control'
            id='unitName'
            name='unitName'
            type='text'
            onChange={handleChange}
            value={unitName}
          />
        </div>
        <button
          type='submit'
          className='btn btn-success'
          style={{
            marginTop: '20px',
            backgroundColor: '#505098',
            border: 'none',
          }}
        >
          Submit
        </button>
        {message}
      </UnitsForm>
    </AddUnitDiv>
  )
}

export default ContentPostUnit
