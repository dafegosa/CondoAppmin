import React from 'react';
import styled from 'styled-components';
import TopBar from './components/TopBar';
import Content from './components/content/Content';
import MessagesArea from './components/MessagesArea';
import LeftMenu from './components/LeftMenu';
import axios from 'axios';

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
`;

class Dashboard extends React.Component {
  state = {
    adminName: '',

    condoName: '',
    condoAddress: '',
    
    unitName: '',

    
    resName: '',
    resLastname: '',
    resIdNumber: '',
    resPhone: '',
    resEmail: '',
    resPassword: '',
    resUnit: '',

    adminid: '',
    condoid: '',
    message: '',
  } 
  
  async componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: '/admin',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      this.setState({ adminName: data.name, adminid: data.id })

    } catch(err) {
      
      localStorage.removeItem('token')
      this.props.history.push('/login')
      
    }
  }
  handleChange = (e) => {

    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
  addToDatabase = (endpoint, statePart) => async (e) => {

    
    e.preventDefault()
    let toPost = {}
    
    switch (endpoint) {
      case 'condo':
        const { condoName, condoAddress } = this.state;
        toPost = {
          ...statePart,
          name: condoName,
          address: condoAddress,
        };
        break;
      case 'unit':

        const { unitName, condoid } = this.state
        toPost = {
          ...statePart,
          name: unitName,
          condoId: condoid
        }
        break;
      case 'resident':
        const { resName, resLastname, resIdNumber, resPhone, resEmail, resPassword, resUnit } = this.state
        toPost = {
          ...statePart,
          name: resName,
          lastName: resLastname,
          idNumber: resIdNumber,
          phone: resPhone,
          email: resEmail,
          password: resPassword,
          unitId: resUnit
        }

        break;

      default:
        break;
    }

    try {
      const token = localStorage.getItem('token')
      const { data, message } = await axios({
        method: 'POST',
        baseURL: 'http://localhost:8000',
        url: `/${endpoint}`,
        data: toPost,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (endpoint === 'condo') {
        this.setState({...this.state, condoid: data.data._id, message: message})
      } else {
        this.setState({...this.state, message: data.message})
      }
    }
  };

  render() {
    return (
      <DashboardDiv>
        <TopBar name={this.state.adminName} />
        <LeftMenu />
        <MessagesArea />
        <Content
          data={this.state}
          handleChange={this.handleChange}
          addToDb={this.addToDatabase}
        />
      </DashboardDiv>
    );
  }
}

export default Dashboard;
