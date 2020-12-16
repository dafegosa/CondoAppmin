import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import messageReducer, {
  retrieveMessages,
  readMessage,
} from '../../../store/messageReducer'
import sessionReducer, { verifyUser } from '../../../store/sessionReducer'

const MessageContainer = styled.section`
  grid-area: 2 / 11 / 9 / 13;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  background-color: rgba(96, 125, 139, 0.7);
  .secction-title {
    color: rgba(255, 191, 91, 0.9);
  }
  .secction-title.top-title {
    height: 40px;
    width: 100%;
    padding-bottom: 10px;
    background-color: #ffbf5b;
    color: rgba(96, 125, 139, 1);
    text-align: center;
  }
  .secction-title.bottom-title {
  }
`

const MessageInternContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    display: none;
  }
  margin: 0;
  background-color: rgba(96, 125, 139, 0.7);
`

const Message = styled.div`
  background-color: rgba(96, 125, 139, 1);
  color: white;
  text-align: left;
  margin: 2px;
  width: 100%;
  h6 {
    margin: 2%;
  }
  p {
    font-size: 12.5px;
    color: #d6d6d2;
    margin: 2% 6%;
    line-height: 1.2;
  }
  .dateSize {
    font-size: 9.5px;
  }
  .subjectSize {
    font-size: 15.5px;
  }
  &:hover {
    cursor: pointer;
    cursor: hand;
    margin-top: 0.5%;
    box-shadow: 0px 1px 8px 0px white;
    h6 {
      color: rgba(255, 191, 91, 0.9);
    }
    p {
      color: white;
    }
  }
`

function MessagesArea(props) {
  const dispatch = useDispatch()
  const renderSubTicket = useSelector((state) => state.subTicketReducer)
  const { messages } = useSelector(({ messageReducer: { messages } }) => {
    return { messages }
  })
  const { admin, resident } = useSelector(
    ({ sessionReducer: { admin, resident } }) => {
      return { admin, resident }
    }
  )
  let history = useHistory()

  const ticketRead = (id) => {
    console.log(id)
    const thisId = id
    const route = admin ? 'ticket' : 'message'
    dispatch({ type: 'ID_TICKET_SELECTED', payload: id })
    dispatch({ type: 'RENDER_SUBTICKETS', payload: { renderSubTicket } })
    dispatch(readMessage(id, route, messages, history))
  }

  useEffect(() => {
    async function getTickets() {
      const { getResident, getAdmin, type } = await dispatch(
        verifyUser(history)
      )

      if (messages.length === 0) {
        if (getAdmin) {
          dispatch(retrieveMessages(getAdmin.data.id, 'ticket', '?read=false'))
        } else if (getResident) {
          dispatch(
            retrieveMessages(getResident.data.id, 'message', '?read=false')
          )
        }
      }
    }
    getTickets()
  }, [])
  return (
    <MessageContainer>
      <p className='secction-title top-title'>
        <br />
        <strong>TICKETS</strong>
      </p>
      <MessageInternContainer>
        {!!messages &&
          messages.length > 0 &&
          messages.map((tickets, indx) => (
            <Message
              key={tickets._id}
              onClick={ticketRead.bind(indx, tickets._id)}
            >
              <h6> {tickets.from} </h6>
              <p className='dateSize'> {tickets.date} </p>
              <p className='subjectSize'> {tickets.subject} </p>
            </Message>
          ))}
      </MessageInternContainer>
    </MessageContainer>
  )
}

export default MessagesArea
