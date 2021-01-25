import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { withTheme } from 'styled-components'
import { IconButton } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { CSSTransition } from 'react-transition-group'
import { verifyUser, signoutDispatch } from '../../../store/sessionReducer'
import { getDate } from '../../../store/messageFormReducer'

export const UserTopBarDiv = styled.div`
  position: relative;
  display: flex;
  padding: 15px;
  color: #9898b8;
  align-items: center;
  box-sizing: border-box;
`

export const WelcomeMsg = styled.p`
  display: inline-block;
  align-self: center;
  color: white;
  font-size: 1rem;
  margin-right: 0.3rem;
  margin-bottom: 0;
`

export const UserOptionsDiv = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0%;
  background-color: #7078c8;
  color: white;
  border-radius: 0 0 0.5rem 0.5rem;

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
  font-size: 1rem;
  padding: 10px 0;
  text-align: center;
  list-style: none;

  &:hover {
    cursor: pointer;
    font-weight: 400;
    color: white;
  }
`

function UserSection() {
  const [renderOptions, setRenderOptions] = useState(false)
  const [currentUserName, setCurrentUserName] = useState('')

  let history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    async function getName() {
      const token = localStorage.getItem('token')
      const { getResident, getAdmin } = await dispatch(
        verifyUser(history, token)
      )
      if (getAdmin) {
        setCurrentUserName(getAdmin.data.name)
      } else if (getResident) {
        setCurrentUserName(getResident.data.name)
      }
    }
    getName()
  }, [])

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
      <WelcomeMsg> ¡Hola, {currentUserName}!</WelcomeMsg>
      <AccountCircleIcon />
      <IconButton style={{ padding: '0px' }} onClick={userSectionOptionsClick}>
        <ArrowDropDownIcon
          className='arrow-drop-down-icon'
          style={{ color: 'white', fontSize: '2.5rem' }}
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
            <UserOptionsListItem id='logout' onClick={signout}>
              Logout
            </UserOptionsListItem>
          </ul>
        </UserOptionsDiv>
      </CSSTransition>
    </UserTopBarDiv>
  )
}

export default withRouter(withTheme(UserSection))
