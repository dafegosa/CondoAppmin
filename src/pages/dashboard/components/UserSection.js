import React from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { withTheme } from 'styled-components'
import { IconButton } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { CSSTransition } from 'react-transition-group'

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

const UserOptionsDiv = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0%;
  background-color: ${(props) => props.theme.thirdColor};

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

const UserOptionsListItem = styled.li`
  font-weight: 300;
  font-size: 14px;
  padding: 10px 0;
  text-align: center;

  &:hover {
    cursor: pointer;
    font-weight: 400;
  }
`

class UserSection extends React.Component {
  state = {
    renderOptions: false,
  }

  userSectionOptionsClick = (e) => {
    const { renderOptions } = this.state

    this.setState({
      renderOptions: !renderOptions,
    })
  }

  signout = (e) => {
    localStorage.removeItem('token')
    this.props.history.push('/')
  }

  render() {
    return (
      <UserTopBarDiv>
        <WelcomeMsg>¡Hola, {this.props.name}!</WelcomeMsg>
        <AccountCircleIcon />
        <IconButton style={{ padding: '0px' }}>
          <ArrowDropDownIcon
            className='arrow-drop-down-icon'
            style={{ color: 'white', fontSize: '28px' }}
            onClick={this.userSectionOptionsClick}
          />
        </IconButton>
        <CSSTransition
          in={this.state.renderOptions}
          timeout={500}
          classNames="transition"
          unmountOnExit
          appear
        >
          <UserOptionsDiv>
            <ul>
              <UserOptionsListItem>Profile</UserOptionsListItem>
              <UserOptionsListItem onClick={this.signout} >Logout</UserOptionsListItem>
            </ul>
          </UserOptionsDiv>
        </CSSTransition>
      </UserTopBarDiv>
    )
  }
}

export default withRouter(withTheme(UserSection))
