import React from "react";
import styled from "styled-components";
import { messages_data } from "../data/messages_data.js";
import { tickets_data } from "../data/tickets_data.js";

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
          <h3>{tickets_data[0].title}</h3>
          <p>{tickets_data[0].body}</p>
        </Message1>
        <Message2>
          <h3>{tickets_data[1].title}</h3>
          <p>{tickets_data[1].body}</p>
        </Message2>
        <Message3>
          <h3>{tickets_data[2].title}</h3>
          <p>{tickets_data[2].body}</p>
        </Message3>
        <p className="secction-title bottom-title">
          <strong>MENSAJES</strong>
        </p>
        <Message4>
          <h3>{messages_data[0].title}</h3>
          <p>{messages_data[0].body}</p>
        </Message4>
        <Message5>
          <h3>{messages_data[1].title}</h3>
          <p>{messages_data[1].body}</p>
        </Message5>
        <Message6>
          <h3>{messages_data[2].title}</h3>
          <p>{messages_data[2].body}</p>
        </Message6>
      </ContenedorMensajes>
    );
  }
}

export default MessagesArea;
