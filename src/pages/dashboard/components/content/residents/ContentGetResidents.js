import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Dialog, DialogActions } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
  retrieveResidents,
  RESIDENT_ERROR_CLEAN,
  RESIDENT_MESSAGE_CLEAN,
  SET_CURRENT_RESIDENT_ID,
  SET_CURRENT_RESIDENT_NAME,
  SET_CURRENT_RESIDENT,
} from '../../../../../store/residentReducer'
import { globalRemoveDocument } from '../../../../../store/sessionReducer'
import {
  ListCondosDiv as ListResidentsDiv,
  GetCondosTitle as GetResidentsTitle,
} from '../condos/ContentGetCondos'

const ResidentListSection = styled.div`
  width: 90%;
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`

const SingleResidentOuterDiv = styled.div`
  overflow: hidden;
  margin-bottom: 15px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-radius: 5px;
  padding: 0px;
  width: 100%;
  color: white;
  background-color: #202850;
  overflow: hidden;
  transition: 400ms;
`
const SingleResidentInnerDiv = styled.div`
  overflow: hidden;
  padding: 5px;
  width: 30vw;
  padding: 1rem;

  &.icon-section {
    width: 10rem;
    display: flex;
    justify-content: space-around;
    align-self: stretch;
    background-color: #505098;
  }
`

const SingleResidentInnerSectionDiv = styled.div`
  overflow: hidden;
  display: flex;
  transition: 200ms;
  background-color: #202850;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`

const ResidentName = styled.h2`
  margin: 0 0 10px 0;
  font-weight: 400;
  font-size: 1.2rem;
`

function ContentPostResident() {
  const [showDialog, setShowDialog] = useState(false)
  const [deleteResident, setDeleteResident] = useState(false)
  const [residentToDelete, setResidentToDelete] = useState('')

  const { residents } = useSelector(({ residentReducer: { residents } }) => {
    return { residents }
  })
  const { currentCondoId, currentCondoName } = useSelector(
    ({ condoReducer: { currentCondoId, currentCondoName } }) => {
      return { currentCondoId, currentCondoName }
    }
  )
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })

  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveResidents(currentCondoId))
    dispatch({ type: RESIDENT_ERROR_CLEAN })
    dispatch({ type: RESIDENT_MESSAGE_CLEAN })
  }, [currentCondoId, showDialog])

  const onDeleteResident = (unitId) => {
    setResidentToDelete(unitId)
    setShowDialog(true)
  }
  const onEditResident = (resident) => {
    dispatch({ type: SET_CURRENT_RESIDENT_ID, payload: resident._id })
    dispatch({
      type: SET_CURRENT_RESIDENT_NAME,
      payload: `${resident.name} ${resident.lastName}`,
    })
    dispatch({ type: SET_CURRENT_RESIDENT, payload: resident })
    history.push(`/dashboard/resident/edit/${resident._id}`)
  }

  const onDeleteModal = (value) => {
    if (value === 'Si') {
      setDeleteResident(true)

      dispatch(globalRemoveDocument('resident', residentToDelete, residents))
      setShowDialog(false)
    } else {
      setDeleteResident('')
      setShowDialog(false)
    }
  }

  const seeResident = (residentId, name, lastName) => {
    dispatch({ type: SET_CURRENT_RESIDENT_ID, payload: residentId })
    dispatch({
      type: SET_CURRENT_RESIDENT_NAME,
      payload: `${name} ${lastName}`,
    })
    history.push(`/dashboard/resident/view/${residentId}`)
  }

  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <ListResidentsDiv>
      <GetResidentsTitle>{`Listado de Residentes de ${currentCondoName}`}</GetResidentsTitle>
      <Dialog open={showDialog}>
        ¿Estas seguro que deseas borrar el residente?
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
      <ResidentListSection>
        {!!residents && residents.length > 0 ? (
          residents.map((resident) => {
            return (
              <SingleResidentOuterDiv key={resident._id} data-testid='resident'>
                <SingleResidentInnerSectionDiv
                  onClick={seeResident.bind(
                    this,
                    resident._id,
                    resident.name,
                    resident.lastName
                  )}
                >
                  <SingleResidentInnerDiv>
                    <ResidentName>{`${resident.name} ${resident.lastName}`}</ResidentName>
                  </SingleResidentInnerDiv>
                  <SingleResidentInnerDiv>
                    <p>{resident.unitId.name}</p>
                  </SingleResidentInnerDiv>
                </SingleResidentInnerSectionDiv>
                <SingleResidentInnerDiv className='icon-section'>
                  <IconButton
                    title='Borrar residente'
                    style={{ padding: '0px' }}
                    onClick={onDeleteResident.bind(
                      resident,
                      resident._id,
                      resident.name
                    )}
                    data-testid='delete'
                  >
                    <DeleteIcon style={{ color: 'white', fontSize: '24px' }} />
                  </IconButton>
                  <IconButton
                    title='Editar residente'
                    style={{ padding: '0px', display: 'block' }}
                    onClick={onEditResident.bind(resident, resident)}
                  >
                    <EditIcon style={{ color: 'white', fontSize: '24px' }} />
                  </IconButton>
                </SingleResidentInnerDiv>
              </SingleResidentOuterDiv>
            )
          })
        ) : (
          <p>No tienes residentes por el momento</p>
        )}
      </ResidentListSection>
    </ListResidentsDiv>
  )
}

export default ContentPostResident
