import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { verifyUser } from '../../../../../store/sessionReducer'
import axios from 'axios'

export const Button = styled.button`
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

const WriteMessagessButton = (props) => {
  let history = useHistory()
  const state = useSelector((state) => state.messageFormReducer)
  const [userEmail, setUserEmail] = useState('')
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const { thisId } = state
  if (props.value === 'Ticket Solucionado') {
    var newMessage = () => {
      console.log('Que se dice', thisId)
      axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/ticket/updateState`,
        data: {
          _id: thisId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data }) => {
          console.log(data)
          history.push(`/dashboard`)
        })
        .catch((err) => err)
    }
  } else if (props.value === 'Responder') {
    var newMessage = () => {
      console.log('Por acá estamos')
    }
  } else {
    var newMessage = () => {
      history.push('/dashboard/messagesform')
    }
  }

  return (
    <Button class={props.className} onClick={newMessage}>
      {props.value}
    </Button>
  )
}

export default WriteMessagessButton
