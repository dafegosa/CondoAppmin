import {
  CondosOuterDiv as ResidentsOuterDiv,
  ContentTopBar,
} from '../condos/Condos'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import ContentPostResident from './ContentPostResident'
import ContentGetResidents from './ContentGetResidents'
import ContentViewResident from './ContentViewResident'
import ContentEditResident from './ContentEditResident'
import { Redirect } from 'react-router-dom'
import { useState } from 'react'

const ContentTopBarTab = styled.button`
  padding: 0.2rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: 0.6rem;
  transition: all 0.1s linear;
  background-color: #181838;

  &.active-tab {
    background-color: rgba(96, 125, 139, 0.7);
    color: white;
    display: block;
  }
  &.hidden {
    display: none;
  }
  &.unhidden {
    display: block;
    background-color: rgba(96, 125, 139, 0.7);
    color: white;
  }
`

function Residents() {
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const { currentResidentName } = useSelector(
    ({ residentReducer: { currentResidentName } }) => {
      return { currentResidentName }
    }
  )

  let history = useHistory()
  const {
    location: { pathname },
  } = history

  const urlItems = pathname.substr(1).split('/')

  const pickTab = (e) => {
    e.preventDefault()
    const { outerText } = e.target

    let selectedButtons = document.querySelectorAll('.active-tab')
    selectedButtons.forEach((button) => button.classList.remove('active-tab'))

    e.target.classList.add('active-tab')

    switch (outerText) {
      case 'Agregar Residente':
        history.push('/dashboard/resident/add')
        return
      case 'Ver Residentes':
        history.push('/dashboard/resident/list')
        return
      default:
        history.push('/dashboard/resident')
        break
    }
  }
  const renderTab = () => {
    switch (urlItems[2]) {
      case 'add':
        return <ContentPostResident />
      case 'list':
        return <ContentGetResidents />
      case 'view':
        return <ContentViewResident />
      case 'edit':
        return <ContentEditResident />
      default:
        break
    }
  }

  const seeTabClassAssign = () => {
    let selectedButtons = document.querySelectorAll('.active-tab')

    if (urlItems[2] === 'view') {
      selectedButtons.forEach((button) => button.classList.remove('active-tab'))
      return 'unhidden'
    } else {
      return 'hidden'
    }
  }
  const editTabClassAssign = () => {
    let selectedButtons = document.querySelectorAll('.active-tab')

    if (urlItems[2] === 'edit') {
      selectedButtons.forEach((button) => button.classList.remove('active-tab'))
      return 'unhidden'
    } else {
      return 'hidden'
    }
  }

  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <ResidentsOuterDiv>
      <ContentTopBar>
        <ContentTopBarTab onClick={pickTab}>Agregar Residente</ContentTopBarTab>
        <ContentTopBarTab onClick={pickTab}>Ver Residentes</ContentTopBarTab>
        <ContentTopBarTab
          className={seeTabClassAssign()}
        >{`Ver ${currentResidentName}`}</ContentTopBarTab>
        <ContentTopBarTab
          className={editTabClassAssign()}
        >{`Editar ${currentResidentName}`}</ContentTopBarTab>
      </ContentTopBar>
      {renderTab()}
    </ResidentsOuterDiv>
  )
}

export default Residents
