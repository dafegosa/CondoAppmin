import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPayments,
  PAYMENTS_CLEAN,
  SET_CURRENT_PAYMENT,
  SET_CURRENT_PAYMENT_ID,
} from '../../../../../store/paymentReducer'
import styled from 'styled-components'
import {
  ResidentPaymentsList,
  ResidentInfoOuterDiv,
  ResidentInfoTitle,
  PaymentsTable,
  PaymentsThead,
  PaymentsTbody,
  PaymentsTr,
  PaymentsTd,
  PaymentsTh,
  Theading,
} from '../residents/ContentViewResident'
import { getResident } from '../../../../../store/sessionReducer'

export const GetPaymentsDiv = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  & input,
  & select {
    width: 90%;
    margin-bottom: 10px;
  }
`

export const definePaymentState = (isPayed, dueDate) => {
  if (isPayed) return 'Pagado'
  if (Date.parse(dueDate) > Date.now()) {
    return 'Vigente'
  } else {
    return 'Vencido'
  }
}

const ContentGetPayments = () => {
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const { currentCondoId } = useSelector(
    ({ condoReducer: { currentCondoId } }) => {
      return { currentCondoId }
    }
  )
  const { payments } = useSelector(({ paymentReducer: { payments } }) => {
    return { payments }
  })

  const dispatch = useDispatch()

  const history = useHistory()

  useEffect(async () => {
    const token = localStorage.getItem('token')

    dispatch({ type: PAYMENTS_CLEAN })
    try {
      if (admin) dispatch(getPayments('condo', currentCondoId, token))

      if (!admin) {
        const { data } = await getResident(token)
        dispatch(getPayments('resident', data.id, token, 'resident'))
      }
    } catch (err) {}
  }, [currentCondoId])

  const seePayment = (paymentid) => {
    dispatch({ type: SET_CURRENT_PAYMENT_ID, payload: paymentid })
    history.push(`/dashboard/payment/view/${paymentid}`)
  }

  return (
    <GetPaymentsDiv>
      <ResidentPaymentsList>
        {!!payments && payments.length > 0 ? (
          <ResidentInfoOuterDiv className='list'>
            <ResidentInfoTitle className='payments' style={{ margin: '2rem ' }}>
              Pagos
            </ResidentInfoTitle>
            <PaymentsTable>
              <PaymentsThead>
                <PaymentsTr>
                  {!!admin && (
                    <PaymentsTh>
                      <Theading>Unidad</Theading>
                    </PaymentsTh>
                  )}
                  {!!admin && (
                    <PaymentsTh>
                      <Theading>Residente</Theading>
                    </PaymentsTh>
                  )}
                  <PaymentsTh>
                    <Theading>Servicio</Theading>
                  </PaymentsTh>
                  <PaymentsTh>
                    <Theading>Valor</Theading>
                  </PaymentsTh>
                  <PaymentsTh>
                    <Theading>Plazo de Pago</Theading>
                  </PaymentsTh>
                  <PaymentsTh>
                    <Theading>Estado</Theading>
                  </PaymentsTh>
                </PaymentsTr>
              </PaymentsThead>
              <PaymentsTbody>
                {payments.map((payment) => {
                  return (
                    <PaymentsTr
                      className={
                        !payment.isPayed &&
                        Date.parse(payment.dueDate) < Date.now()
                          ? 'overdue'
                          : ''
                      }
                      onClick={seePayment.bind(this, payment._id)}
                    >
                      {!!admin && <PaymentsTd>{payment.unit.name}</PaymentsTd>}
                      {!!admin && (
                        <PaymentsTd>{`${payment.resident.name} ${payment.resident.lastName}`}</PaymentsTd>
                      )}
                      <PaymentsTd>{payment.service}</PaymentsTd>
                      <PaymentsTd>{`$${payment.value}`}</PaymentsTd>
                      <PaymentsTd>{payment.dueDate.split('T')[0]}</PaymentsTd>
                      <PaymentsTd>
                        {definePaymentState(payment.isPayed, payment.dueDate)}
                      </PaymentsTd>
                    </PaymentsTr>
                  )
                })}
              </PaymentsTbody>
            </PaymentsTable>
          </ResidentInfoOuterDiv>
        ) : (
          <p>No hay pagos aun</p>
        )}
      </ResidentPaymentsList>
    </GetPaymentsDiv>
  )
}

export default ContentGetPayments
