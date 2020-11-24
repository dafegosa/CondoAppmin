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
    adminName: '',
    adminid: '',
    condoName: '',
    condoAddress: '',
    condoid: '',
    unitName: '',
    message: '',

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

      this.setState({ adminName: data.name, id: data.id })

    } catch(err) {
      
      localStorage.removeItem('token')
      this.props.history.push('/login')
      
    }
  }
  handleChange = (e) => {
    e.preventDefault()

    const { name, value } = e.target

    this.setState({ [name]: value })
  }
  addToDatabase = (endpoint, statePart) => async (e) => {
    
    e.preventDefault()

    
    switch (endpoint) {
      case 'condo':
        const { condoName , condoAddress } = this.state
        statePart.name = condoName
        statePart.address = condoAddress
        break;
      case 'unit':
        const { unitName } = this.state
        statePart.name = unitName
        break;
      case 'resident':
        const { residentName } = this.state
        statePart.name = residentName
        break;
    
      default:
        break;
    }

    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: 'http://localhost:8080',
        url: `/${endpoint}`,
        data: statePart
      })
      /* this.setState({...this.state, name: '', address: '', message: data.message}) */

    }
    catch (err) {
      this.setState({...this.state, message: 'No fue posible agregar el condominio'})
    } 
  }

  render() {

    /* const { adminName, adminid, condoName, condoAddress, condoid } = this.state */
    const { history, match } = this.props
    return ( 
      <DashboardDiv>
        <TopBar 
          name={this.state.adminName} 
          history={history}
        />
        <LeftMenu />
        <MessagesArea />
        <Content 
          content={match.url} 
          data={this.state}
          handleChange={this.handleChange}
          addToDb={this.addToDatabase} />
      </DashboardDiv>
    )
  }
}

export default Dashboard
