import React from "react";
import styled from "styled-components";
import TopBar from "./components/TopBar";
import Content from "./components/Content";
import MessagesArea from "./components/MessagesArea";

export const DashboardDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`;

class Dashboard extends React.Component {
  render() {
    return (
      <DashboardDiv>
        <TopBar name={"Alejandro"} />
        <MessagesArea />
        <Content />
      </DashboardDiv>
    );
  }
}

export default Dashboard;
