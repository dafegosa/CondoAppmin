import React from "react";
import styled from "styled-components";
import { messagesData } from "../../../data/messagesData.js";
import { ticketsData } from "../../../data/ticketsData.js";

const MessageContainer = styled.div`
  grid-area: 2 / 11 / 9 / 13;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  background-color: rgba(96, 125, 139, 0.7);
  width: 100%;
  height: 100%;
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

const Message = styled.div`
  background-color: rgba(96, 125, 139, 1);
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
      <MessageContainer>
        <p className="secction-title top-title">
          <br />
          <strong>TICKETS</strong>
        </p>
        {ticketsData.map(
          (tickets) =>
            ticketsData && (
              <Message key={ticketsData.id}>
                <h3> {!!tickets.id && tickets.body && tickets.title} </h3>
                <p>{!!tickets.id && tickets.title && tickets.body}</p>
              </Message>
            )
        )}
        <p className="secction-title top-title">
          <strong>MENSAJES</strong>
        </p>
        {messagesData.map((messages) => (
          <Message key={messagesData.id}>
            <h3> {!!messages.id && messages.body && messages.title} </h3>
            <p>{!!messages.id && messages.title && messages.body}</p>
          </Message>
        ))}
      </MessageContainer>
    );
  }
}

export default MessagesArea;
