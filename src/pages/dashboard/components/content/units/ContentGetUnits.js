import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Dialog, DialogActions } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
  retrieveUnits,
  UNIT_ERROR_CLEAN,
  UNIT_MESSAGE_CLEAN,
} from '../../../../../store/unitReducer'
import {
  globalRemoveDocument,
  globalHandleChange,
  globalUpdateDocument,
} from '../../../../../store/sessionReducer'
import {
  ListCondosDiv as ListUnitsDiv,
  GetCondosTitle as GetUnitsTitle,
} from '../condos/ContentGetCondos'

const UnitListSection = styled.div`
  width: 80%;
  padding-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-start;
`

const SingleUnitOuterDiv = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  width: 20%;
  margin: 1rem;
  color: white;
  background-color: #182040;
`
const SingleUnitInnerDiv = styled.div`
  display: flex;
  padding: 0.2rem;
  width: 30%;
`

const UnitName = styled.h2`
  font-weight: 800;
  color: #6068a0;
  font-size: 2rem;
`

const UnitNameInput = styled.input``

function ContentGetUnits() {
  const [showDialog, setShowDialog] = useState(false)
  const [deleteUnit, setDeleteUnit] = useState(false)
  const [unitToDelete, setUnitToDelete] = useState('')
  const [editUnit, setEditUnit] = useState(false)
  const [unitToEdit, setUnitToEdit] = useState('')

  const { units, unitName, message, error } = useSelector(
    ({ unitReducer: { units, unitName, message, error } }) => {
      return { units, unitName, message, error }
    }
  )
  const { currentCondoId, currentCondoName } = useSelector(
    ({ condoReducer: { currentCondoId, currentCondoName } }) => {
      return { currentCondoId, currentCondoName }
    }
  )
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveUnits(currentCondoId))
    dispatch({ type: UNIT_ERROR_CLEAN })
    dispatch({ type: UNIT_MESSAGE_CLEAN })
  }, [currentCondoId, unitToEdit, showDialog])

  const onDeleteUnit = (unitId) => {
    setUnitToDelete(unitId)
    setShowDialog(true)
  }
  const onEditUnit = (unitId, name) => {
    dispatch({ type: UNIT_MESSAGE_CLEAN })
    if (!unitToEdit) {
      dispatch(
        globalHandleChange(
          { target: { name: 'unitName', value: name } },
          'UNIT'
        )
      )
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
            type='text'
            onChange={handleChange}
            value={unitName}
            required
          />
          <button type='submit'>Actualizar</button>
          {message || error}
        </form>
      )
    } else {
      return <UnitName>{name}</UnitName>
    }
  }

  if (message) return <p>{message}</p>
  if (error) return <p>{error}</p>
  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <ListUnitsDiv>
      <GetUnitsTitle>{`Listado de Unidades de ${currentCondoName}`}</GetUnitsTitle>
      <Dialog open={showDialog}>
        ¿Estas seguro que deseas borrar la unidad, si borras una unidad con
        residente ?
        <DialogActions>
          <button onClick={onDeleteModal.bind(this, 'Si')} color='primary'>
            Si
          </button>
          <button
            onClick={onDeleteModal.bind(this, 'No')}
            color='primary'
            autoFocus
          >
            No
          </button>
        </DialogActions>
      </Dialog>
      <UnitListSection>
        {units && units.length > 0 ? (
          units.map((unit) => {
            return (
              <SingleUnitOuterDiv key={unit._id} data-testid='unit'>
                <SingleUnitInnerDiv>
                  {showUnitInfo(unit._id, unit.name)}
                </SingleUnitInnerDiv>
                {unit.resident ? (
                  <SingleUnitInnerDiv>
                    {/* <CondoUnitsTitle>Residente Principal</CondoUnitsTitle> */}
                    <p>{`${unit.resident.name} ${unit.resident.lastName}`}</p>
                  </SingleUnitInnerDiv>
                ) : (
                  <SingleUnitInnerDiv>
                    {/* <CondoUnitsTitle>Residente Principal</CondoUnitsTitle> */}
                    <p>No asignado</p>
                  </SingleUnitInnerDiv>
                )}
                <SingleUnitInnerDiv
                  style={{
                    backgroundColor: '#7078c8',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton
                    // style={{ padding: '0px' }}
                    onClick={onDeleteUnit.bind(unit, unit._id)}
                    data-testid='delete'
                  >
                    <DeleteIcon style={{ color: 'white', fontSize: '24px' }} />
                  </IconButton>
                  <IconButton
                    onClick={onEditUnit.bind(unit, unit._id, unit.name)}
                    data-testid='edit'
                  >
                    <EditIcon style={{ color: 'white', fontSize: '24px' }} />
                  </IconButton>
                </SingleUnitInnerDiv>
              </SingleUnitOuterDiv>
            )
          })
        ) : (
          <p>No tienes unidades por el momento</p>
        )}
      </UnitListSection>
    </ListUnitsDiv>
  )
}

export default ContentGetUnits
