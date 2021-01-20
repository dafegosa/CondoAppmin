import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { globalHandleChange } from '../../store/sessionReducer'
import { userLogin } from '../../store/loginReducer'
import '../../App.css'

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`

const LoginBackground = styled.div`
  width: 50%;
  background-size: cover;
  background-position: center;
  background-image: url('https://pixabay.com/get/55e5d3434351af14f6d1867dda2f3376103fd8e24e507748752672d49644c4_1920.jpg');
`

export const EnterFormDiv = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    45deg,
    rgba(24, 24, 56, 1) 25%,
    rgba(56, 72, 120, 0.6) 73%
  );
  height: 100vh;
  width: 50vw;
  box-sizing: border-box;
`

export const EnterForm = styled.form`
  width: 26rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem 2rem;
  text-align: center;
  box-shadow: 0 0px 5px 0 #5a5a5a;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  opacity: 1;
  left: 27%;
  color: white;

  & .radioInputs {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    width: 50%;
  }
  .Register-link {
    color: white;
  }
  & div div {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }
`

export const FormHeading = styled.h2`
  font-size: 3rem;
  font-family: 'Cormorant Garamond';
  margin-bottom: 3rem;
`

export const FormDescription = styled.p`
  font-family: 'Poppins';
  font-weight: 200;
  font-size: 1.2rem;
  padding: auto 5rem;
  margin-bottom: 3rem;
`

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`

export const Label = styled.label`
  font-family: 'Poppins';
  font-size: 15px;
  text-align: left;
  color: white;
  width: 100%;
  margin-bottom: 5px;
`

export const Input = styled.input`
  color: black;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  border: 0px;
`

const RadioLabel = styled.label`
  font-family: 'Poppins';
  font-size: 1.1rem;
  margin: 0.5rem;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: #d6a38d;
  }
`

export const Button = styled.button`
  border: none;
  background-color: #d6a38d;
  color: #e1eef5;
  padding: 10px 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
  transition: 300ms;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 0px 10px 0 #3f3f3f;
    background-color: #90a4ae;
    border-radius: 5px;
    color: white;
    font-size: 16px;

    cursor: pointer;
  }
`

export const Paragraph = styled.p`
  bottom: 0;
  font-size: 10px;
  color: #90a4ae;
`

function Login() {
  const { email, password, type, message } = useSelector(
    ({ loginReducer: { email, password, type, message } }) => {
      return { email, password, type, message }
    }
  )
  const dispatch = useDispatch()
  const history = useHistory()

  const handleInputChange = (e) => {
    dispatch(globalHandleChange(e, 'LOGIN'))
  }

  const userValidation = async (e) => {
    e.preventDefault()

    const loggingUser = {
      email,
      password,
    }

    dispatch(userLogin(history, loggingUser, type))
  }
  return (
    <LoginContainer>
      <LoginBackground></LoginBackground>
      <EnterFormDiv>
        <EnterForm onSubmit={userValidation} data-testid='login'>
          <FormHeading>Bienvenido</FormHeading>
          <FormDescription>
            Inicia sesión para seguir administrando tu conjunto
          </FormDescription>
          <InputDiv
            onChange={handleInputChange}
            className='radioInputs'
            data-testid='radio'
          >
            <div>
              <input
                type='radio'
                id='admin'
                name='type'
                value='admin'
                required
              />
              <RadioLabel htmlFor='admin'> Administrador</RadioLabel>
            </div>
            <div>
              <input type='radio' id='resident' name='type' value='resident' />
              <RadioLabel htmlFor='resident'> Residente</RadioLabel>
            </div>
          </InputDiv>
          <InputDiv>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleInputChange}
              required
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor='password'>Contraseña</Label>
            <Input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleInputChange}
              required
            />
          </InputDiv>
          <Button type='submit'>Ingresar</Button>
          {message && <p>{message}</p>}
          <Paragraph>
            ¿No tienes una cuenta?{' '}
            <Link to='/register' className='Register-link'>
              Registrarme
            </Link>
          </Paragraph>
        </EnterForm>
      </EnterFormDiv>
    </LoginContainer>
  )
}
export default Login
