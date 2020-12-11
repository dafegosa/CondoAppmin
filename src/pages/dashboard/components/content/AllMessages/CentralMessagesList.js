import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import WriteMessagessButton from './WriteMessagesButton'
import { useSelector, useDispatch } from 'react-redux'
import {
  retrieveMessages,
  readMessage,
} from '../../../../../store/messageReducer'
import { verifyUser } from '../../../../../store/sessionReducer'

const BigCentarlMessagesContainer = styled.div`
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
  flex-direction: column;
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
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
  }
  h6 {
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
const MessagesArea = () => {
  const dispatch = useDispatch()
  const { messagesList } = useSelector(
    ({ messageReducer: { messagesList } }) => {
      return { messagesList }
    }
  )

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
    const route = admin ? 'ticket' : 'message'
    dispatch(readMessage(id, route, messages, history))
  }

  // useEffect(async () => {
  //   const { getResident, getAdmin, type } = await dispatch(verifyUser())
  //   if (getAdmin) {
  //     user = 'admin'
  //   } else if (getResident) {
  //     user = 'resident'
  //   }

  //   axios
  //     .get('http://localhost:8000/ticket', {
  //       url: `/${getAdmin.data.id}/${user}`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((list) => {
  //       const unReadMessages = list.data.data.filter((message) => {
  //         return getAdmin.data.id == message.to
  //       })

  useEffect(() => {
    async function getTickets() {
      const { getResident, getAdmin, type } = await dispatch(
        verifyUser(history)
      )

      if (getAdmin) {
        console.log('Es un admin!')
        console.log('id', getAdmin.data.id)
        dispatch(retrieveMessages(getAdmin.data.id, 'ticket', ''))
      } else if (getResident) {
        console.log('Es un Resident!')
        dispatch(retrieveMessages(getResident.data.id, 'message', ''))
      }
    }
    console.log(getTickets())
  }, [])

  return (
    <BigCentarlMessagesContainer>
      <MessageContainerMenu>
        <WriteMessagessButton value='Nuevo mensaje +' />
      </MessageContainerMenu>
      <MessageContainer>
        {!!messagesList &&
          messagesList.length > 0 &&
          messagesList.map((tickets, indx) => (
            <Message
              key={tickets.id}
              onClick={ticketRead.bind(indx, tickets._id)}
            >
              <h6> {tickets.from} </h6>
              <p> {tickets.subject} </p>
              <p> {tickets.date} </p>
            </Message>
          ))}
      </MessageContainer>
    </BigCentarlMessagesContainer>
  )
}

export default MessagesArea
