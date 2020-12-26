import { CondosOuterDiv as ResidentsOuterDiv, ContentTopBar } from '../condos/Condos'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import ContentPostResident from './ContentPostResident'
import ContentGetResidents from './ContentGetResidents'
import ContentViewResident from './ContentViewResident'
import { Redirect } from 'react-router-dom'
import { useState } from 'react'

const ContentTopBarTab = styled.button`
  padding: 5px;
  border: 1px solid rgba(96, 125, 139, 0.7);
  color: rgba(96, 125, 139, 0.7);
  margin-right: 3px;
  cursor: pointer;
  transition: 400ms;

  &.active {
    background-color: rgba(96, 125, 139, 0.7);
    color: white;
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

function Residents () {
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const { currentResidentName } = useSelector(({ residentReducer: { currentResidentName } }) => {
    return { currentResidentName }
  })

  let history = useHistory()
  const { location: { pathname } } = history  

  const pickTab = (e) => {
    e.preventDefault()
    const { outerText } = e.target

    let selectedButtons = document.querySelectorAll('.active')
    selectedButtons.forEach(button => button.classList.remove('active'))

    e.target.classList.add('active')

    switch (outerText) {
      case 'Agregar Residente':
        history.push('/dashboard/resident/add')
        return 
      case 'Ver Residentes':
        history.push('/dashboard/resident/list')
        return
      default:
        history.push('/dashboard/resident')
        break;
    }
  }
  const renderTab = () => {
    const urlItems = pathname.substr(1).split('/')

    switch (urlItems[2]) {
      case 'add':
        return <ContentPostResident />
      case 'list':
        return <ContentGetResidents />
      case 'view':
        return <ContentViewResident />
      default:
        break;
    }
  }

  const tabClassAssign = () => {
    const urlItems = pathname.substr(1).split('/')

    let selectedButtons = document.querySelectorAll('.active')

    if (urlItems[2] === 'view') {
      selectedButtons.forEach(button => button.classList.remove('active'))
      return 'unhidden'
    } else {
      return 'hidden'
    }
  }

  return (
    !admin ? <Redirect to='/dashboard' /> : (
    <ResidentsOuterDiv>
      <ContentTopBar>
        <ContentTopBarTab onClick={pickTab}>Agregar Residente</ContentTopBarTab>
        <ContentTopBarTab onClick={pickTab}>Ver Residentes</ContentTopBarTab>
        <ContentTopBarTab className={tabClassAssign()}>{`Ver ${currentResidentName}`}</ContentTopBarTab>
      </ContentTopBar>
      {renderTab()}
    </ResidentsOuterDiv>
    )
  )
}

export default Residents