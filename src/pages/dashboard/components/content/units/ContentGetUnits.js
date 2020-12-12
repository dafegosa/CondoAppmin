import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getCondos } from '../../../../../store/condoReducer'
import { retrieveUnits } from '../../../../../store/unitReducer'
import { ListCondosDiv as ListUnitsDiv, GetCondosTitle as GetUnitsTitle } from '../condos/ContentGetCondos'

const UnitListSection = styled.div`
  width: 100%;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

const SingleUnitOuterDiv = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  width: 95%;
  color: white;
  border: 1px solid rgba(96, 125, 139, 0.7);
  background-color: rgba(96, 125, 139, 0.6);
  overflow: scroll;
  
  &:last-child {
    margin-bottom: 0;
  } 
`
const SingleCondoInnerDiv = styled.div`
  padding: 5px;
  border-left: 1px solid white;
  width: 30%;
  &:first-child {
    border-left: 0px;
  } 
  &:last-child {
    border-left: 1px solid white;
  } 
`

const CondoName = styled.h2`
  margin: 0 0 10px 0;
  font-weight: 400;
  font-size: 22px;
`
const CondoUnitsTitle = styled.h3`
  margin: 0 0 10px 0;
  font-weight: 400;
  font-size: 18px;
`
const CondoAddress = styled.p`
  margin: 0;
  padding-left: 2px;
  font-weight: 300;
  font-size: 16px;
`

function ContentPostUnit () {

  const { units } = useSelector(
    ({ unitReducer: { units } }) => {
    return { units }
    }) 
  const { currentCondo } = useSelector(
    ({ condoReducer: { currentCondo } }) => {
    return { currentCondo }
    }) 
  const { admin, resident } = useSelector(({ sessionReducer: { admin, resident } }) => {
    return { admin, resident }
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveUnits(currentCondo))
  }, [currentCondo])
  
  return (
    !admin ? <Redirect to="/dashboard" /> :
    (<ListUnitsDiv>
      <GetUnitsTitle>{`Listado de Unidades de ${currentCondo}`}</GetUnitsTitle>
      <UnitListSection>
        {!!units && units.length > 0 ? 
          units.map(unit => {
            return (
              <SingleUnitOuterDiv key={unit._id}>
                <SingleCondoInnerDiv>
                  <CondoName>{unit.name}</CondoName>
                  <CondoAddress>{unit.address}</CondoAddress>
                </SingleCondoInnerDiv>
                <SingleCondoInnerDiv>
                  <CondoUnitsTitle>Residente Principal</CondoUnitsTitle>
                  <p>Emilio Suarez</p>
                </SingleCondoInnerDiv>
                <SingleCondoInnerDiv>
                  <CondoUnitsTitle>Ocupado?</CondoUnitsTitle>
                  <p>Si</p>
                </SingleCondoInnerDiv>
              </SingleUnitOuterDiv>
            )
          }) : <p>No tienes unidades por el momento</p>}
      </UnitListSection>
    </ListUnitsDiv>)
  )
}


export default ContentPostUnit