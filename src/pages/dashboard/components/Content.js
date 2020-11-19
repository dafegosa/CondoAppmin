import React from 'react'
import styled from 'styled-components'

const ContentDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  grid-area: 2 / 3 / 9 / 11;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-area: 2 / 2 / 13 / 11;

    @media (max-width: 500px) {
      grid-area: 2 / 1 / 13 / 9;
    }
  }
`
class Content extends React.Component {
  render() {
    return (
      <ContentDiv>
        <h1>Contenido de la página</h1>
      </ContentDiv>
    )
  }
}

export default Content
