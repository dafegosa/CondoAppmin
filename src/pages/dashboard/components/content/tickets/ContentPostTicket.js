import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import WriteMessagessButton from './WriteMessagesButton'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MessageContainerMenu } from './ContentGetTickets'
import { CREATE_MESSAGE } from '../../../../../store/messageFormReducer'
import { verifyUser } from '../../../../../store/sessionReducer'

const BigCentarlMessagesContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .ck-content {
    height: 300px;
  }
  .alert {
    color: red;
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

const ContentPostTicket = (props) => {
  const token = localStorage.getItem('token')
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const { currentCondoId } = useSelector(
    ({ condoReducer: { currentCondoId } }) => {
      return { currentCondoId }
    }
  )
  const state = useSelector((state) => state.messageFormReducer)
  const [userEmail, setUserEmail] = useState('')
  const [openTicket, setOpenTicket] = useState([])
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState('')
  const [addData, setVal] = useState('')
  const dispatch = useDispatch()

  const history = useHistory()

  const handleInputChange = (e) => {
    setMessage('')
    setAlert('')
    const { name, value } = e.target
    dispatch({ type: CREATE_MESSAGE, payload: { name, value } })
  }

  useEffect(() => {
    async function getUserEmail() {
      const token = localStorage.getItem('token')
      const { getResident, getAdmin } = await dispatch(
        verifyUser(history, token)
      )
      if (getAdmin) {
        setUserEmail(getAdmin.data.email)
      } else if (getResident) {
        setUserEmail(getResident.data.email)
        axios
          .get('http://localhost:8000/ticket', {
            url: `/${getResident.data.id}/resident`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((list) => {
            if (getResident) {
              const unReadMessages = list.data.data.filter((message) => {
                return getResident.data.email === message.from
              })
              dispatch({ type: 'MESSAGE_LIST', payload: unReadMessages })

              const openTicket = unReadMessages.filter(
                (el) => el.ticketState === true
              )
              setOpenTicket(openTicket)
            }
          })
          .catch((err) => {})
      }
    }

    getUserEmail()
  }, [])

  const handleChange = (event, editor) => {
    setMessage('')
    setAlert('')
    const CKEdata = editor.getData()
    const name = 'body'
    setVal(addData)
    const value = CKEdata
    dispatch({ type: CREATE_MESSAGE, payload: { name, value } })
  }
  const createTicket = (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    const { from, to, subject, body, date, read, ticketState } = state

    let userDestinationType = ''
    let messageType = ''
    admin ? (userDestinationType = 'resident') : (userDestinationType = 'admin')
    admin ? (messageType = 'message') : (messageType = 'ticket')

    axios({
      method: 'PUT',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/${userDestinationType}/getEmail`,
      data: {
        email: to,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const token = localStorage.getItem('token')
        axios({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/${messageType}`,
          data: {
            from: userEmail,
            to: response.data.id,
            subject,
            body,
            date,
            read,
            ticketState: true,
            condoId: currentCondoId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(setMessage('¡Ticket Enviado!'))
          .then(setUserEmail(''))
      })
      .catch((err) => {
        setAlert('Destinatario no Existe')
      })
  }

  return (
    <BigCentarlMessagesContainer onSubmit={createTicket}>
      {openTicket.length > 0 && (
        <p className='alert'>
          Usted Tiene un ticket en estado activo. (Asunto:{' '}
          {openTicket[0].subject}
          ).
        </p>
      )}
      {openTicket.length === 0 && <MessageContainerMenu></MessageContainerMenu>}

      <p>
        Para
        <Input
          id='to'
          name='to'
          type='email'
          required={true}
          onChange={handleInputChange}
          className='form-control'
        />
      </p>
      <p>
        De
        <Input
          id='from'
          name='from'
          type='text'
          required={true}
          value={userEmail}
          readOnly
          className='form-control'
        />
      </p>
      <p>
        Asunto
        <Input
          id='subject'
          name='subject'
          type='text'
          onChange={handleInputChange}
          className='form-control'
        />
      </p>

      <MessageZone>
        <Alert>{alert}</Alert>
        <SuccessMessage>{message}</SuccessMessage>
      </MessageZone>
      <br></br>
      <CKEditor
        style={{ height: '300px', rows: '10' }}
        editor={ClassicEditor}
        data={addData}
        name='body'
        config={{
          ckfinder: {
            uploadUrl: 'http://localhost:8000/uploads',
          },
        }}
        required
        onChange={handleChange}
      />
      <WriteMessagessButton type='submit' className='toRight' value='enviar' />
    </BigCentarlMessagesContainer>
  )
}

export default ContentPostTicket
