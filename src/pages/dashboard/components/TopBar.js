import React from 'react'
import styled from 'styled-components'
import UserSection from './UserSection'


export const TopBarDiv = styled.div`
  background-color: ${props => props.theme.mainColor}
  display: flex
  justify-content: flex-end
  position: absolute
  right: 0
  box-sizing: border-box
  overflow: hidden
  width: 85vw
  height: 10vh
`


class TopBar extends React.Component {

  render () {
    return (
     <TopBarDiv>
       <UserSection name={this.props.name}/>
     </TopBarDiv>
    )
  }
}

export default TopBar
