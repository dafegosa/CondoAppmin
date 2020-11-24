import React from 'react'
import styled from 'styled-components'
import UserSection from './UserSection'


export const TopBarDiv = styled.div`
  background-color: ${props => props.theme.mainColor};
  grid-area: 1 / 3 / 2 / 13;
  display: flex;
  justify-content: flex-end;
  right: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-area: 1 / 2 / 2 / 13;
  }
  
  @media (max-width: 500px) {
    grid-area: 1 / 1 / 2 / 9;
  }
`


class TopBar extends React.Component {

  render () {
    const { history } = this.props
    return (
     <TopBarDiv>
       <UserSection name={this.props.name} history={history}/>
     </TopBarDiv>
    )
  }
}

export default TopBar
