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
    <EnterFormDiv>
      {loading ? <Loader show={loading}>Cargando...</Loader> : null}
      <EnterForm onSubmit={createUser} data-testid='register'>
        <FormHeading>Registrate</FormHeading>
        <FormDescription>
          Registrate para empezar a usar nuestros servicios
        </FormDescription>
        <InputDiv>
          <Label htmlFor='email'>Nombre</Label>
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
          <Label htmlFor='lastname'>Apellido</Label>
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
          <Label htmlFor='idnumber'>Cédula</Label>
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
          <Label htmlFor='phone'>Teléfono</Label>
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
  )
}
export default Register
