import React from "react";
import styled from "styled-components";
import logo from "../../../logo.svg";
import { Link } from "react-router-dom";

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
  & li {
    padding: 16px;
    cursor: pointer;
    transition: 0.2s ease-in;
    .clean {
      text-decoration: none;
    }
    i &:hover {
      background-color: #607d8b; */
      color: white;
    }
    &:hover {
      background-color: #607d8b;
      color: white;
    }

    &:active {
      font-size: 1.1rem;
    }

    & i {
      color: #607d8b;
      margin-right: 10px;
    }

    & span {
      &:hover {
        color: white;
      }
    }
  }
`;

const Picture = styled.div`
  padding: 40px;
  text-align: center;
`;

const LeftMenu = () => {
  return (
    <Container>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>

      <SideMenu>
        <ul>
          <li>
            <Link className="clean">
              <i className="fas fa-envelope"></i>
              <span>Mensajes</span>
            </Link>
          </li>
          <li>
            <Link className="clean">
              <i className="fas fa-money-check-alt"></i>
              <span>Pagos</span>
            </Link>
          </li>
          <li>
            <Link className="clean">
              <i className="fas fa-calendar-alt"></i>
              <span>Eventos</span>
            </Link>
          </li>
          <li>
            <Link className="clean">
              <i className="fas fa-comment-dots"></i>
              <span>Tickets</span>
            </Link>
          </li>
          <li>
            <Link className="clean">
              <i className="fas fa-user-plus clean"></i>
              <span>Crear perfil</span>
            </Link>
          </li>
        </ul>
      </SideMenu>

      <Picture></Picture>
    </Container>
  );
};

export default LeftMenu;
