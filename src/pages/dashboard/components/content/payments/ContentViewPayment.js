import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { retrieveSinglePayment } from '../../../../../store/paymentReducer'
import { AddResidentDiv as ViewPaymentDiv, SectionTitle } from '../residents/ContentPostResident'
import { ResidentInfoDiv as PaymentInfoDiv,
ResidentInfoOuterDiv as PaymentInfoOuterDiv,
ResidentInfoInnerDiv as PaymentInfoInnerDiv,
ResidentInfoTitle as PaymentInfoTitle,
ResidentInfoValue as PaymentInfoValue } from '../residents/ContentViewResident'
import { definePaymentState } from './ContentGetPayments'
import handler from '../../../../../utils/ePayco'
import { getResident } from '../../../../../store/sessionReducer'

const PayButton = styled.button`
  &:hover{
    cursor: pointer;
  }
`

const ContentViewPayment = () => {

  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const { currentPayment, currentPaymentId } = useSelector(({ paymentReducer: { currentPayment, currentPaymentId } }) => {
    return { currentPayment, currentPaymentId }
  })
  const dispatch = useDispatch()

  const history =  useHistory()
  const { location: { pathname } } = history  

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!admin) {
      dispatch(retrieveSinglePayment(currentPaymentId, 'resident', token))
    } else {
      dispatch(retrieveSinglePayment(currentPaymentId, 'admin', token))
    }
  }, [])

  const makePayment = async (value, service, paymentid) => {
    const token = localStorage.getItem('token')
    const { data } = await getResident(token)

    handler.open({
      external: 'false',
      autoclick: false,

      amount: value,
      name: service,
      description: 'Descripcion del servicio',
      currency: 'cop',

      country: 'CO',
      lang: 'en',
      tax: '0',
      tax_base: '0',

      invoice: '12345',
      extra1: paymentid,
      extra2: 'extra2',
      extra3: 'extra3',

      response: `${process.env.REACT_APP_BASE_URL}/dashboard/response`,

      name_billing: `${data.name} ${data.lastName}`,
      type_doc_billing: 'cc',
    })
  }

  return (
    <ViewPaymentDiv>
      <SectionTitle>Ver Información de Pago</SectionTitle>
      {currentPayment ? (
      <PaymentInfoDiv>
        <PaymentInfoOuterDiv>
          <PaymentInfoInnerDiv>
            <PaymentInfoTitle>Unidad</PaymentInfoTitle>
            <PaymentInfoValue>{currentPayment.unit ? currentPayment.unit.name : ''}</PaymentInfoValue>
          </PaymentInfoInnerDiv>
          {!!admin && <PaymentInfoInnerDiv>
            <PaymentInfoTitle>Residente</PaymentInfoTitle>
            <PaymentInfoValue>{currentPayment.resident ? `${currentPayment.resident.name} ${currentPayment.resident.lastName}` : ''}</PaymentInfoValue>
          </PaymentInfoInnerDiv>}
          <PaymentInfoInnerDiv>
            <PaymentInfoTitle>Servicio</PaymentInfoTitle>
            <PaymentInfoValue>{currentPayment.service}</PaymentInfoValue>
          </PaymentInfoInnerDiv>
          <PaymentInfoInnerDiv>
            <PaymentInfoTitle>Valor</PaymentInfoTitle>
            <PaymentInfoValue>{`$${currentPayment.value}`}</PaymentInfoValue>
          </PaymentInfoInnerDiv>
          <PaymentInfoInnerDiv>
            <PaymentInfoTitle>Fecha de Vencimiento</PaymentInfoTitle>
            <PaymentInfoValue>{currentPayment.dueDate}</PaymentInfoValue>
          </PaymentInfoInnerDiv>
          <PaymentInfoInnerDiv>
            <PaymentInfoTitle>Fecha de Pago</PaymentInfoTitle>
            <PaymentInfoValue>{currentPayment.isPayed ? `${currentPayment.updatedAt}` : 'Sin pagar'}</PaymentInfoValue>
          </PaymentInfoInnerDiv>
          <PaymentInfoInnerDiv>
            <PaymentInfoTitle>Estado</PaymentInfoTitle>
            <PaymentInfoValue>{definePaymentState(currentPayment.isPayed, currentPayment.dueDate)}</PaymentInfoValue>
          </PaymentInfoInnerDiv>
        </PaymentInfoOuterDiv>
      </PaymentInfoDiv>
      ) : <p>loading</p>}
      {!admin && !currentPayment.isPayed && 
      <PaymentInfoDiv className="button">
        <PayButton 
          type="button" 
          onClick={makePayment.bind(this, currentPayment.value, currentPayment.service, currentPayment._id)}
        >Pagar</PayButton>
      </PaymentInfoDiv> }
    </ViewPaymentDiv>
  )
}

export default ContentViewPayment