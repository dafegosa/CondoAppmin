import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import WriteMessagessButton from './WriteMessagesButton'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MessageContainerMenu from './ContentGetTickets'
import { useHistory } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { verifyUser } from '../../../../../store/sessionReducer'
import { CREATE_MESSAGE } from '../../../../../store/messageFormReducer'

const BigCentarlMessagesContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

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
    max-height: 500px;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

const Input = styled.input`
  background-color: none;
  border: none;
  border-bottom: 1px solud rgba(96, 125, 139, 1);
  width: 100%;
`
const MessageZone = styled.div`
  background-color: green;
  margin: 2rem auto;
  width: 80%;
  height: 100vh;
  border-radius: 1rem;

  color: white;
  overflow: hidden;
  margin-bottom: 2%;
  background-color: #304068;
  .ticketBody {
    margin-left: 1rem;
    padding-bottom: 2rem;
  }
  .ticketHeader {
    color: white;
    margin: 1rem;
  }
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
const SubTicketCreator = styled.button`
  padding: 5px;
  border: 1px solid rgba(96, 125, 139, 0.7);
  color: rgba(96, 125, 139, 0.7);
  margin-right: 3px;
  cursor: pointer;
  transition: 400ms;

  &.active {
    background-color: rgba(96, 125, 139, 0.7);
    color: white;
  }
`

const SubTicket = styled.div`
  border-bottom: solid 1px #ebe9e6;
  .date {
    font-size: 9px;
  }
  .body {
    color: #4f4e4d;
    margin-left: 50px;
  }
`
const token = localStorage.getItem('token')

const ContentViewTicket = (props) => {
  let history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector((state) => state.messageFormReducer)
  const renderSubTicket = useSelector((state) => state.subTicketReducer)
  const { from, to, subject, body, date, ticketState, thisId, subBody } = state
  const [userEmail, setUserEmail] = useState('')
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [addData, setVal] = useState('')
  const [subTickets, setSubTickets] = useState([])

  useEffect(async () => {
    const token = localStorage.getItem('token')
    const { getResident, getAdmin, type } = await dispatch(
      verifyUser(history, token)
    )
    let user = ''
    let getUser = ''
    if (getAdmin) {
      user = 'admin'
      getUser = getAdmin
    } else if (getResident) {
      user = 'resident'
      getUser = getResident
    }
    axios({
      method: 'PUT',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/subTicket`,
      data: {
        thisId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        setSubTickets(data.data.data)
      })

      .catch((err) => {})
  }, [renderSubTicket])

  const handleChange = (event, editor) => {
    setMessage('')
    const CKEdata = editor.getData()
    setVal(addData)
    const value = CKEdata
    dispatch({ type: 'CREATE_SUBTICKET', payload: { value } })
  }

  useEffect(async () => {
    const token = localStorage.getItem('token')
    const { getResident, getAdmin, type } = await dispatch(
      verifyUser(history, token)
    )

    if (getAdmin) {
      setUser('iAmAdmin')
      setUserEmail(getAdmin.data.email)
    } else if (getResident) {
      setUserEmail(getResident.data.email)
    }
  }, [])

  const createSubTicket = (e) => {
    setMessage('Respuesta enviada')
    e.preventDefault()
    axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: `/subTicket`,
      data: {
        from: userEmail,
        ticketFather: thisId,
        body: subBody,
        date,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/ticket/updateTicket`,
        data: {
          _id: thisId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: 'RENDER_SUBTICKETS', payload: { renderSubTicket } })
    })
  }

  return (
    <BigCentarlMessagesContainer onSubmit={createSubTicket}>
      <MessageZone>
        <p className='ticketHeader'>De: {from}</p>
        <p className='ticketHeader'>Asunto: {subject}</p>
        <br></br>
        <p
          name='body'
          readOnly
          className='ticketBody'
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
        <br></br>
        <br></br>
        {!!subTickets &&
          subTickets.length > 0 &&
          subTickets.map((subTickets, indx) => (
            <SubTicket>
              <p> {subTickets.from}: </p>
              <p className='date'> {subTickets.date} </p>
              <br></br>
              <p
                className='body'
                dangerouslySetInnerHTML={{
                  __html: subTickets.body,
                }}
              />
              <br></br>
              <br></br>
            </SubTicket>
          ))}
      </MessageZone>
      <MessageContainerMenu>
        {ticketState === true && (
          <SubTicketCreator
            id='response'
            type='button'
            className='toRight'
            value='Responder'
            onClick={createSubTicket}
          >
            Responder
          </SubTicketCreator>
        )}
        {user === 'iAmAdmin' && ticketState === true && (
          <WriteMessagessButton
            type='button'
            className='toRight'
            value='Ticket Solucionado'
          />
        )}
        <SuccessMessage>{message}</SuccessMessage>
      </MessageContainerMenu>
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
          required
          onChange={handleChange}
        />
      )}

      {!ticketState && <p>Asunto solucionado</p>}
    </BigCentarlMessagesContainer>
  )
}

export default ContentViewTicket
