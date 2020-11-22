import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { messagesData } from '../../../data/messagesData.js';
// import { ticketsData } from '../../../data/ticketsData.js';

const MessageContainer = styled.div`
  grid-area: 2 / 3 / 9 / 11;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 10px;
  overflow-y: scroll;
  .secction-title {
    color: rgba(255, 191, 91, 0.9);
  }
`;

const Message = styled.div`
  /* background-color: rgba(96, 125, 139, 1); */
  color: black;
  /* box-shadow: 0px 1px 8px 0px white; */
  border-bottom: solid 1px rgba(96, 125, 139, 1);
  text-align: left;
  width: 100%;

  &:hover {
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
    h3 {
      /* color: #d6d6d2; */
    }
    p {
      /* color: white; */
    }
  }
  h3 {
    margin: 2%;
  }
  p {
    font-size: 12.5px;
    color: black;
    margin: 2% 6%;
    line-height: 1.2;
  }
`;

class MessagesArea extends React.Component {
  state = {
    tickets: [],
  };
  componentDidMount() {
    axios
      .get('http://localhost:8080/ticket')
      .then((list) => {
        console.log(list.data.data);
        this.setState({
          tickets: list.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <MessageContainer>
        {!!this.state.tickets &&
          this.state.tickets.length > 0 &&
          this.state.tickets.map((tickets) => (
            <Message>
              <h3 key={tickets.subject}> {tickets.subject} </h3>
              <p key={tickets.id}>
                {tickets.body.length > 35 &&
                  tickets.body.substring(0, 255) + ' ... '}
              </p>
            </Message>
          ))}
        {/* {!!messagesData &&
          messagesData.length > 0 &&
          messagesData.map((messages) => (
            <Message>
              <h3 key={messages.title}> {messages.title} </h3>
              <p key={messages.id}>
                {messages.body.length > 35 &&
                  messages.body.substring(0, 255) + '...'}
              </p>
            </Message>
          ))} */}
      </MessageContainer>
    );
  }
}

export default MessagesArea;
