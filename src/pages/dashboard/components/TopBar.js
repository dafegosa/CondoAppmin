import React from 'react'
import styled from 'styled-components'
import UserSection from './UserSection'
import { useSelector, useDispatch } from 'react-redux'

export const TopBarDiv = styled.header`
  background-color: ${(props) => props.theme.mainColor};
  grid-area: 1 / 3 / 2 / 13;
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  right: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-area: 1 / 2 / 2 / 13;
  }

  @media (max-width: 500px) {
    grid-area: 1 / 1 / 2 / 9;
  }
`

export const CondoName = styled.h3`
  padding: 10px;
`

const TopBar = (props) => {
  const { currentCondoId, currentCondoName } = useSelector(
    ({ condoReducer: { currentCondoId, currentCondoName } }) => {
      return { currentCondoId, currentCondoName }
    }
  )
  return (
    <TopBarDiv data-testid='top-bar'>
      <CondoName>{currentCondoName}</CondoName>
      <UserSection name={props.name} />
    </TopBarDiv>
  )
}

export default TopBar
