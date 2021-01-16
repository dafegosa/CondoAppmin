import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPayments, PAYMENTS_CLEAN } from '../../../../../store/paymentReducer'
import styled from 'styled-components'
import { ResidentPaymentsList, 
  ResidentInfoOuterDiv, 
  ResidentInfoTitle, 
  PaymentsTable, 
  PaymentsThead,
  PaymentsTbody, 
  PaymentsTr, 
  PaymentsTd, 
  PaymentsTh, 
  Theading } from '../residents/ContentViewResident'

export const GetPaymentsDiv = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  & input,
  & select {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
  }
`

const ContentGetPayments = () => {

  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const { currentCondoId } = useSelector(({ condoReducer: { currentCondoId } }) => {
    return { currentCondoId }
  })
  const { payments } = useSelector(({ paymentReducer: { payments } }) => {
    return { payments }
  })

  const dispatch = useDispatch()

  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch({ type: PAYMENTS_CLEAN })
    if (admin) dispatch(getPayments('condo', currentCondoId, token))
    if (!admin) dispatch(getPayments('resident', currentCondoId, token, 'resident'))
    
  }, [currentCondoId])

  const seePayment = (paymentid) => {
    history.push(`/dashboard/payment/view/${paymentid}`)
  }

  return (
    <GetPaymentsDiv>
      <ResidentPaymentsList>
        {!!payments && payments.length > 0 ? 
        (<ResidentInfoOuterDiv className="list">
          <ResidentInfoTitle className="payments">Pagos</ResidentInfoTitle>
          <PaymentsTable>
            <PaymentsThead>
              <PaymentsTr>
                <PaymentsTh><Theading>Servicio</Theading></PaymentsTh>
                <PaymentsTh><Theading>Valor</Theading></PaymentsTh>
                <PaymentsTh><Theading>Plazo de Pago</Theading></PaymentsTh>
                <PaymentsTh><Theading>Estado</Theading></PaymentsTh>
              </PaymentsTr>
            </PaymentsThead>
            <PaymentsTbody>
              {payments.map(payment => {
                return (
                  <PaymentsTr 
                    className={!payment.isPayed && Date.parse(payment.dueDate) < Date.now() ? 'overdue' : ''}
                    onClick={seePayment.bind(this, payment._id)}
                  >
                    <PaymentsTd>{payment.service}</PaymentsTd>
                    <PaymentsTd>{`$${payment.value}`}</PaymentsTd>
                    <PaymentsTd>{payment.dueDate.split('T')[0]}</PaymentsTd>
                    <PaymentsTd>{!payment.isPayed && Date.parse(payment.dueDate) < Date.now() ? 'Vencido' : 'Vigente'}</PaymentsTd>
                  </PaymentsTr>
                )
              })}
            </PaymentsTbody>
          </PaymentsTable>
        </ResidentInfoOuterDiv>
        ) : <p>No hay pagos aun</p>}
      </ResidentPaymentsList>
    </GetPaymentsDiv>
  )
}

export default ContentGetPayments