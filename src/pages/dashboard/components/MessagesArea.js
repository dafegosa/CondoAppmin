import React from "react";
import styled from "styled-components";

const ContenedorMensajes = styled.div`
  display: grid;
  grid-template-columns: 5% 90% 5%;
  grid-template-rows: 6% 2% 2% 12% 1% 12% 1% 12% 4% 2% 2% 12% 1% 12% 1% 12% 2% 4%;
  margin-left: 80%;
  margin-top: 4%;
  background-color: rgba(96, 125, 139, 0.7);
  position: absolute;
  width: 20%;
  height: 91.5vh;
  .secction-title {
    color: rgba(255, 191, 91, 0.9);
  }
  .secction-title.top-title {
    grid-column: 2 / 2;
    grid-row: 2/ 2;
  }
  .secction-title.bottom-title {
    grid-column: 2 / 2;
    grid-row: 10/ 10;
  }
`;

const Message1 = styled.div`
  grid-column: 2 / 2;
  grid-row: 4/ 4;
  background-color: rgba(96, 125, 139, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 1px 8px 0px white;
  text-align: justify;
  &:hover {
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
    h3 {
      color: #d6d6d2;
    }
    p {
      color: white;
    }
  }
  h3 {
    margin: 2%;
  }
  p {
    font-size: 12.5px;
    color: #d6d6d2;
    margin: 2% 6%;
    line-height: 1.2;
  }
`;

const Message2 = styled.div`
  grid-column: 2 / 2;
  grid-row: 6 / 6;
  background-color: rgba(96, 125, 139, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 1px 8px 0px white;
  text-align: justify;
  &:hover {
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
    h3 {
      color: #d6d6d2;
    }
    p {
      color: white;
    }
  }
  h3 {
    margin: 2%;
  }
  p {
    font-size: 12.5px;
    color: #d6d6d2;
    margin: 2% 6%;
    line-height: 1.2;
  }
`;

const Message3 = styled.div`
  grid-column: 2 / 2;
  grid-row: 8 / 8;
  background-color: rgba(96, 125, 139, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 1px 8px 0px white;
  text-align: justify;
  &:hover {
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
    h3 {
      color: #d6d6d2;
    }
    p {
      color: white;
    }
  }
  h3 {
    margin: 2%;
  }
  p {
    font-size: 12.5px;
    color: #d6d6d2;
    margin: 2% 6%;
    line-height: 1.2;
  }
`;

const Message4 = styled.div`
  grid-column: 2 / 2;
  grid-row: 12 / 12;
  background-color: rgba(96, 125, 139, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 1px 8px 0px white;
  color: white;
  text-align: justify;
  &:hover {
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
    h3 {
      color: #d6d6d2;
    }
    p {
      color: white;
    }
  }
  h3 {
    margin: 2%;
  }
  p {
    font-size: 12.5px;
    color: #d6d6d2;
    margin: 2% 6%;
    line-height: 1.2;
  }
`;

const Message5 = styled.div`
  grid-column: 2 / 2;
  grid-row: 14 / 14;
  background-color: rgba(96, 125, 139, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 1px 8px 0px white;
  text-align: justify;
  &:hover {
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
    h3 {
      color: #d6d6d2;
    }
    p {
      color: white;
    }
  }
  h3 {
    margin: 2%;
  }
  p {
    font-size: 12.5px;
    color: #d6d6d2;
    margin: 2% 6%;
    line-height: 1.2;
  }
`;

const Message6 = styled.div`
  grid-column: 2 / 2;
  grid-row: 16 / 16;
  background-color: rgba(96, 125, 139, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 1px 8px 0px white;
  text-align: justify;
  &:hover {
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
    h3 {
      color: #d6d6d2;
    }
    p {
      color: white;
    }
  }
  h3 {
    margin: 2%;
  }
  p {
    font-size: 12.5px;
    color: #d6d6d2;
    margin: 2% 6%;
    line-height: 1.2;
  }
`;

class MessagesArea extends React.Component {
  render() {
    return (
      <ContenedorMensajes>
        <p className="secction-title top-title">
          <strong>TICKETS</strong>
        </p>
        <Message1>
          <h3>204-T5 (1524-45-4)</h3>
          <p>
            Solicito el equipo de mantenimiento ya hay humedad en una pared.
          </p>
        </Message1>
        <Message2>
          <h3>301-T6 (1654-84-1)</h3>
          <p>
            Hay un mal olor en toda la torre y proviene del shuy de basura.
            Solicito que revisen y hagan limpieza ...
          </p>
        </Message2>
        <Message3>
          <h3>101-T2 (1654-84-1)</h3>
          <p>
            He solicitado en reiteradas ocaciones que arreglen el parque delos
            niños. Mis hijos van a jugar y no puede...
          </p>
        </Message3>
        <p className="secction-title bottom-title">
          <strong>MENSAJES</strong>
        </p>
        <Message4>
          <h3>Título</h3>
          <p>Mensaje</p>
        </Message4>
        <Message5>
          <h3>Título</h3>
          <p>Mensaje</p>
        </Message5>
        <Message6>
          <h3>Título</h3>
          <p>Mensaje</p>
        </Message6>
      </ContenedorMensajes>
    );
  }
}

export default MessagesArea;
