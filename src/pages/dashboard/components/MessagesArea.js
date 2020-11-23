import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MessageContainer = styled.div`
  grid-area: 2 / 11 / 9 / 13;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  background-color: rgba(96, 125, 139, 0.7);
  .secction-title {
    color: rgba(255, 191, 91, 0.9);
  }
  .secction-title.top-title {
    height: 40px;
    width: 100%;
    padding-bottom: 10px;
    background-color: #ffbf5b;
    color: rgba(96, 125, 139, 1);
    text-align: center;
  }
  .secction-title.bottom-title {
  }
`;

const MessageInternContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    display: none;
  }
  margin: 0;
  background-color: rgba(96, 125, 139, 0.7);
`;

const Message = styled.div`
  background-color: rgba(96, 125, 139, 1);
  color: white;
  text-align: left;
  margin: 2px;
  &:hover {
    cursor:pointer; cursor: hand,
    margin-top: 0.5%;
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
  state = {
    tickets: [],
  };

  ticketRead = (e) => {
    console.log(e);
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
        <p className="secction-title top-title">
          <br />
          <strong>TICKETS</strong>
        </p>
        <MessageInternContainer>
          {!!this.state.tickets &&
            this.state.tickets.length > 0 &&
            this.state.tickets.map((tickets, indx) => (
              <Message onClick={this.ticketRead.bind(tickets._id)}>
                <h3 key={tickets._id}> {tickets.subject} </h3>
                <p key={tickets._id}>
                  {tickets.body.length > 35 &&
                    tickets.body.substring(0, 45) + ' ... '}
                </p>
              </Message>
            ))}
        </MessageInternContainer>
      </MessageContainer>
    );
  }
}

export default MessagesArea;
