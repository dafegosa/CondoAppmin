import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HomeOuterDiv = styled.div`
  /* border: 1px solid red; */
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`

const Navbar = styled.div`
  padding: 15px;
  /* border: 1px solid purple; */
  background-color: ${props => props.theme.mainColor};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;

  & a {
    text-decoration: none;
  }
  & a:hover {
    text-decoration: none;
    color: rgb(255, 192, 91);
  }
`

const LoginButtonDiv = styled.div`
  /* border: 1px solid greenyellow; */
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${props => props.theme.thirdColor};
  transition: 300ms;

  & p {
    color: white;
    text-decoration: none;
    transition: 300ms;
  }

  &:hover {
    background-color: rgb(255, 192, 91);
  }
  &:hover p{
    color: rgb(160, 160, 160);
  }

`
const SignupButtonDiv = styled.div`
  /* border: 1px solid blue; */
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.thirdColor};
  transition: 300ms;

  & p {
    color: white;
    text-decoration: none;
    transition: 300ms;
  }

  &:hover {
    background-color: rgb(255, 192, 91);
  }
  &:hover p{
    color: rgb(160, 160, 160);
  }
`


class Home extends React.Component {
  render () {
    return (
      <HomeOuterDiv>
        <Navbar>
          <Link to="/login">
            <LoginButtonDiv>
              <p>Login</p>
            </LoginButtonDiv>
          </Link>
          <Link to="/register">
            <SignupButtonDiv>
              <p>Sign Up</p>
            </SignupButtonDiv>
          </Link>
        </Navbar>
      </HomeOuterDiv>
    )
  }
}

export default Home