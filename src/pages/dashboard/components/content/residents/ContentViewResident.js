import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import { retrieveSingleResident } from "../../../../../store/residentReducer"
import { AddResidentDiv as ViewResidentDiv, SectionTitle } from "./ContentPostResident"

const ResidentInfoOuterDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`
const ResidentInfoInnerDiv = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ResidentInfoTitle = styled.h2`
  font-weight: 400;
  font-size: 20px;
`
const ResidentInfoValue = styled.p`
  font-weight: 300;
  font-size: 16px;
`

const ContentViewResident = () => {
  const { currentResidentId, currentResidentName, currentResident } = useSelector(({ residentReducer: { currentResidentId, currentResidentName, currentResident } }) => {
    return { currentResidentId, currentResidentName, currentResident }
  })
  const  [resident, setResident] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveSingleResident(currentResidentId))
  }, [])

  return (
    <ViewResidentDiv>
      <SectionTitle>Información del Residente</SectionTitle>
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
      
    </ViewResidentDiv>
  )
}

export default ContentViewResident