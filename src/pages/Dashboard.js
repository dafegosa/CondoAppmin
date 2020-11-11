import React from 'react'
import styled from 'styled-components';


export const DashboardDiv = styled.div`
    border: 1px solid red;
    box-sizing: border-box;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
`;


class Dashboard extends React.Component {

    render () {
        return (
         <DashboardDiv>
             <h1>Dashboard</h1>
         </DashboardDiv>
        );
    }
}

export default Dashboard;
