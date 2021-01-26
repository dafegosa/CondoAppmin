import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { verifyUser } from '../../../../../store/sessionReducer'
import axios from 'axios'

export const Button = styled.button`
  border: 1px solid rgba(96, 125, 139, 0.7);
  padding: 0.7rem 1.1rem;
  color: #182040;
  margin-top: 0;
  height: 2.5rem;
  cursor: pointer;
  background-color: #c8c8d8;
  border-radius: 0.5rem;
  transition: 220ms;
  width: 50%;

  &:hover {
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
      history.push('/dashboard/ticket/add')
    }
  }

  return (
    <Button id='buttonAddTicket' class={props.className} onClick={newMessage}>
      {props.value}
    </Button>
  )
}

export default WriteMessagessButton
