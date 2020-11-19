import React from 'react';
import styled from 'styled-components';
import TopBar from './components/TopBar';
import Content from './components/Content';
import MessagesArea from './components/MessagesArea';
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
  render() {
    return (
      <DashboardDiv>
        <TopBar name={'Alejandro'} />
        <MessagesArea />
        <Content />
      </DashboardDiv>
    );
  }
}

export default Dashboard;
