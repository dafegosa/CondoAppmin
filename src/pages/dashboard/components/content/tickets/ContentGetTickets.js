import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import WriteMessagessButton from './WriteMessagesButton'
import { useSelector, useDispatch } from 'react-redux'
import {
  retrieveMessages,
  retrieveResidentTickets,
  selectedTicket,
} from '../../../../../store/messageReducer'
import { verifyUser } from '../../../../../store/sessionReducer'

const BigCentralMessagesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
export const MessageContainerMenu = styled.div`
  border-bottom: 3px solid rgba(96, 125, 139, 1);
  height: 30px;
  display: flex;
`

const MessageContainer = styled.div`
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffbf5b;
    border-radius: 4px;
  }
  .secction-title {
    color: rgba(255, 191, 91, 0.9);
  }
  .toRight {
    align-self: 'flex-end';
    color: red;
  }
`

const Message = styled.div`
  color: black;
  border-bottom: solid 1px rgba(96, 125, 139, 1);
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: row;
  &:hover {
    cursor: pointer;
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
  }
  h5 {
    margin: 2%;
    width: 33%;
  }
  .h6 {
    margin: 2%;
    width: 33%;
  }
  p {
    font-size: 12.5px;
    color: black;
    margin: 2% 6%;
    line-height: 1.2;
    width: 33%;
  }
`
const ContentGetTickets = () => {

  const dispatch = useDispatch()
  const { messagesList } = useSelector(
    ({ messageReducer: { messagesList } }) => {
      return { messagesList }
    }
  )
  const { admin } = useSelector(
    ({ sessionReducer: { admin } }) => {
      return { admin }
    }
  )
  const { currentCondoId } = useSelector(
    ({ condoReducer: { currentCondoId } }) => {
      return { currentCondoId }
    }
  )
  let history = useHistory()

  const ticketRead = (id) => {
    dispatch({ type: 'ID_TICKET_SELECTED', payload: id })
    dispatch(selectedTicket(id, history))
  }

  useEffect(() => {
    async function getTickets () {
      const { getResident, getAdmin } = await dispatch(verifyUser(history))
      if (getAdmin) {
        dispatch(retrieveMessages(getAdmin.data.id, 'ticket', '', currentCondoId))
      } else if (getResident) {
        dispatch(retrieveResidentTickets(getResident.data.email, 'ticket', '', currentCondoId)
        )
      }
    }
    getTickets()
  }, [currentCondoId])

  let messagesListReverse = []
  for (let i in messagesList) {
    messagesListReverse.push(messagesList[messagesList.length - 1 - i])
  }
  return (
    <BigCentralMessagesContainer>
      <MessageContainerMenu>
        {!admin && <WriteMessagessButton value='Nuevo Ticket' />}
      </MessageContainerMenu>
      <MessageContainer>
        {!!messagesListReverse &&
          messagesListReverse.length > 0 &&
          messagesListReverse.map((tickets, indx) => (
            <Message
              key={tickets.id}
              onClick={ticketRead.bind(indx, tickets._id)}
            >
              {tickets.ticketState === true && <h5> {tickets.from} </h5>}
              {tickets.ticketState === false && (
                <p className='h6'> {tickets.from} </p>
              )}
              <p> {tickets.subject} </p>
              <p> {tickets.date} </p>
            </Message>
          ))}
        {messagesListReverse.length === 0 && (
          <p> No hay historial de tickets </p>
        )}
      </MessageContainer>
    </BigCentralMessagesContainer>
  )
}

export default ContentGetTickets
