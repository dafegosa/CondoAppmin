import React, { useEffect, useState } from 'react'
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
import axios from 'axios'

const BigCentralMessagesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
export const MessageContainerMenu = styled.div`
  margin: 2rem;
  height: auto;
  display: flex;
  justify-content: center;
`

const MessageContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  justify-content: space-around;
  margin: 0 auto;
  padding: 1rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
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
  text-align: left;
  width: 72%;
  display: flex;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
    background-color: #e0e0e8;
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
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
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
    async function getTickets() {
      const token = localStorage.getItem('token')
      const { getResident, getAdmin } = await dispatch(
        verifyUser(history, token)
      )
      if (getAdmin) {
        dispatch(
          retrieveMessages(getAdmin.data.id, 'ticket', '', currentCondoId)
        )
      } else if (getResident) {
        dispatch(
          retrieveResidentTickets(
            getResident.data.email,
            'ticket',
            '',
            currentCondoId
          )
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
      {/* <MessageContainerMenu>
        {!admin && <WriteMessagessButton value='Nuevo Tickets' />}
      </MessageContainerMenu> */}

      <MessageContainer>
        {!!messagesListReverse &&
          messagesListReverse.length > 0 &&
          messagesListReverse.map((tickets, indx) => (
            <Message
              key={tickets.id}
              onClick={ticketRead.bind(indx, tickets._id)}
              id='ticketReceived'
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
