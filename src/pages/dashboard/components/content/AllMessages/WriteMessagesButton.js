import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { verifyUser } from '../../../../../store/sessionReducer'
import axios from 'axios'

export const Button = styled.button`
  /* margin-top: 0;
  background-color: rgb(80, 80, 152);
  border: 1px solid white;
  padding: 0.7rem 1.1rem;
  color: white;
  border-radius: 0.5rem;
  align-items: center;
  height: 2.5rem;
  width: auto;
  cursor: pointer;
  transition: 400ms;

  &.active {
    background-color: rgba(96, 125, 139, 0.7);
    color: white;
  } */
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
          history.push(`/dashboard`)
        })
        .catch((err) => err)
    }
  } else if (props.value === 'Responder') {
    var newMessage = () => {}
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
