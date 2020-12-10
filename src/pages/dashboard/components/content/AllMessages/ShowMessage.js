import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import WriteMessagessButton from './WriteMessagesButton'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MessageContainerMenu } from './CentralMessagesList'
import { useHistory } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { verifyUser } from '../../../../../store/sessionReducer'

const BigCentarlMessagesContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffbf5b;
    border-radius: 4px;
  }
  .ck-content {
    height: 300px;
  }
`

const Input = styled.input`
  background-color: none;
  border: none;
  border-bottom: 1px solud rgba(96, 125, 139, 1);
  width: 100%;
`
const MessageZone = styled.div`
  color: red;
  width: 100%;
  height: 15px;
  display: flex;
  flex-direction: row;
`
const SuccessMessage = styled.p`
  color: green;
  margin: 5px;
  width: 65%;
`
const Alert = styled.p`
  color: red;
  margin: 5px;
  width: 35%;
`

const token = localStorage.getItem('token')

const ShowMessage = (props) => {
  let history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector((state) => state.messageFormReducer)

  const { from, to, subject, body, date } = state
  const [userEmail, setUserEmail] = useState('')
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState('')
  const [addData, setVal] = useState('')

  useEffect(async () => {
    const { getResident, getAdmin, type } = await dispatch(verifyUser())
    if (getAdmin) {
      setUserEmail(getAdmin.data.email)
    } else if (getResident) {
      setUserEmail(getResident.data.email)
    }
  }, [])

  const createTicket = (e) => {
    history.push(`/dashboard/messagesform`)
  }

  return (
    <BigCentarlMessagesContainer onSubmit={createTicket}>
      <MessageContainerMenu>
        <WriteMessagessButton
          type='submit'
          className='toRight'
          value='Responder'
        />
      </MessageContainerMenu>
      <p>
        Para
        <Input
          id='to'
          name='to'
          type='email'
          required={true}
          value={userEmail}
          readOnly
        />
      </p>
      <p>
        De
        <Input
          id='from'
          name='from'
          type='text'
          value={from}
          required={true}
          readOnly
        />
      </p>
      <p>
        Asunto
        <Input
          id='subject'
          name='subject'
          type='text'
          value={subject}
          readOnly
        />
      </p>

      <MessageZone>
        <Alert>{alert}</Alert>
        <SuccessMessage>{message}</SuccessMessage>
      </MessageZone>
      <br></br>
      <p
        name='body'
        readOnly
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
    </BigCentarlMessagesContainer>
  )
}

export default ShowMessage
