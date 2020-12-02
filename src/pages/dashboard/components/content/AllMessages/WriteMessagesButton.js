import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Button = styled.button`
  padding: 5px;
  color: #f1f2df;
  background-color: rgba(96, 125, 139, 0.7);
  cursor: pointer;
  border: none;
  .toRight {
    align-self: 'flex-end';
    color: red;
  }
`

const WriteMessagessButton = (props) => {
  let history = useHistory()
  const newMessage = () => {
    history.push('/dashboard/messagesform')
  }
  return (
    <Button class={props.className} onClick={newMessage}>
      {props.value}
    </Button>
  )
}

export default WriteMessagessButton
