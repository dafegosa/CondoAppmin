import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Contenedor = styled.form`
  padding: 1% 0;
  text-align: center;
  margin-bottom: 30vh;
  width: 45%;
  margin-left: 0%;
  box-shadow: 0 5px 10px 0 black;
  background: #282c34;
  border-radius: 5px;
  opacity: 0.6;
  position: absolute;
  left: 27%;
  top: 30vh;
  &:hover {
    opacity: 1;
  }
  .Register-link {
    color: white;
  }
`;

const Input = styled.input`
  color: blue;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  background: #282c34;
  border-color: #90a4ae;
  width: 60%;
  color: #90a4ae;
  font-size: 20px;
`;

const Radio__label = styled.label`
  color: #90a4ae;
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const Boton = styled.button`
  padding: 5px 15px;
  border: none;
  background-color: #607d8b;
  color: #90a4ae;
  width: 100%;
  height: 8vh;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 16px;
  &:hover {
    box-shadow: 0 5px 10px 0 #333;
    background-color: #90a4ae;
    border-radius: 5px;
    color: white;
    font-size: 16px;
  }
`;

const Paragraph = styled.p`
  font-size: 10px;
  color: #90a4ae;
  background: #282c34;
`;

function Login({ email, password, user, userValidation, handleInputChange }) {
  return (
    <div>
      <Contenedor onSubmit={userValidation}>
        <div onChange={handleInputChange}>
          <input type="radio" id="admin" name="user" value={user} required />
          <Radio__label htmlFor="admin">Administrador</Radio__label>

          <input type="radio" id="resident" name="user" value={user} />
          <Radio__label htmlFor="resident">Residente</Radio__label>
        </div>

        <label htmlFor="email"></label>
        <br />
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="email"
          required
        />

        <br />
        <label htmlFor="password"></label>
        <br />
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />

        <br />
        <br />
        <Boton>Ingresar</Boton>
        <Paragraph>
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="Register-link">
            Registrarme
          </Link>
        </Paragraph>
      </Contenedor>
    </div>
  );
}
export default Login;
