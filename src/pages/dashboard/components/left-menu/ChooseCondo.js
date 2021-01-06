import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components"
import { CONDO_SELECT, getCondos } from '../../../../store/condoReducer'
import { globalHandleChange } from '../../../../store/sessionReducer'

const ChooseCondoDiv = styled.div`
  box-sizing: border-box;
  height: 12.5%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

`
const ChooseCondoForm = styled.form`
  display: flex;
  height: 20px;
`

function ChooseCondo () {
  
  const { chosenCondo, condos } = useSelector(({ condoReducer: { chosenCondo, condos } }) => {
    return { chosenCondo, condos }
  })
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
    
    const condo = condos.find(condo => condo._id === chosenCondo)
    dispatch({type: CONDO_SELECT, payload: { id: chosenCondo, condoName: condo.name } })
  }

  return (
    <ChooseCondoDiv>
      <ChooseCondoForm onSubmit={handleSubmit}>
        <select
          name="chosenCondo"
          id="condo-select"
          value={chosenCondo}
          onChange={handleChange}
          required
        >
          <option>
            {"Escoge condominio"}
          </option>
          {condos && condos.length > 0 &&
            condos.map((condo) => {
              return (
                <option value={condo._id} key={condo._id}>
                  {condo.name}
                </option>
              )
            })}
        </select>
        <button type="submit">Seleccionar</button>
      </ChooseCondoForm>
    </ChooseCondoDiv>
  )
}

export default ChooseCondo;