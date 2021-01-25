import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import ContentPostPayment from './ContentPostPayment'
import ContentPaymentsSettings from './ContentPaymentsSettings'
import ContentGetPayments from './ContentGetPayments'
import ContentViewPayment from './ContentViewPayment'

export const PaymentsOuterDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`

export const ContentTopBar = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  height: auto;
  width: 100%;
  display: flex;
  position: sticky;
  border-radius: 0.8rem;
`

export const ContentTopBarTab = styled.button`
  padding: 0.7rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  margin-right: 1rem;
  cursor: pointer;
  border-radius: 0.6rem;
  transition: all 0.1s linear;
  background-color: #181838;

  &.active-tab {
    background-color: #9898b8;
    color: white;
  }
  &.hidden {
    display: none;
  }
  &.unhidden {
    display: block;
    background-color: #505098;
    color: white;
  }
`

function Payments() {
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
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
      case 'Configuraciones':
        history.push('/dashboard/payment/settings')
        return
      case 'Generar Pagos':
        history.push('/dashboard/payment/add')
        return
      case 'Todos los pagos':
        history.push('/dashboard/payment/list')
        return
      case 'Mis pagos':
        history.push('/dashboard/payment/list')
        return
      default:
        history.push('/dashboard/payment')
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

  const renderTab = () => {
    const urlItems = history.location.pathname.split('/')

    switch (urlItems[3]) {
      case 'add':
        return <ContentPostPayment />
      case 'settings':
        return <ContentPaymentsSettings />
      case 'list':
        return <ContentGetPayments />
      case 'view':
        return <ContentViewPayment />
      default:
        return <p>You're on payments page</p>
    }
  }

  return (
    <PaymentsOuterDiv data-testid='payments'>
      <ContentTopBar>
        {!!admin && (
          <ContentTopBarTab onClick={pickTab}>Configuraciones</ContentTopBarTab>
        )}
        {!!admin && (
          <ContentTopBarTab onClick={pickTab}>Generar Pagos</ContentTopBarTab>
        )}
        <ContentTopBarTab onClick={pickTab}>
          {admin ? 'Todos los pagos' : 'Mis pagos'}
        </ContentTopBarTab>
        <ContentTopBarTab className={seeTabClassAssign()} onClick={pickTab}>
          Ver Pago
        </ContentTopBarTab>
      </ContentTopBar>
      {renderTab()}
    </PaymentsOuterDiv>
  )
}

export default Payments
