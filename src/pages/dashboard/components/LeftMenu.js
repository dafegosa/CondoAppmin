import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../../logo.svg'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { CSSTransition } from 'react-transition-group'
import { UserOptionsDiv } from './UserSection'
import { useSelector } from 'react-redux'

const Container = styled.div`
  grid-area: 1 / 1 / 9 / 3;
  background-color: #ffbf5b;
  min-width: 15vw;
  min-height: 100vh;
`
const Logo = styled.div`
  padding: 40px;
  text-align: center;
`

const SideMenu = styled.div`
  padding-top: 20px;
  margin-left: 20px;
  position: relative;
  ul {
    padding: 0;
  }
`
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

  li {
    margin-left: 20px;
    position: absolute;
    left: 30px;
    text-decoration: none;
    list-style: none;
  }
`

const Picture = styled.div`
  padding: 40px;
  text-align: center;
`

const LeftMenu = () => {
  const { admin, resident } = useSelector(
    ({ sessionReducer: { admin, resident } }) => {
      return { admin, resident }
    }
  )
  const [renderOptions, setRenderOptions] = useState(false)
  let history = useHistory()
  const leftMenuNav = [
    {
      name: 'Mensajes',
      icon: 'fas fa-envelope',
    },
    { name: 'Pagos', icon: 'fas fa-money-check-alt' },
    { name: 'Eventos', icon: 'fas fa-calendar-alt' },
  ]
  if (admin) {
    leftMenuNav.push({ name: 'Tickets', icon: 'fas fa-comment-dots' })
  }

  const subMenuNav = [
    { name: 'Condominio', icon: '  ' },
    { name: 'Residente', icon: '  ' },
    { name: 'Unidad', icon: '  ' },
  ]

  const leftMenuRouter = (el) => {
    switch (el) {
      case 'Mensajes':
        history.push('/dashboard/messages')
        break
      case 'Condominio':
        history.push('/dashboard/addcondo')
        break
      case 'Residente':
        history.push('/dashboard/addresident')
        break
      case 'Unidad':
        history.push('/dashboard/addunit')
        break
      default:
        break
    }
  }
  const userSectionOptionsClick = (e) => {
    setRenderOptions(!renderOptions)
  }

  return (
    <Container>
      <Logo>
        <img src={logo} alt='logo' />
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
              </Select>
            ))}
          {!!admin && (
            <Select onClick={userSectionOptionsClick}>
              <li>Agregar</li>
              <AddIcon style={{ color: '#607d8b' }}></AddIcon>
            </Select>
          )}

          <CSSTransition
            in={renderOptions}
            timeout={500}
            classNames='transition'
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
  )
}

export default LeftMenu
