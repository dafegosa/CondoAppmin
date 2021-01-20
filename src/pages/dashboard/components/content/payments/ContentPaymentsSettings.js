import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getAdmin, globalHandleChange, globalCreateDocument } from '../../../../../store/sessionReducer'

export const PaymentSettingsDiv = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  & input,
  & select {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
  }
`

export const SectionTitle = styled.h1`
  font-weight: 500;
  font-size: 24px;
`
export const SectionSubtitle = styled.h2`
  font-weight: 400;
  font-size: 22px;
`

const SettingsForm = styled.form`
  margin-top: 30px;
  box-sizing: border-box;
  width: 70%;
`

const SettingsListDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SettingOuterDiv = styled.div`
  display: flex;
`

const ContentPaymentsSettings = () => {

  const { name, value, settings, message, error } = useSelector(( { paymentReducer: { name, value, settings, message, error }}) => {
    return { name, value, settings, message, error }
  })
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(globalHandleChange(e, 'SERVICE'))
  }

  const createDocument = async (e) => {
    e.preventDefault()

    const newDocument = {
      name: name,
      value: value, 
    }
    const token = localStorage.getItem('token')
    dispatch(globalCreateDocument('service', newDocument, token))
  }

  return (
    <PaymentSettingsDiv>
      <SectionTitle>Servicios a cobrar</SectionTitle>
      <SettingsForm onSubmit={createDocument}>
      <label htmlFor='resLastname'>Servicio</label>
        <input
          id='name'
          name='name'
          type='text'
          onChange={handleChange}
          value={name}
        />
        <label htmlFor='value'>Valor</label>
        <input
          id='value'
          name='value'
          type='number'
          onChange={handleChange}
          value={value}
        />
        <button type='submit'>Submit</button>
        {message || error}
      </SettingsForm>
      <SettingsListDiv>
        <SectionSubtitle>Listado de Servicios</SectionSubtitle>
        {!!settings && settings.length > 0 ? 
        settings.map(setting => {
          return (
            <SettingOuterDiv>

            </SettingOuterDiv>
          )
        }) : <p>Aun no has agregado servicios</p>}

      </SettingsListDiv>
    </PaymentSettingsDiv>
  )
}

export default ContentPaymentsSettings