import React from 'react'
import styled from 'styled-components'
import logo from '../../../logo.svg'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Container = styled.section`
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
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
  position: relative;
  box-sizing: border-box;
  ul {
    padding: 0;
    width: 100%;
  }
`
const Select = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 25px;
  color: #0a0f0f;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: white;
  }
  & i {
    display: inline-block;
    color: #607d8b;
    font-size: 1.2rem;
    margin-right: 15px;
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

  let history = useHistory()

  const leftMenuNav = [
    { name: 'Condominios', icon: 'fas fa-building', link: 'condo' },
    { name: 'Unidades', icon: 'fas fa-tag', link: 'unit' },
    { name: 'Residentes', icon: 'fas fa-address-card', link: 'resident' },
    { name: 'Tickets', icon: 'fas fa-comment-dots', link: 'tickets' },
    { name: 'Mensajes', icon: 'fas fa-envelope', link: 'message' },
    { name: 'Pagos', icon: 'fas fa-money-check-alt', link: 'payment' },
    { name: 'Areas Comunes', icon: 'fas fa-table-tennis', link: 'venues' },
  ]
  if (resident) leftMenuNav.splice(0, 3)

  const leftMenuRouter = (el) => {
    console.log(el)
    history.push(`/dashboard/${el.toLowerCase()}`)
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
            leftMenuNav.map((el, i) => (
              <li>
                <Select key={el.name} onClick={leftMenuRouter.bind(i, el.link)}>
                  <i className={el.icon}></i>
                  <span>{el.name}</span>
                </Select>
              </li>
            ))}
        </ul>
      </SideMenu>

      <Picture></Picture>
    </Container>
  )
}

export default LeftMenu
