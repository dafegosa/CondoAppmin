import React from "react";
/* import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom' */
import styled from "styled-components";
import TopBar from "./components/TopBar";
import Content from "./components/content/Content";
import MessagesArea from "./components/MessagesArea";

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

function Dashboard (props) {
return (
      <DashboardDiv>
        {console.log('Dashboard', props)}
        {console.log('Theme', props.theme)}
        <TopBar name={"Alejandro"} />
        <MessagesArea />
        <Content content={props.match.url}/>
      </DashboardDiv>
    )
}

export default Dashboard;
