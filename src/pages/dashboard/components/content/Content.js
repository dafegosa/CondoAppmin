import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import ContentAddResident from './add-residents/ContentAddResident'
import ContentAddUnits from './add-units/ContentAddUnit'
import Condos from './condos/Condos'
import ContentMessages from './allMessages/CentralMessagesList'
import ContentMessagesForm from './allMessages/MessageForm'
import ShowMessage from './allMessages/ShowMessage'

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
  const history = useHistory()

  const renderContent = () => {
    const urlItems = history.location.pathname.split('/')
    switch (urlItems[2]) {
      case 'condo':
        return <Condos />
      case 'addunit':
        return <ContentAddUnits />
      case 'resident':
        return <ContentAddResident />
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
