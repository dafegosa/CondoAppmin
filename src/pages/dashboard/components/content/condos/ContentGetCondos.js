import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { IconButton, Dialog, DialogActions } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { useSelector, useDispatch } from 'react-redux'
import {
  CONDO_ERROR_CLEAN,
  CONDO_MESSAGE_CLEAN,
  getCondos,
} from '../../../../../store/condoReducer'
import {
  globalRemoveDocument,
  globalHandleChange,
  globalUpdateDocument,
} from '../../../../../store/sessionReducer'

export const ListCondosDiv = styled.div`
  padding: 0 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-y: scroll;

  & input,
  & select {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
  }
`

export const GetCondosTitle = styled.h1`
  font-family: 'Cormorant Garamond';
  margin: 30px 0 40px 0;
  font-weight: 500;
  font-size: 2.5rem;
  color: white;
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
  /* align-items: baseline; */
  /* justify-content: space-between; */
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  width: 95%;
  color: white;
  border: 1px solid rgba(96, 125, 139, 0.7);
  background-color: #202850;
  overflow: scroll;
  overflow-x: hidden;

  &:last-child {
    margin-bottom: 0;
  }
`
const SingleCondoInnerDiv = styled.div`
  padding: 8px;
  border-left: 1px solid white;
  width: 30%;
  &:first-child {
    border-left: 0px;
    background-color: #505098;
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
const CondoNameInput = styled.input``
const CondoAddressInput = styled.input``

function ContentGetCondos() {
  const { condos, condoName, condoAddress, message, error } = useSelector(
    ({ condoReducer: { condos, condoName, condoAddress, message, error } }) => {
      return { condos, condoName, condoAddress, message, error }
    }
  )

  const [showDialog, setShowDialog] = useState(false)
  const [condoToDelete, setCondoToDelete] = useState('')
  const [deleteCondo, setDeleteCondo] = useState(false)
  const [condoToEdit, setCondoToEdit] = useState('')

  const { admin } = useSelector(({ sessionReducer: { admin } }) => {
    return { admin }
  })
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(getCondos(token))
    dispatch({ type: CONDO_ERROR_CLEAN })
    dispatch({ type: CONDO_MESSAGE_CLEAN })
  }, [condoToEdit])

  const onDeleteCondo = (condoId) => {
    setCondoToDelete(condoId)
    setShowDialog(true)
  }
  const onEditCondo = (condoId, name, address) => {
    if (!condoToEdit) {
      dispatch(
        globalHandleChange(
          { target: { name: 'condoName', value: name } },
          'CONDO'
        )
      )
      dispatch(
        globalHandleChange(
          { target: { name: 'condoAddress', value: address } },
          'CONDO'
        )
      )
      setCondoToEdit(condoId)
    } else {
      setCondoToEdit('')
    }
  }

  const onDeleteModal = (value) => {
    if (value === 'Si') {
      setDeleteCondo(true)

      dispatch(globalRemoveDocument('condo', condoToDelete, condos))
      setShowDialog(false)
    } else {
      setCondoToDelete('')
      setShowDialog(false)
    }
  }

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'CONDO'))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedCondo = {
      name: condoName,
      address: condoAddress,
    }
    dispatch(globalUpdateDocument('condo', condoToEdit, updatedCondo, condos))
  }
  const showCondoInfo = (condoId, name, address) => {
    if (condoId === condoToEdit) {
      return (
        <form onSubmit={handleSubmit}>
          <CondoNameInput
            id='condoName'
            name='condoName'
            type='text'
            onChange={handleChange}
            value={condoName}
            required
          />
          <CondoAddressInput
            id='condoAddress'
            name='condoAddress'
            type='text'
            onChange={handleChange}
            value={condoAddress}
            required
          />
          <button type='submit'>Actualizar</button>
          {message || error}
        </form>
      )
    } else {
      return (
        <>
          <CondoName>{name}</CondoName>
          <CondoAddress>{address}</CondoAddress>
        </>
      )
    }
  }

  return !admin ? (
    <Redirect to='/dashboard' />
  ) : (
    <ListCondosDiv>
      <GetCondosTitle>Listado de Condominios</GetCondosTitle>
      <Dialog open={showDialog}>
        {`¿Estas seguro que deseas borrar ${condoToDelete}?`}
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
      <CondoListSection>
        {!!condos && condos.length > 0 ? (
          condos.map((condo) => {
            return (
              <SingleCondoOuterDiv key={condo._id} data-testid='condo'>
                <SingleCondoInnerDiv className='card-header'>
                  {showCondoInfo(condo._id, condo.name, condo.address)}
                </SingleCondoInnerDiv>
                <SingleCondoInnerDiv>
                  <CondoUnitsTitle>Total de unidades</CondoUnitsTitle>
                  {!!condo.unitIds && condo.unitIds.length > 0 ? (
                    <p>{condo.unitIds.length}</p>
                  ) : (
                    <p>Sin unidades</p>
                  )}
                </SingleCondoInnerDiv>
                <SingleCondoInnerDiv>
                  <CondoUnitsTitle>Ocupación</CondoUnitsTitle>
                  {!!condo.unitIds && condo.unitIds.length > 0 ? (
                    <p>{`${Math.floor(
                      (condo.residentIds.length / condo.unitIds.length) * 100
                    )}%`}</p>
                  ) : (
                    <p>N/A</p>
                  )}
                </SingleCondoInnerDiv>
                <SingleCondoInnerDiv
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <IconButton
                    title='Borrar condominio'
                    style={{ padding: '0px' }}
                    onClick={onDeleteCondo.bind(this, condo._id)}
                    data-testid='delete'
                  >
                    <DeleteIcon style={{ color: 'white', fontSize: '24px' }} />
                  </IconButton>
                  <IconButton
                    style={{ padding: '0px', display: 'block' }}
                    onClick={onEditCondo.bind(
                      this,
                      condo._id,
                      condo.name,
                      condo.address
                    )}
                    data-testid='edit'
                  >
                    <EditIcon style={{ color: 'white', fontSize: '24px' }} />
                  </IconButton>
                </SingleCondoInnerDiv>
                <SingleCondoInnerDiv>
                  <IconButton style={{ padding: '0px' }}>
                    <DeleteIcon
                      style={{ color: 'white', fontSize: '24px' }}
                      onClick={onDeleteCondo.bind(this, condo._id)}
                    />
                  </IconButton>
                  <IconButton style={{ padding: '0px', display: 'block' }}>
                    <EditIcon
                      style={{ color: 'white', fontSize: '24px' }}
                      onClick={onEditCondo.bind(
                        this,
                        condo._id,
                        condo.name,
                        condo.address
                      )}
                    />
                  </IconButton>
                </SingleCondoInnerDiv>
              </SingleCondoOuterDiv>
            )
          })
        ) : (
          <p>No tienes condominios por el momento</p>
        )}
      </CondoListSection>
    </ListCondosDiv>
  )
}

export default ContentGetCondos
