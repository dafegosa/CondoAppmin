import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  #loader {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99999;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    );
  }

  .message {
    position: relative;
    font-size: 150%;
    top: 50%;
    left: 50%;
    transform: translateX(-10%);
    color: #fff;
    letter-spacing: 1px;
  }

  .loader-open {
    overflow: hidden;
  }
`
const Loader = (props) => {
  const [node] = useState(document.createElement('div'))
  const loader = document.querySelector('#loader')

  useEffect(() => {
    loader.appendChild(node).classList.add('message')
  }, [loader, node])

  useEffect(() => {
    if (props.show) {
      loader.classList.remove('hide')
      document.body.classList.add('loader-open')
    } else {
      loader.classList.add('hide')
      document.body.classList.remove('loader-open')
    }
  }, [loader, props.show])

  return (
    <Container>
      <div id='loader'>
        <div className='loader-open  message'>Cargando...</div>
      </div>
    </Container>
  )
}

export default Loader
