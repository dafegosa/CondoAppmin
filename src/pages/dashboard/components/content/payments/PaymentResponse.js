import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { updatePayment } from '../../../../../store/paymentReducer'
import styled from 'styled-components'
import { GetPaymentsDiv as PaymentResponseDiv } from './ContentGetPayments'

const ReturnButton = styled.button`
  display: inline;
  &:hover {
    cursor: pointer;
  }
`
const InnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 80%;
`
const Message = styled.p`
  font-size: 18px;
`

const PaymentResponse = () => {
  
  const [response, setResponse] = useState('')
  const history = useHistory()
  const { location: { pathname, search } } = history

  const dispatch = useDispatch()

  function queryString(query) {
    const res = {}
    query
      .replace('?', '')
      .split('&')
      .forEach(q => {
        const [key, value] = q.split('=')
        res[key] = value
      })
    return res
  }

  useEffect(async () => {
    async function getPaymentInfo () {
      const { ref_payco } = queryString(search)
      const { data } = await axios({
        method: 'GET',
        baseURL: 'https://api.secure.payco.co',
        url: `/validation/v1/reference/${ref_payco}`
      })
      
      setResponse(data.data.x_transaction_state)
  
      if (data.data.x_cod_transaction_state === 1) {
        const token = localStorage.getItem('token')
        dispatch(updatePayment(data.data.x_extra1, token))
      }
    }
    getPaymentInfo()
  }, [search])
  
  return (
    <PaymentResponseDiv>
      <InnerDiv>
        <Message>{`La transacción fue: ${response}`}</Message>
        <ReturnButton 
          type="button"
          onClick={() => history.push('/dashboard/payment/list')}>Volver</ReturnButton>
      </InnerDiv>
    </PaymentResponseDiv>
  )
}

export default PaymentResponse