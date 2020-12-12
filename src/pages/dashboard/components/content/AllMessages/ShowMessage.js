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
import { CREATE_MESSAGE } from '../../../../../store/messageFormReducer'

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
    height: 10%;
  }
`

const Input = styled.input`
  background-color: none;
  border: none;
  border-bottom: 1px solud rgba(96, 125, 139, 1);
  width: 100%;
`
const MessageZone = styled.div`
  width: 100%;
  height: 80%;
  background-color: white;
  overflow-y: scroll;
  margin-bottom: 2%;
  color: rgba(96, 125, 139, 1);
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

  const { from, to, subject, body, date, ticketState } = state
  const [userEmail, setUserEmail] = useState('')
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState('')
  const [addData, setVal] = useState('')

  const handleChange = (event, editor) => {
    setMessage('')
    setAlert('')
    const CKEdata = editor.getData()
    console.log(CKEdata)
    const name = 'body'
    setVal(addData)
    const value = CKEdata
    dispatch({ type: CREATE_MESSAGE, payload: { name, value } })
  }
  const ticketCLosed = () => {
    console.log('Vamo a cerrarlo')
  }
  useEffect(async () => {
    const { getResident, getAdmin, type } = await dispatch(verifyUser())

    if (getAdmin) {
      setUser('iAmAdmin')
      setUserEmail(getAdmin.data.email)
    } else if (getResident) {
      setUserEmail(getResident.data.email)
    }
  }, [])

  const createSubTicket = (e) => {
    history.push(`/dashboard/messagesform`)
  }

  return (
    <BigCentarlMessagesContainer onSubmit={createSubTicket}>
      <MessageContainerMenu>
        {ticketState === true && (
          <WriteMessagessButton
            type='submit'
            className='toRight'
            value='Responder'
          />
        )}
        {user === 'iAmAdmin' && ticketState === true && (
          <WriteMessagessButton
            type='submit'
            className='toRight'
            value='Ticket Solucionado'
            onClick={ticketCLosed}
          />
        )}
      </MessageContainerMenu>

      <MessageZone>
        <p>Para: {userEmail}</p>
        <p>De: {from}</p>
        <p>Asunto: {subject}</p>
        <p
          name='body'
          readOnly
          style={{ border: '1px solid black', rows: '10' }}
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      </MessageZone>
      {ticketState && (
        <CKEditor
          style={{ height: '300px', rows: '10' }}
          editor={ClassicEditor}
          name='body'
          config={{
            ckfinder: {
              uploadUrl: 'http://localhost:8000/uploads',
            },
          }}
          // onChange={handleChange}
        />
      )}
      {!ticketState && <p>Asunto solucionado</p>}
    </BigCentarlMessagesContainer>
  )
}

export default ShowMessage
