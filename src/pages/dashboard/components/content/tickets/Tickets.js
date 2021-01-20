import {
  CondosOuterDiv as TicketsOuterDiv,
  ContentTopBar,
} from '../condos/Condos'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import ContentGetTickets from './ContentGetTickets'
import ContentViewTicket from './ContentViewTicket'
import ContentPostTicket from './ContentPostTicket'

const ContentTopBarTab = styled.button`
  padding: 0.2rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: 0.6rem;
  transition: all 0.1s linear;
  background-color: #181838;

  &.active-ticket-tab {
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

const Tickets = () => {
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })

  const history = useHistory()
  const {
    location: { pathname },
  } = history
  const urlItems = pathname.substr(1).split('/')

  const renderTab = () => {
    switch (urlItems[2]) {
      case 'add':
        return <ContentPostTicket />
      case 'list':
        return <ContentGetTickets />
      case 'view':
        return <ContentViewTicket />
      case 'edit':
        return
      default:
        break
    }
  }

  const pickTab = (e) => {
    e.preventDefault()
    const { outerText } = e.target

    let selectedButtons = document.querySelectorAll('.active-ticket-tab')
    selectedButtons.forEach((button) =>
      button.classList.remove('active-ticket-tab')
    )

    e.target.classList.add('active-ticket-tab')

    switch (outerText) {
      case 'Ver Tickets':
        history.push('/dashboard/ticket/list')
        return
      case 'Tickets Enviados':
        history.push('/dashboard/ticket/list')
        return
      case 'Nuevo Ticket':
        history.push('/dashboard/ticket/add')
        return
      default:
        history.push('/dashboard/ticket')
        break
    }
  }

  const seeTabClassAssign = () => {
    let selectedButtons = document.querySelectorAll('.active-ticket-tab')

    if (urlItems[2] === 'view') {
      selectedButtons.forEach((button) =>
        button.classList.remove('active-ticket-tab')
      )
      return 'unhidden'
    } else {
      return 'hidden'
    }
  }

  return (
    <TicketsOuterDiv>
      <ContentTopBar>
        <ContentTopBarTab onClick={pickTab}>
          {admin ? 'Ver Tickets' : 'Tickets Enviados'}
        </ContentTopBarTab>
        {!admin && (
          <ContentTopBarTab onClick={pickTab}>Nuevo Ticket</ContentTopBarTab>
        )}
        <ContentTopBarTab
          className={seeTabClassAssign()}
          onClick={pickTab}
        >{`Ver ticket`}</ContentTopBarTab>
      </ContentTopBar>
      {renderTab()}
    </TicketsOuterDiv>
  )
}

export default Tickets
