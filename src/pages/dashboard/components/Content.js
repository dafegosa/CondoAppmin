import React from 'react'
import styled from 'styled-components'

const ContentDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  width: 70vw;
  height: 100vh;

`

class Content extends React.Component {
  render () {
    return (
      <ContentDiv>

      </ContentDiv>
    )
  }
}

export default Content