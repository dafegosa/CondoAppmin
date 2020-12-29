import React from 'react'
import { useDispatch } from  'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Condos from './condos/Condos'
import Units from './units/Units'
import Residents from './residents/Residents'
import ContentMessages from './AllMessages/CentralMessagesList'
import ContentMessagesForm from './AllMessages/MessageForm'
import ShowMessage from './AllMessages/ShowMessage'
import { SET_CURRENT_OPTION } from '../../../../store/sessionReducer'

const ContentDiv = styled.main`
  display: grid;
  background-color: rgb(239, 239, 239);
  grid-area: 2 / 3 / 9 / 11;
  padding: 10px;
  box-sizing: border-box;
  display: flex;

  @media (max-width: 768px) {
    grid-area: 2 / 2 / 9 / 13;
  }
  @media (max-width: 500px) {
    grid-area: 2 / 1 / 13 / 9;
  }
`

function Content() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { location: { pathname } } = history

  const renderContent = () => {
    const urlItems = pathname.substr(1).split('/')
    console.log('pathname', urlItems)
    dispatch({ type: SET_CURRENT_OPTION, payload: `${urlItems[1]}` })
    switch (urlItems[1]) {
      case 'condo':
        return <Condos />
      case 'unit':
        return <Units />
      case 'resident':
        return <Residents />
      case 'tickets':
        return <ContentMessages />
      case 'messagesform':
        return <ContentMessagesForm />
      case 'ticket':
        return <ShowMessage />
      default:
        return <h1>Bienvenido al Dashboard</h1>
    }
  }

  return <ContentDiv>{renderContent()}</ContentDiv>
}

export default Content
