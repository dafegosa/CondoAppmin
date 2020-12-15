import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Dialog, DialogActions } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { retrieveResidents /* UNIT_ERROR_CLEAN, UNIT_MESSAGE_CLEAN */ } from '../../../../../store/residentReducer'
import { globalRemoveDocument, globalHandleChange, globalUpdateDocument } from '../../../../../store/sessionReducer'
import { ListCondosDiv as ListResidentsDiv, GetCondosTitle as GetResidentsTitle } from '../condos/ContentGetCondos'

const ResidentListSection = styled.div`
  width: 80%;
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  align-content: flex-end;
  
`

const SingleResidentOuterDiv = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  width: 45%;
  color: white;
  border: 1px solid rgba(96, 125, 139, 0.7);
  background-color: rgba(96, 125, 139, 0.6);
  overflow: scroll;

`
const SingleResidentInnerDiv = styled.div`
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

const ResidentName = styled.h2`
  margin: 0 0 10px 0;
  font-weight: 400;
  font-size: 22px;
`
const CondoResidentsTitle = styled.h3`
  margin: 0 0 10px 0;
  font-weight: 400;
  font-size: 18px;
`

const ResidentNameInput = styled.input`

`

function ContentPostResident () {

  const [showDialog, setShowDialog] = useState(false)
  const [deleteResident, setDeleteResident] = useState(false)
  const [residentToDelete, setResidentToDelete] = useState('')
  const [editResident, setEditResident] = useState(false)
  const [residentToEdit, setResidentToEdit] = useState('')

  const { units } = useSelector(
    ({ unitReducer: { units } }) => {
    return { units }
    }) 
  const { currentCondoId, currentCondoName } = useSelector(
    ({ condoReducer: { currentCondoId, currentCondoName } }) => {
    return { currentCondoId, currentCondoName }
    }) 
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveResidents(currentCondoId))
    dispatch({type: UNIT_ERROR_CLEAN})
    dispatch({type: UNIT_MESSAGE_CLEAN})
  }, [currentCondoId, unitToEdit])

  const onDeleteUnit = (unitId) => {
    setUnitToDelete(unitId)
    setShowDialog(true)
    
  }
  const onEditUnit = (unitId, name) => {
    dispatch({ type: UNIT_MESSAGE_CLEAN })
    if (!unitToEdit) {
      
      dispatch(globalHandleChange({ target: { name: 'unitName', value: name }}, 'UNIT'))
      setUnitToEdit(unitId)

    } else {
      setUnitToEdit('')
    }
  }

  const onDeleteModal = (value) => {
    if (value === 'Si') {
      setDeleteUnit(true)
      
      dispatch(globalRemoveDocument('unit', unitToDelete, units))
      setShowDialog(false)
    } else {
      setUnitToDelete('')
      setShowDialog(false)
    }
  }

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'UNIT'))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedUnit = {
      name: unitName,
    }
    dispatch(globalUpdateDocument('unit', unitToEdit, updatedUnit, units))
  }
  const showUnitInfo = (unitId, name) => {
    
    if (unitId === unitToEdit) {
      return (
        <form onSubmit={handleSubmit}>
          <UnitNameInput 
            id='unitName'
            name='unitName'
            type="text" 
            onChange={handleChange}
            value={unitName}
            required
          />
          <button type="submit">Actualizar</button>
          {message || error}
        </form>
        )
    } else {
      return <UnitName>{name}</UnitName>
    }
  }

  return (
    !admin ? <Redirect to="/dashboard" /> :
    (<ListUnitsDiv>
      <GetUnitsTitle>{`Listado de Unidades de ${currentCondoName}`}</GetUnitsTitle>
      <Dialog
        open={showDialog}
        o>
        ¿Estas seguro que deseas borrar la unidad?
        <DialogActions>
          <button onClick={onDeleteModal.bind(this, 'Si')} color="primary">
            Si
          </button>
          <button onClick={onDeleteModal.bind(this, 'No')} color="primary" autoFocus>
            No
          </button>
        </DialogActions>
      </Dialog>
      <UnitListSection>
        {!!units && units.length > 0 ? 
          units.map(unit => {
            return (
              <SingleUnitOuterDiv key={unit._id}>
                <SingleUnitInnerDiv>
                  {showUnitInfo(unit._id, unit.name)}
                </SingleUnitInnerDiv>
                <SingleUnitInnerDiv>
                  <CondoUnitsTitle>Residente Principal</CondoUnitsTitle>
                  <p>Emilio Suarez</p>
                </SingleUnitInnerDiv>
                <SingleUnitInnerDiv>
                  <CondoUnitsTitle>Ocupado?</CondoUnitsTitle>
                  <p>Si</p>
                </SingleUnitInnerDiv>
                <SingleUnitInnerDiv>
                  <IconButton style={{ padding: '0px' }}>
                    <DeleteIcon
                      style={{ color: 'white', fontSize: '24px' }}
                      onClick={onDeleteUnit.bind(unit, unit._id)}
                    />
                  </IconButton>
                  <IconButton style={{ padding: '0px', display: 'block' }}>
                    <EditIcon
                      style={{ color: 'white', fontSize: '24px' }}
                      onClick={onEditUnit.bind(unit, unit._id, unit.name)}
                    />
                  </IconButton>
                </SingleUnitInnerDiv>
              </SingleUnitOuterDiv>
            )
          }) : <p>No tienes unidades por el momento</p>}
      </UnitListSection>
    </ListUnitsDiv>)
  )
}


export default ContentPostResident