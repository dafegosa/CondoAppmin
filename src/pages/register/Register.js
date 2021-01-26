import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { globalHandleChange } from '../../store/sessionReducer'
import { userSignup } from '../../store/signupReducer'
import {
  EnterFormDiv,
  EnterForm,
  FormHeading,
  Input,
  Button,
  Label,
  Paragraph,
  InputDiv,
  FormDescription,
} from '../login/Login'
import Loader from '../dashboard/Loader'

const RegisterContainer = styled.div`
  display: flex;
  height: 100vh;
`

const RegisterBackground = styled.div`
  width: 50%;
  background-size: cover;
  background-position: bottom;
  background-image: linear-gradient(
      120deg,
      rgba(24, 24, 56, 0.5) 25%,
      rgba(24, 24, 56, 0.7) 50%
    ),
    url('https://res.cloudinary.com/dafegosa/image/upload/v1611614912/condo-2414328_1920_mlbaxx.jpg');
`

function Register() {
  const [loading, setLoading] = useState(false)
  const {
    name,
    lastname,
    idnumber,
    phone,
    email,
    password,
    message,
  } = useSelector(
    ({
      signupReducer: {
        name,
        lastname,
        idnumber,
        phone,
        email,
        password,
        message,
      },
    }) => {
      return { name, lastname, idnumber, phone, email, password, message }
    }
  )
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    dispatch(globalHandleChange(e, 'SIGNUP'))
  }

  const createUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    const newUser = {
      name,
      lastName: lastname,
      idNumber: idnumber,
      phone,
      email,
      password,
    }
    dispatch(userSignup(newUser)).then(() => setLoading(false))
  }

  return (
    <RegisterContainer>
      <RegisterBackground></RegisterBackground>

      <EnterFormDiv>
        {loading ? <Loader show={loading}>Cargando...</Loader> : null}
        <EnterForm
          style={{ paddingTop: '0.5rem' }}
          onSubmit={createUser}
          data-testid='register'
        >
          <FormHeading
            style={{
              fontSize: '2rem',
              fontWeight: '400',
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
          >
            Regístrate
          </FormHeading>
          <FormDescription style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            Regístrate para empezar a usar nuestra app
          </FormDescription>
          <InputDiv>
            <Label
              htmlFor='email'
              style={{ fontSize: '0.7rem', fontWeight: '400' }}
            >
              Nombre
            </Label>
            <Input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={handleInputChange}
              required
            />
          </InputDiv>
          <InputDiv>
            <Label
              style={{ fontSize: '0.7rem', fontWeight: '400' }}
              htmlFor='lastname'
            >
              Apellido
            </Label>
            <Input
              type='text'
              id='lastname'
              name='lastname'
              value={lastname}
              onChange={handleInputChange}
              required
            />
          </InputDiv>
          <InputDiv>
            <Label
              style={{ fontSize: '0.7rem', fontWeight: '400' }}
              htmlFor='idnumber'
            >
              Cédula
            </Label>
            <Input
              type='text'
              id='idnumber'
              name='idnumber'
              value={idnumber}
              onChange={handleInputChange}
              required
            />
          </InputDiv>
          <InputDiv>
            <Label
              style={{ fontSize: '0.7rem', fontWeight: '400' }}
              htmlFor='phone'
            >
              Teléfono
            </Label>
            <Input
              type='phone'
              id='phone'
              name='phone'
              value={phone}
              onChange={handleInputChange}
              required
            />
          </InputDiv>
          <InputDiv>
            <Label
              style={{ fontSize: '0.7rem', fontWeight: '400' }}
              htmlFor='email'
            >
              Email
            </Label>
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
            <Label
              style={{ fontSize: '0.7rem', fontWeight: '400' }}
              htmlFor='password'
            >
              Contraseña
            </Label>
            <Input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleInputChange}
              required
            />
          </InputDiv>
          <Button type='submit'>Registrarme</Button>
          {message && <p id='message'>{message}</p>}
          <Paragraph>
            ¿Ya tienes una cuenta?{' '}
            <Link to='/login' className='Login-link'>
              Ingresar
            </Link>
          </Paragraph>
        </EnterForm>
      </EnterFormDiv>
    </RegisterContainer>
  )
}
export default Register
