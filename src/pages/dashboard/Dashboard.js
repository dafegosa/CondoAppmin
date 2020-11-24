import React from 'react'
import styled from 'styled-components'
import TopBar from './components/TopBar'
import Content from "./components/content/Content"
import MessagesArea from './components/MessagesArea'
import LeftMenu from './components/LeftMenu'
import axios from 'axios'

const DashboardDiv = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template: repeat(8, 1fr) / repeat(12, 1fr);
  grid-gap: 0px;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  @media (max-width: 500px) {
    grid-template: repeat(12, 1fr) / repeat(8, 1fr);
  }
`


class Dashboard extends React.Component {

  state = {
    name: ''
  } 
  async componentDidMount() {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: '/admin',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      this.setState({ name: data.name })

    } catch(err) {
      
      localStorage.removeItem('token')
      this.props.history.push('/login')
      
    }
  }
  render() {
    const { name } = this.state
    const { history } = this.props
    return ( 
      <DashboardDiv>
        <TopBar 
          name={name} 
          history={history}
        />
        <LeftMenu />
        <MessagesArea />
        <Content content={props.match.url}/>
      </DashboardDiv>
    )
  }
}

export default Dashboard
