import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getCondos } from '../../../../../store/condoReducer'

export const ListCondosDiv = styled.div`
  padding: 0 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: scroll;

  & input, & select {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
  }
`

const GetCondosTitle = styled.h1`
  margin: 20px 0 40px 0;
  font-weight: 500;
  font-size: 28px;
  color: rgba(96, 125, 139, 0.9);
`
const CondoListSection = styled.div`
  width: 100%;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

const SingleCondoOuterDiv = styled.div`
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

function ContentPostCondo () {

  const { condos } = useSelector(
    ({ condoReducer: { condos } }) => {
    return { condos }
    }) 
  const { admin, resident } = useSelector(({ sessionReducer: { admin, resident } }) => {
    return { admin, resident }
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCondos())
  }, [])
  
  return (
    !admin ? <Redirect to="/dashboard" /> :
    (<ListCondosDiv>
      <GetCondosTitle>Listado de Condominios</GetCondosTitle>
      <CondoListSection>
        {!!condos && condos.length > 0 ? 
          condos.map(condo => {
            return (
              <SingleCondoOuterDiv key={condo._id}>
                <SingleCondoInnerDiv>
                  <CondoName>{condo.name}</CondoName>
                  <CondoAddress>{condo.address}</CondoAddress>
                </SingleCondoInnerDiv>
                <SingleCondoInnerDiv>
                  <CondoUnitsTitle>Total de unidades</CondoUnitsTitle>
                  <p>40</p>
                </SingleCondoInnerDiv>
                <SingleCondoInnerDiv>
                  <CondoUnitsTitle>Ocupación</CondoUnitsTitle>
                  <p>28%</p>
                </SingleCondoInnerDiv>
              </SingleCondoOuterDiv>
            )
          }) : <p>No tienes condominios por el momento</p>}
      </CondoListSection>
    </ListCondosDiv>)
  )
}


export default ContentPostCondo