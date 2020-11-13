import React from 'react'
import styled from 'styled-components'
import logo from '../logo.svg'

const Container = styled.div`
  background-color: #ffbf5b;
  max-width: 18vw;
  min-height: 100vh;
`
const Logo = styled.div`
  padding: 40px;
  text-align: center;
`

const SideMenu = styled.div`
  text-align: center;
  padding-top: 30px;

  & li {
    padding: 16px;
    cursor: pointer;
    transition: 0.15s ease-in;

    &:hover {
      background-color: #607d8b;
      color: white;
    }

    &:active {
      font-size: 1.1rem;
    }
  }
`

const Picture = styled.div`
  padding: 40px;
  text-align: center;
`

const LeftMenu = () => {
  return (
    <Container>
      <Logo>
        <img src={logo} alt='logo' />
      </Logo>

      <SideMenu>
        <ol>
          <li>Mensaje</li>
          <li>Pagos</li>
          <li>Eventos</li>
          <li>Tickets</li>
          <li>Crear perfil</li>
        </ol>
      </SideMenu>

      <Picture></Picture>
    </Container>
  )
}

export default LeftMenu
