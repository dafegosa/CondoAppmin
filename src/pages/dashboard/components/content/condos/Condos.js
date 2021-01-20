import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ContentPostCondo from './ContentPostCondo'
import ContentGetCondos from './ContentGetCondos'

export const CondosOuterDiv = styled.div`
  width: 100%;
  height: 100%;
`

export const ContentTopBar = styled.div`
  border-bottom: 3px solid rgba(96, 125, 139, 1);
  background-color: rgba(255, 255, 255, 0.1);
  height: 3.5rem;
  width: 100%;
  display: flex;
  position: sticky;
  border-radius: 0.8rem;
`

export const ContentTopBarTab = styled.button`
  padding: 0.2rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: 0.6rem;
  transition: all 0.1s linear;
  background-color: #181838;

  &:hover {
    background-color: #7870a0;
  }
  &:active {
    background-color: rgba(96, 125, 139, 0.7);
    color: white;
  }
`

function Condos() {
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const history = useHistory()

  const pickTab = (e) => {
    e.preventDefault()
    const { outerText } = e.target

    let selectedButtons = document.querySelectorAll('.active')
    selectedButtons.forEach((button) => button.classList.remove('active'))

    e.target.classList.add('active')

    switch (outerText) {
      case 'Agregar Condominio':
        history.push('/dashboard/condo/add')
        return
      case 'Ver Condominios':
        history.push('/dashboard/condo/list')
        return
      default:
        history.push('/dashboard/condo')
        break
    }
  }
  const renderTab = () => {
    const urlItems = history.location.pathname.split('/')

    switch (urlItems[3]) {
      case 'add':
        return <ContentPostCondo />
      case 'list':
        return <ContentGetCondos />
      default:
        return <p>You're on condos page</p>
    }
  }

  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <CondosOuterDiv data-testid='condos'>
      <ContentTopBar>
        <ContentTopBarTab onClick={pickTab}>
          Agregar Condominio
        </ContentTopBarTab>
        <ContentTopBarTab onClick={pickTab}>Ver Condominios</ContentTopBarTab>
      </ContentTopBar>
      {renderTab()}
    </CondosOuterDiv>
  )
}

export default Condos
