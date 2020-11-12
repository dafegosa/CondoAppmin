import React from 'react'
import styled from 'styled-components'


export const UserTopBarDiv = styled.div`
  display: flex;
  color: white;
  align-items: center;
  box-sizing: border-box;
`

export const WelcomeMsg = styled.p`
  color: white;
  font-size: 12px;
`

class UserSection extends React.Component {

  render () {
    return (
      <UserTopBarDiv>
        <WelcomeMsg>¡Bienvenido, {this.props.name}!</WelcomeMsg>
        <img src=""/>
        <i></i>  
      </UserTopBarDiv>
    )
  }
}

export default UserSection
