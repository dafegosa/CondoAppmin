import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import { getPayments } from "../../../../../store/paymentReducer"
import { retrieveSingleResident } from "../../../../../store/residentReducer"
import { AddResidentDiv as ViewResidentDiv, SectionTitle } from "./ContentPostResident"

export const ResidentInfoDiv = styled.div`
  display: flex;
  border-bottom: 3px solid rgba(96, 125, 139, 1);
  width: 100%;
  &.button {
    border-bottom: 0px;
  }
`
export const ResidentPaymentsList = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px 0;
  overflow-y: scroll;
`
export const ResidentInfoOuterDiv = styled.div`
  margin: 0 auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  &.list {
    width: 100%;
  }
`
export const ResidentInfoInnerDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const ResidentInfoTitle = styled.h2`
  font-weight: 400;
  font-size: 20px;
  &.payments {
    text-align: center;
  }
`
export const ResidentInfoValue = styled.p`
  font-weight: 300;
  font-size: 16px;
`

export const PaymentsTable = styled.table`
  width: 100%;
  margin: 0 auto;
  border: 1px solid red;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
`

export const PaymentsThead = styled.thead`
  background-color: rgba(96,125,139,0.7);
`
export const PaymentsTbody = styled.tbody`
  background-color: white;
`

export const PaymentsTr = styled.tr`
  color: black;
  transition: 400ms;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &.overdue {
    background-color: red;
  }
`

export const PaymentsTh = styled.th`
  color: white;
  padding: 15px 10px;
  text-align: left;
`
export const Theading = styled.h3`
  font-weight: 500;
  font-size: 18px;
  padding: 0;
  margin: 0;
`
export const PaymentsTd = styled.td`
  padding: 10px;
  text-align: left;
`

const ContentViewResident = () => {
  const { currentResidentId, currentResidentName, currentResident } = useSelector(({ residentReducer: { currentResidentId, currentResidentName, currentResident } }) => {
    return { currentResidentId, currentResidentName, currentResident }
  })
  const { payments } = useSelector(({ paymentReducer: { payments } }) => {
    return { payments }
  })
  const  [resident, setResident] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(retrieveSingleResident(currentResidentId))
    dispatch(getPayments('resident', currentResidentId, token, 'admin'))
  }, [])

  return (
    <ViewResidentDiv>
      <SectionTitle>Información del Residente</SectionTitle>
      <ResidentInfoDiv>
        {currentResident ? 
        <ResidentInfoOuterDiv>
          <ResidentInfoInnerDiv>
            <ResidentInfoTitle>Nombre</ResidentInfoTitle>
            <ResidentInfoValue>{`${currentResident.name} ${currentResident.lastName}`}</ResidentInfoValue>
          </ResidentInfoInnerDiv>
          <ResidentInfoInnerDiv>
            <ResidentInfoTitle>Cédula</ResidentInfoTitle>
            <ResidentInfoValue>{`${currentResident.idNumber}`}</ResidentInfoValue>
          </ResidentInfoInnerDiv>
          <ResidentInfoInnerDiv>
            <ResidentInfoTitle>Teléfono</ResidentInfoTitle>
            <ResidentInfoValue>{`${currentResident.phone}`}</ResidentInfoValue>
          </ResidentInfoInnerDiv>
          <ResidentInfoInnerDiv>
            <ResidentInfoTitle>Email</ResidentInfoTitle>
            <ResidentInfoValue>{`${currentResident.email}`}</ResidentInfoValue>
          </ResidentInfoInnerDiv>
          <ResidentInfoInnerDiv>
            <ResidentInfoTitle>Unidad</ResidentInfoTitle>
            {currentResident.unitId ? 
            <ResidentInfoValue>{`${currentResident.unitId.name}`}</ResidentInfoValue> : 
            <ResidentInfoValue>No asignado</ResidentInfoValue> }
          </ResidentInfoInnerDiv>
        </ResidentInfoOuterDiv> : <p>No hay informacion de este residente</p>}
      </ResidentInfoDiv>
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
        ) : <p>El residente no tiene pagos aun</p>}
      </ResidentPaymentsList>
    </ViewResidentDiv>
  )
}

export default ContentViewResident