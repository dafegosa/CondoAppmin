import React from 'react';
import styled from 'styled-components';
import logo from '../../../logo.svg';

const Container = styled.div`
  grid-area: 1 / 1 / 9 / 3;
  background-color: #ffbf5b;
  min-width: 15vw;
  min-height: 100vh;
`;
const Logo = styled.div`
  padding: 40px;
  text-align: center;
`;

const SideMenu = styled.div`
  padding-top: 20px;
  margin-left: 20px;
  position: relative;
`;
const Select = styled.div`
  cursor: pointer;
  display: flex;
  padding: 10px;
  color: #0a0f0f;
  &:hover {
    background-color: white;
  }

  & i {
    color: #607d8b;
    font-size: 1.2rem;
  }

  & li {
    margin-left: 20px;
    position: absolute;
    left: 30px;
  }
`;

const Picture = styled.div`
  padding: 40px;
  text-align: center;
`;

const LeftMenu = () => {
  const leftMenuNav = [
    {
      name: 'Mensajes',
      icon: 'fas fa-envelope',
    },
    { name: 'Pagos', icon: 'fas fa-money-check-alt' },
    { name: 'Eventos', icon: 'fas fa-calendar-alt' },
    { name: 'Tickets', icon: 'fas fa-comment-dots' },
    { name: 'Crear perfil', icon: 'fas fa-user-plus' },
  ];
  return (
    <Container>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>

      <SideMenu>
        <ul>
          {leftMenuNav.map((el) => (
            <Select>
              <i class={el.icon}></i>
              <li>{el.name}</li>
              <br />
            </Select>
          ))}
        </ul>
      </SideMenu>

      <Picture></Picture>
    </Container>
  );
};

export default LeftMenu;
