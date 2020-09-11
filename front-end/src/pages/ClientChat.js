import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';
import './Chat.css';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);
const userData = JSON.parse(localStorage.getItem('user'));

const submitForm = (e, value, clearInput) => {
  e.preventDefault();
  console.log('pre emit');
  // socket.emit('handshake', userData);
  socket.emit('sentClientMessage', { message: value, userData });
  clearInput('');
};

const ListItem = ({ value }) => (
  <li>{value}</li>
);

const MessageBox = ({ chat }) => (
  <div className="messagesBox">
    <ul id="message">
      {
        chat.map((message, index) => (
          <ListItem
            key={`${message}-${index}`}
            value={message}
          />
        ))
      }
    </ul>
  </div>
);

const FormList = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <form action="">
      <div className="containerInput">
        <input
          className="messageInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="buttonContainer">
        <button
          type="submit"
          onClick={(e) => submitForm(e, inputValue, setInputValue)}
        >
          Send
        </button>
      </div>
    </form>
  );
};

const ClientChat = () => {
  const [chatMessages, setMessages] = useState([]);
  // socket.on('receivedClientMessage', (message) => {
  //   console.log('msg front', message);
  //   setMessages((state) => [...state, message]);
  // });
  // useEffect(() => {
  //   const { email, token } = JSON.parse(localStorage.getItem('user'));
  //   const fetchMessages = async () => axios({
  //     method: 'get',
  //     url: `http://localhost:3001/messages/${email}`,
  //     headers: { Authorization: token },
  //   })
  //     .then(({ data: newMessages }) => setMessages(newMessages));

  //   socket.on('connect', (sentMessages) => {
  //     fetchMessages(sentMessages);
  //   });
  // }, [chatMessages]);

  useEffect(() => {
    socket.emit('connected', userData);
    socket.on('receivedClientMessage', (message) => {
      console.log('msg front', message);
      setMessages((state) => [...state, message]);
    });
  }, []);

  // useEffect(() => {
  //   socket.on('connect', (message) => {
  //     setMessages((state) => [...state, message]);
  //   });
  // }, []);

  return (
    <div className="firstContainer">
      ChatClient
      <div className="chatContainer">
        <MessageBox chat={chatMessages} />
        <div className="inputMessageContainer">
          <FormList />
        </div>
      </div>
    </div>
  );
};

export default ClientChat;

ListItem.propTypes = {
  // keyIndex: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

MessageBox.propTypes = {
  chat: PropTypes.instanceOf(Object).isRequired,
};
