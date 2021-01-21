import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { CONDO_SELECT, getCondos } from '../../../../store/condoReducer'
import { globalHandleChange } from '../../../../store/sessionReducer'

const ChooseCondoDiv = styled.div`
  box-sizing: border-box;
  height: 12.5%;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 15%;
`

const Button = styled.button`
  background: rgba(96, 125, 139, 1);
  color: white;
  text-align: center;
  padding: 2px;
`
const ChooseCondoForm = styled.form`
  display: flex;
  height: 20px;
  flex-direction: column;
`

function ChooseCondo() {
  const { chosenCondo, condos } = useSelector(
    ({ condoReducer: { chosenCondo, condos } }) => {
      return { chosenCondo, condos }
    }
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(getCondos(token))
  }, [])

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'CONDO'))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const condo = condos.find((condo) => condo._id === chosenCondo)
    dispatch({
      type: CONDO_SELECT,
      payload: { id: chosenCondo, condoName: condo.name },
    })
  }

  return (
    <ChooseCondoDiv>
      <ChooseCondoForm
        style={{ marginBottom: '120px' }}
        onSubmit={handleSubmit}
      >
        <select
          className='btn btn-group btn-primary'
          name='chosenCondo'
          id='condo-select'
          value={chosenCondo}
          onChange={handleChange}
          required
          style={{ backgroundColor: '#7870a0', padding: '.6rem 1.2rem' }}
        >
          <option>{'Escoge condominio'}</option>
          {condos &&
            condos.length > 0 &&
            condos.map((condo) => {
              return (
                <option value={condo._id} key={condo._id}>
                  {condo.name}
                </option>
              )
            })}
        </select>
        <button
          type='submit'
          className='btn btn-outline-primary'
          style={{
            color: '#e0e0e8',
            border: '1px solid #e0e0e8',
            marginTop: '10px',
          }}
        >
          Seleccionar
        </button>
      </ChooseCondoForm>
    </ChooseCondoDiv>
  )
}

export default ChooseCondo
