import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Dialog, DialogActions } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { retrieveResidents, RESIDENT_ERROR_CLEAN, RESIDENT_MESSAGE_CLEAN, SET_CURRENT_RESIDENT_ID, SET_CURRENT_RESIDENT_NAME, SET_CURRENT_RESIDENT } from '../../../../../store/residentReducer'
import { globalRemoveDocument, globalHandleChange, globalUpdateDocument } from '../../../../../store/sessionReducer'
import { ListCondosDiv as ListResidentsDiv, GetCondosTitle as GetResidentsTitle } from '../condos/ContentGetCondos'

const ResidentListSection = styled.div`
  width: auto;
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
  padding: 0px;
  width: 100%;
  color: white;
  border: 1px solid rgba(96, 125, 139, 0.7);
  background-color: rgba(96, 125, 139, 0.6);
  overflow: scroll;
  transition: 400ms;

  

`
const SingleResidentInnerDiv = styled.div`
  padding: 5px;
  border-left: 1px solid white;
  width: auto;
  &:first-child {
    border-left: 0px;
  } 
  &:last-child {
    border-left: 1px solid white;
  } 
  &.icon-section {
    width: auto;
  }
`

const SingleResidentInnerSectionDiv = styled.div`
  /* border: 1px solid red; */
  display: flex;
  transition: 400ms;
  width: auto;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`

const ResidentName = styled.h2`
  margin: 0 0 10px 0;
  font-weight: 400;
  font-size: 22px;
`
const CondoResidentsTitle = styled.h2`
  margin: 0 0 10px 0;
  font-weight: 400;
  font-size: 18px;
`
const CondoResidentsInfoTitle = styled.h3`
  margin: 0 0 10px 0;
  font-weight: 400;
  font-size: 16px;
`

const ResidentNameInput = styled.input`

`

function ContentPostResident () {

  const [showDialog, setShowDialog] = useState(false)
  const [deleteResident, setDeleteResident] = useState(false)
  const [residentToDelete, setResidentToDelete] = useState('')
  const [editResident, setEditResident] = useState(false)
  const [residentToEdit, setResidentToEdit] = useState('')

  const { residents } = useSelector(
    ({ residentReducer: { residents } }) => {
    return { residents }
    }) 
  const { currentCondoId, currentCondoName } = useSelector(
    ({ condoReducer: { currentCondoId, currentCondoName } }) => {
    return { currentCondoId, currentCondoName }
    }) 
  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })

  const history = useHistory()
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveResidents(currentCondoId))
    dispatch({type: RESIDENT_ERROR_CLEAN})
    dispatch({type: RESIDENT_MESSAGE_CLEAN})
  }, [currentCondoId, showDialog])

  const onDeleteResident = (unitId) => {
    setResidentToDelete(unitId)
    setShowDialog(true)
    
  }
  const onEditResident = (resident) => {
    dispatch({ type: SET_CURRENT_RESIDENT_ID, payload: resident._id })
    dispatch({ type: SET_CURRENT_RESIDENT_NAME, payload: `${resident.name} ${resident.lastName}` }) 
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
    dispatch({ type: SET_CURRENT_RESIDENT_NAME, payload: `${name} ${lastName}` })
    history.push(`/dashboard/resident/view/${residentId}`)

  }

  return (
    !admin ? <Redirect to="/dashboard" /> :
    (<ListResidentsDiv>
      <GetResidentsTitle>{`Listado de Residentes de ${currentCondoName}`}</GetResidentsTitle>
      <Dialog
        open={showDialog}
      >
        ¿Estas seguro que deseas borrar el residente?
        <DialogActions>
          <button onClick={onDeleteModal.bind(this, 'Si')} color="primary">
            Si
          </button>
          <button onClick={onDeleteModal.bind(this, 'No')} color="primary" autoFocus>
            No
          </button>
        </DialogActions>
      </Dialog>
      <ResidentListSection>
        {!!residents && residents.length > 0 ? 
          residents.map(resident => {
            return (
              <SingleResidentOuterDiv
                key={resident._id}
              >
                <SingleResidentInnerSectionDiv 
                  onClick={seeResident.bind(this, resident._id, resident.name, resident.lastName)}
                >
                  <SingleResidentInnerDiv>
                    <CondoResidentsTitle>{`${resident.name} ${resident.lastName}`}</CondoResidentsTitle>
                  </SingleResidentInnerDiv>
                  <SingleResidentInnerDiv>
                    <CondoResidentsInfoTitle>Unidad Ocupada</CondoResidentsInfoTitle>
                    <p>{resident.unitId.name}</p>
                  </SingleResidentInnerDiv>
                </SingleResidentInnerSectionDiv>
                <SingleResidentInnerDiv className="icon-section">
                  <IconButton title="Borrar residente" style={{ padding: '0px' }}>
                    <DeleteIcon
                      style={{ color: 'white', fontSize: '24px' }}
                      onClick={onDeleteResident.bind(resident, resident._id, resident.name)}
                    />
                  </IconButton>
                  <IconButton title="Editar residente" style={{ padding: '0px', display: 'block' }}>
                    <EditIcon
                      style={{ color: 'white', fontSize: '24px' }}
                      onClick={onEditResident.bind(resident, resident)}
                    />
                  </IconButton>
                </SingleResidentInnerDiv>
              </SingleResidentOuterDiv>
            )
          }) : <p>No tienes residentes por el momento</p>}
      </ResidentListSection>
    </ListResidentsDiv>)
  )
}


export default ContentPostResident