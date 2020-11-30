import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import ContentAddResident from './add-residents/ContentAddResident';
import ContentAddUnits from './add-units/ContentAddUnit';
import ContentAddCondos from './add-condo/ContentAddCondo';
import ContentMessages from './allMessages/CentralMessagesList';
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
    const {
      adminid,
      condoName,
      condoAddress,
      condoid,
      unitName,
      message,
      resName,
      resLastname,
      resIdNumber,
      resPhone,
      resEmail,
      resPassword,
      resUnit,
    } = data;
    const condoData = {
      condoName,
      condoAddress,
      condoid,
      message,
    };
    const unitData = {
      unitName,
      message,
    };
    const resData = {
      resName,
      resLastname,
      resIdNumber,
      resPhone,
      resEmail,
      resPassword,
      resUnit,
      condoid,
      message,
    };
    const urlItems = match.url.split('/');
    switch (urlItems[2]) {
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
      case 'addunit':
        return (
          <ContentAddUnits
            condoid={condoid}
            unitData={unitData}
            addToDb={addToDb}
            handleChange={handleChange}
          />
        );
        break;
      case 'adduser':
        return (
          <ContentAddResident
            resData={resData}
            addToDb={addToDb}
            handleChange={handleChange}
          />
        );
        break;
      case 'messages':
        return <ContentMessages addToDb={addToDb} />;
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
