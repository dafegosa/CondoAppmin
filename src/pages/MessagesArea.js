import React from "react";
import styled from "styled-components";
import { messages_data } from "../data/messages_data.js";
import { tickets_data } from "../data/tickets_data.js";

const ContenedorMensajes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-left: 80%;
  margin-top: 4.8%;
  background-color: rgba(96, 125, 139, 0.7);
  position: absolute;
  width: 20%;
  height: 90vh;
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
  /* grid-column: 2 / 2;
  grid-row: 4/ 4; */
  background-color: rgba(96, 125, 139, 1);
  position: relative;
  width: 90%;
  height: 12%;
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
        {tickets_data.map((tickets) => (
          <Message1>
            <h3> {tickets.title} </h3>
            <p>{tickets.body}</p>
          </Message1>
        ))}
        <p className="secction-title top-title">
          <strong>MENSAJES</strong>
        </p>
        {messages_data.map((messages) => (
          <Message1>
            <h3> {messages.title} </h3>
            <p>{messages.body}</p>
          </Message1>
        ))}
      </ContenedorMensajes>
    );
  }
}

export default MessagesArea;
