import React from 'react'
import styled from 'styled-components'
import ContentAddResident from "./add-residents/ContentAddResident"
import ContentAddUnits from "./add-units/ContentAddUnit"
import ContentAddCondos from "./add-condo/ContentAddCondo"

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
`
class Content extends React.Component {
  renderContent () {
    const urlItems = this.props.content.split('/')
    
    switch (urlItems[2]) {
      case 'adduser':
        return <ContentAddResident />
        break;
      case 'addunit':
        return <ContentAddUnits />
        break;
      case 'addcondo':
        return <ContentAddCondos />
        break;
    
      default:
        return <h1>Bienvenido al Dashboard</h1>
        break;
    }
  }

  render () {
    return (
      <ContentDiv>
        {/* {this.props.content.split('/')[2] === 'adduser' ? (
          <ContentAddResident />
        ) : (<h1>Bienvenido al Dashboard</h1>)} */}
        {this.renderContent()}
      </ContentDiv>
    )
  }
}

export default Content