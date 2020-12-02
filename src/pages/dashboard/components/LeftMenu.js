import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../../logo.svg';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CSSTransition } from 'react-transition-group';
import { UserOptionsDiv } from './UserSection';
import { UserOptionsListItem } from './UserSection';

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
  const [renderOptions, setRenderOptions] = useState(false);
  let history = useHistory();
  const leftMenuNav = [
    {
      name: 'Mensajes',
      icon: 'fas fa-envelope',
    },
    { name: 'Pagos', icon: 'fas fa-money-check-alt' },
    { name: 'Eventos', icon: 'fas fa-calendar-alt' },
    { name: 'Tickets', icon: 'fas fa-comment-dots' },
  ];

  const subMenuNav = [
    { name: 'Nuevo Condo...', icon: '  ' },
    { name: 'Nuevo Residente', icon: '  ' },
    { name: 'Nueva Unidad', icon: '  ' },
  ];

  const leftMenuRouter = (el) => {
    switch (el) {
      case 'Mensajes':
        history.push('/dashboard/messages');
        break;
      case 'Nuevo Condo...':
        history.push('/dashboard/addcondo');
        break;
      case 'Nuevo Residente':
        history.push('/dashboard/adduser');
        break;
      case 'Nueva Unidad':
        history.push('/dashboard/addunit');
        break;
      default:
        break;
    }
  };
  const userSectionOptionsClick = (e) => {
    setRenderOptions(!renderOptions);
  };

  return (
    <Container>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>

      <SideMenu>
        <ul>
          {!!leftMenuNav &&
            leftMenuNav.length > 0 &&
            leftMenuNav.map((el, indx) => (
              <Select
                key={el.name}
                onClick={leftMenuRouter.bind(indx, el.name)}
              >
                <i className={el.icon}></i>
                <li>{el.name}</li>
                <br />
              </Select>
            ))}
          <Select onClick={userSectionOptionsClick}>
            <li>Agregar</li>
            <AddIcon style={{ color: '#607d8b' }}></AddIcon>
          </Select>

          <CSSTransition
            in={renderOptions}
            timeout={500}
            classNames="transition"
            unmountOnExit
            appear
          >
            <UserOptionsDiv>
              <ul>
                {!!subMenuNav &&
                  subMenuNav.length > 0 &&
                  subMenuNav.map((el, indx) => (
                    <Select
                      key={el.name}
                      onClick={leftMenuRouter.bind(indx, el.name)}
                    >
                      <i className={el.icon}></i>
                      <li>{el.name}</li>
                      <br />
                    </Select>
                  ))}
              </ul>
            </UserOptionsDiv>
          </CSSTransition>
        </ul>
      </SideMenu>

      <Picture></Picture>
    </Container>
  );
};

export default LeftMenu;
