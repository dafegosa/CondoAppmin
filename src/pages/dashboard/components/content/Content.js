import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import ContentAddResident from './add-residents/ContentAddResident'
import ContentAddUnits from './add-units/ContentAddUnit'
import ContentAddCondos from './add-condo/ContentAddCondo'
import ContentMessages from './allMessages/CentralMessagesList'
import ContentMessagesForm from './allMessages/MessageForm'
import ShowMessage from './allMessages/ShowMessage'

const ContentDiv = styled.div`
  display: grid;
  background-color: rgba(0, 0, 0, 0.05);
  grid-area: 2 / 3 / 9 / 11;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
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
        return <ContentAddCondos />
      case 'unit':
        return <ContentAddUnits />
      case 'resident':
        return <ContentAddResident />
      case 'messages':
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
