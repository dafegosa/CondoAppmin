import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MessageContainer = styled.div`
  grid-area: 2 / 3 / 9 / 11;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffbf5b;
    border-radius: 4px;
  }
  .secction-title {
    color: rgba(255, 191, 91, 0.9);
  }
`;

const Message = styled.div`
  color: black;
  border-bottom: solid 1px rgba(96, 125, 139, 1);
  text-align: left;
  width: 100%;

  &:hover {
    margin-top: 0.5%;
    box-shadow: -2px 7px 8px 0px rgba(255, 191, 91, 0.9);
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
      .get('http://localhost:8080/ticket', { url: '/MessagesList' })
      .then((list) => {
        this.setState({
          tickets: list.data.data,
        });
      })
      .catch((err) => {});
  }

  render() {
    return (
      <MessageContainer>
        {!!this.state.tickets &&
          this.state.tickets.length > 0 &&
          this.state.tickets.map((tickets) => (
            <Message key={tickets.id}>
              <h3> {tickets.subject} </h3>
              <p>
                {tickets.body.length > 35 &&
                  tickets.body.substring(0, 255) + ' ... '}
              </p>
            </Message>
          ))}
      </MessageContainer>
    );
  }
}

export default MessagesArea;
