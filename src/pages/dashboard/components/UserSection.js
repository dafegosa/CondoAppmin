import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { withTheme } from 'styled-components'
import { IconButton } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { CSSTransition } from 'react-transition-group'
import { signoutDispatch } from '../../../store/sessionReducer'
import { getDate } from '../../../store/messageFormReducer'

export const UserTopBarDiv = styled.div`
  position: relative;
  display: flex;
  padding: 15px;
  color: white;
  align-items: center;
  box-sizing: border-box;
`

export const WelcomeMsg = styled.p`
  color: white;
  font-size: 14px;
  margin-right: 5px;
`

export const UserOptionsDiv = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0%;
  background-color: ${(props) => props.theme.thirdColor};

  & ul {
    padding-inline-start: 0;
    margin: 0px;
  }

  &.transition-enter,
  &.transition-appear {
    opacity: 0;
  }
  &.transition-enter-active,
  &.transition-appear-active {
    opacity: 1;
    transition: opacity 500ms;
  }
  &.transition-exit {
    opacity: 1;
  }
  &.transition-exit-active {
    opacity: 0;
    transition: opacity 500ms;
  }
`

export const UserOptionsListItem = styled.li`
  font-weight: 300;
  font-size: 14px;
  padding: 10px 0;
  text-align: center;
  list-style: none;

  &:hover {
    cursor: pointer;
    font-weight: 400;
  }
`

function UserSection(props) {
  const [renderOptions, setRenderOptions] = useState(false)

  let history = useHistory()
  const dispatch = useDispatch()

  const userSectionOptionsClick = (e) => {
    setRenderOptions(!renderOptions)
  }

  const signout = (e) => {
    localStorage.removeItem('token')
    dispatch(signoutDispatch())
    history.push('/')
  }

  return (
    <UserTopBarDiv>
      <p>{getDate()} - </p>
      <WelcomeMsg> ¡Hola, {props.name}!</WelcomeMsg>
      <AccountCircleIcon />
      <IconButton style={{ padding: '0px' }}>
        <ArrowDropDownIcon
          className='arrow-drop-down-icon'
          style={{ color: 'white', fontSize: '28px' }}
          onClick={userSectionOptionsClick}
        />
      </IconButton>
      <CSSTransition
        in={renderOptions}
        timeout={500}
        classNames='transition'
        unmountOnExit
        appear
      >
        <UserOptionsDiv>
          <ul>
            <UserOptionsListItem>Profile</UserOptionsListItem>
            <UserOptionsListItem onClick={signout}>Logout</UserOptionsListItem>
          </ul>
        </UserOptionsDiv>
      </CSSTransition>
    </UserTopBarDiv>
  )
}

export default withRouter(withTheme(UserSection))
