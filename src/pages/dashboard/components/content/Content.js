import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import ContentAddResident from './add-residents/ContentAddResident';
import ContentAddUnits from './add-units/ContentAddUnit';
import ContentAddCondos from './add-condo/ContentAddCondo';

const ContentDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  grid-area: 2 / 3 / 9 / 11;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  @media (max-width: 768px) {
    grid-area: 2 / 2 / 9 / 13;
  }
  @media (max-width: 500px) {
    grid-area: 2 / 1 / 13 / 9;
  }
`;
class Content extends React.Component {
  renderContent() {
    const { match, data, handleChange, addToDb } = this.props;
    const { adminid, condoName, condoAddress, condoid, message } = data;
    const condoData = {
      condoName,
      condoAddress,
      condoid,
      message,
    };
    const urlItems = match.url.split('/');
    switch (urlItems[2]) {
      case 'adduser':
        return <ContentAddResident addToDb={addToDb} />;
        break;
      case 'addunit':
        return <ContentAddUnits addToDb={addToDb} />;
        break;
      case 'addcondo':
        return (
          <ContentAddCondos
            adminid={adminid}
            condoData={condoData}
            addToDb={addToDb}
            handleChange={handleChange}
          />
        );
        break;

      default:
        return <h1>Bienvenido al Dashboard</h1>;
        break;
    }
  }

  render() {
    return <ContentDiv>{this.renderContent()}</ContentDiv>;
  }
}

export default withRouter(Content);
