import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAdmin,
  globalHandleChange,
  globalCreateDocument,
} from '../../../../../store/sessionReducer'
import {
  CONDO_FORM_CLEAN,
  CONDO_MESSAGE_CLEAN,
} from '../../../../../store/condoReducer'

export const AddCondoDiv = styled.div`
  margin-top: 20px;
  padding: 0 10px;
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
  /* font-family: 'Cormorant Garamond'; */
  margin: 10px 0 40px 0;
  font-weight: 500;
  font-size: 32px;
  color: #181838;
`

const CondosForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  box-sizing: border-box;
  width: 70%;
  color: black;

  & div {
    width: 45%;
  }
`

function ContentPostCondo() {
  const { currentCondoId, condoName, condoAddress, message } = useSelector(
    ({
      condoReducer: { currentCondoId, condoName, condoAddress, message },
    }) => {
      return { currentCondoId, condoName, condoAddress, message }
    }
  )
  const { admin, resident } = useSelector(
    ({ sessionReducer: { admin, resident } }) => {
      return { admin, resident }
    }
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: CONDO_MESSAGE_CLEAN })
  }, [])

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'CONDO'))
  }

  const createDocument = async (e) => {
    e.preventDefault()

    const { data } = await getAdmin()

    const newDocument = {
      name: condoName,
      address: condoAddress,
      admin: data.id,
    }

    const token = localStorage.getItem('token')
    dispatch(globalCreateDocument('condo', newDocument, token))
    dispatch({ type: CONDO_FORM_CLEAN })
  }

  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <AddCondoDiv>
      <SectionTitle>Ingresa un nuevo condominio</SectionTitle>
      <CondosForm onSubmit={createDocument}>
        <div>
          <label htmlFor='condoName'>Nombre</label>
          <input
            className='form-control'
            id='condoName'
            name='condoName'
            type='text'
            onChange={handleChange}
            value={condoName}
          />
        </div>
        <div>
          <label htmlFor='condoAddress'>Dirección</label>
          <input
            className='form-control'
            id='condoAddress'
            name='condoAddress'
            type='text'
            onChange={handleChange}
            value={condoAddress}
          />
        </div>
        <button
          type='submit'
          className='btn btn-success'
          style={{
            marginTop: '20px',
            backgroundColor: '#505098',
            border: '1px solid white',
            padding: '0.7rem 1.1rem',
          }}
        >
          Submit
        </button>
        {message && message}
      </CondosForm>
    </AddCondoDiv>
  )
}

export default ContentPostCondo
