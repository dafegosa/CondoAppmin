import React, { useEffect } from 'react'
import styled from 'styled-components'
import logo from '../../../../logo.svg'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ChooseCondo from './ChooseCondo'
import { getCondos } from '../../../../store/condoReducer'
import {
  SET_CURRENT_OPTION,
  verifyUser,
} from '../../../../store/sessionReducer'

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
  transition: 300ms;

  &:hover,
  &.active-item {
    background-color: white;
  }
  & i {
    display: inline-block;
    color: #607d8b;
    font-size: 1.2rem;
    margin-right: 15px;
  }
`
const liClass = 'menu-item'

const Picture = styled.div`
  padding: 40px;
  text-align: center;
`

const LeftMenu = () => {
  const { admin, resident, currentOption } = useSelector(
    ({ sessionReducer: { admin, resident, currentOption } }) => {
      return { admin, resident, currentOption }
    }
  )
  const { condos } = useSelector(({ condoReducer: { condos } }) => {
    return { condos }
  })

  const dispatch = useDispatch()

  let history = useHistory()
  const {
    location: { pathname },
  } = history

  const leftMenuNav = [
    { name: 'Condominios', icon: 'fas fa-building', link: 'condo' },
    { name: 'Unidades', icon: 'fas fa-tag', link: 'unit' },
    { name: 'Residentes', icon: 'fas fa-address-card', link: 'resident' },
    { name: 'Tickets', icon: 'fas fa-comment-dots', link: 'ticket' },
    { name: 'Mensajes', icon: 'fas fa-envelope', link: 'message' },
    { name: 'Pagos', icon: 'fas fa-money-check-alt', link: 'payment' },
    { name: 'Areas Comunes', icon: 'fas fa-table-tennis', link: 'venue' },
  ]
  if (resident) leftMenuNav.splice(0, 3)

  const leftMenuRouter = (el) => {
    console.log('Enlace del LeftMenu', el)
    history.push(`/dashboard/${el.toLowerCase()}`)
  }

  useEffect(() => {
    async function checkForCondos() {
      const token = localStorage.getItem('token')
      const { getResident, getAdmin } = await dispatch(
        verifyUser(history, token)
      )
      if (getAdmin) {
        const token = localStorage.getItem('token')
        dispatch(getCondos(token))
      }
    }
    checkForCondos()
  }, [])

  const addClassToMenuItem = (link) => {
    if (link === currentOption) {
      return 'active-item'
    } else {
      return
    }
  }

  return (
    <Container data-testid='left-menu'>
      <Logo>
        <img src={logo} alt='logo' />
      </Logo>
      {admin && condos.length > 0 ? <ChooseCondo /> : null}
      <SideMenu>
        <ul>
          {!!leftMenuNav &&
            leftMenuNav.length > 0 &&
            leftMenuNav.map((el, i) => (
              <li key={el.name}>
                <Select
                  data-testid={el.link}
                  onClick={leftMenuRouter.bind(i, el.link)}
                  className={addClassToMenuItem(el.link)}
                >
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
