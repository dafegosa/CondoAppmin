import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { usersData } from '../../data/usersData'


const EnterFormDiv = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.thirdColor};
  height: 100vh;
  width: 60vw;
  box-sizing: border-box;
`

const EnterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 30px;
  text-align: center;
  height: 450px;
  box-shadow: 0 0px 5px 0 #5a5a5a;
  background: #4d6470;
  border-radius: 15px;
  opacity: 1;
  left: 27%;
  color: white;
  box-sizing: border-box;

  & .radioInputs {
    display: flex;
    flex-direction: row;
    width: 60%;
    justify-content: space-between;
    
  }
  & h2, & p {
    
    margin-bottom: 15px;
  }
  & h2 {
    font-size: 24px;
  }
  & div {

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & div label{
    font-size: 14px;
    text-align: left;
    color: white;
    width: 100%;
    margin-bottom: 5px;
  }
  .Register-link {
    color: white;
  }
  & div div {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }
`;

const Input = styled.input`
  color: black;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  border: 0px;
`;

const RadioLabel = styled.label`
  &:hover {
    cursor: pointer;
    text-align: center;
  }
`;

const Button = styled.button`
  border: none;
  background-color: #6e92a3;
  color: #e1eef5;
  padding: 10px 30px;
  border-radius: 5px;
  font-size: 16px;
  transition: 300ms;

  &:hover {
    box-shadow: 0 0px 10px 0 #3f3f3f;
    background-color: #90a4ae;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;

const Paragraph = styled.p`
  bottom: 0;
  font-size: 10px;
  color: #90a4ae;
`;

class Login extends Component {
  state = {
    email: '',
    password: '',
    type: '',
    users: usersData,
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  userValidation = (e) => {
    e.preventDefault();
    const { email, password, type } = this.state;
    const validUser = {
      email,
      password,
      type,
    };
    const result = this.state.users.filter(
      (thisUser) =>
        thisUser.type === validUser.type &&
        thisUser.email === validUser.email &&
        thisUser.password === validUser.password
    );

    if (result.length > 0) {
      this.props.history.push('/dashboard');
    }
  };
  render() {
    const { email, password } = this.state;
    return (
      <EnterFormDiv>
        <EnterForm onSubmit={this.userValidation}>
          <h2>Bienvenido</h2>
          <p>Inicia sesión para seguir administrando tu conjunto</p>
          <div onChange={this.handleInputChange} className='radioInputs'>
            <div>
              <input type='radio' id='admin' name='type' value='admin' required />
              <RadioLabel htmlFor='admin'>Administrador</RadioLabel>
            </div>
            <div>
              <input type='radio' id='resident' name='type' value='resident' />
              <RadioLabel htmlFor='resident'>Residente</RadioLabel>

            </div>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <Input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Contraseña</label>
            <Input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <Button type='submit'>Ingresar</Button>
          <Paragraph>
            ¿No tienes una cuenta?{' '}
            <Link to='/register' className='Register-link'>
              Registrarme
            </Link>
          </Paragraph>
        </EnterForm>
      </EnterFormDiv>
    );
  }
}
export default Login;
