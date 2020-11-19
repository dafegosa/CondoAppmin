import React from 'react';
import styled from 'styled-components';
import { messagesData } from '../../../data/messagesData.js';
import { ticketsData } from '../../../data/ticketsData.js';

let lastThreeMessages = [];
let unreadMessages = [];

const MessageContainer = styled.div`
  grid-area: 2 / 11 / 9 / 13;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  margin: 0;
  background-color: rgba(96, 125, 139, 0.7);
  .secction-title {
    color: rgba(255, 191, 91, 0.9);
  }
  .secction-title.top-title {
    height: 40px;
    width: 100%;
    background-color: #ffbf5b;
    color: rgba(96, 125, 139, 1);
    text-align: center;
  }
  .secction-title.bottom-title {
  }
`;

const Message = styled.div`
  background-color: rgba(96, 125, 139, 1);
  /* border-radius: 10px; */
  color: white;
  /* box-shadow: 0px 1px 8px 0px white; */
  text-align: left;
  margin: 2px;
  &:hover {
    cursor:pointer; cursor: hand,
    margin-top: 0.5%;
    /* box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9); */
    box-shadow: 0px 1px 8px 0px white;
    h3 {
      color: rgba(255, 191, 91, 0.9);
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
  ReadMessage = (e) => {
    console.log(e);
    // this.e.read = true;
  };

  render() {
    unreadMessages = ticketsData.filter(
      (messageUnread) => messageUnread.read === false
    );
    lastThreeMessages = ticketsData.slice(
      ticketsData.length - 8,
      ticketsData.length
    );
    console.log(lastThreeMessages);
    return (
      <MessageContainer>
        <p className="secction-title top-title">
          <br />
          <strong>TICKETS</strong>
        </p>
        {!!lastThreeMessages &&
          lastThreeMessages.length > 0 &&
          lastThreeMessages.map((tickets, indx) => (
            <Message onClick={this.ReadMessage.bind(this.indx)}>
              <h3 key={tickets.title}> {tickets.title} </h3>
              <p key={tickets.id}>
                {tickets.body.length > 35 &&
                  tickets.body.substring(0, 45) + ' ... '}
              </p>
            </Message>
          ))}
        {/* <p className="secction-title top-title">
          <strong>MENSAJES</strong>
        </p>
        {!!messagesData &&
          messagesData.length > 0 &&
          messagesData.map((messages) => (
            <Message>
              <h3 key={messages.title}> {messages.title} </h3>
              <p key={messages.id}>
                {messages.body.length > 60 &&
                  messages.body.substring(0, 45) + '...'}
              </p>
            </Message>
          ))} */}
      </MessageContainer>
    );
  }
}

export default MessagesArea;
