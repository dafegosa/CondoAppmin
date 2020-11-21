import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { usersData } from '../../data/usersData'
import { 
  EnterFormDiv, 
  EnterForm, 
  FormHeading, 
  FormDescription, 
  Input, 
  Button,
  Label,
  InputDiv,
  Paragraph,
} from '../login/Login'
import axios from 'axios'


class Register extends Component {
  state = {
    name: '',
    lastname: '',
    idnumber: '',
    phone: '',
    email: '',
    password: '',
    message: ''
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, console.log(this.state));
  };

  createUser = async (e) => {
    e.preventDefault();
    console.log(e.target)

    const { name, lastname, idnumber, phone, email, password } = this.state
    const newUser = {
      name,
      lastName: lastname,
      idNumber: idnumber,
      phone,
      email,
      password,
    }
    console.log(newUser)
    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: 'http://localhost:8000',
        url: '/admin',
        data: newUser
      })
  
      console.log(data.message);
      this.setState({ ...this.state, message: data.message });
    } catch(err)  {
      console.log(err)
      
    }

  };
  render() {
    const { name, lastname, idnumber, phone, email, password, message } = this.state
    return (
      <EnterFormDiv>
        <EnterForm onSubmit={this.createUser}>
          <FormHeading>Registrate</FormHeading>
          <FormDescription>Registrate para empezar a usar nuestros servicios</FormDescription>
          <InputDiv>
            <Label htmlFor='email'>Nombre</Label>
            <Input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
                required
              />
          </InputDiv>
          <Button type="submit">Registrarme</Button>
          {message}
          <Paragraph>
            ¿Ya tienes una cuenta?{' '}
            <Link to='/login' className='Register-link'>
              Ingresar
            </Link>
          </Paragraph>
        </EnterForm>
      </EnterFormDiv>
    );
  }
}
export default Register;
