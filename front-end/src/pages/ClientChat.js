import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';
import { MessageBox, ListItem } from './admin/AdminChat';
import './Chat.css';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);
const userData = JSON.parse(localStorage.getItem('user'));

const submitClientForm = (e, value, clearInput) => {
  e.preventDefault();
  socket.emit('sentClientMessage', { message: value, userData });
  clearInput('');
};

const ClientFormList = () => {
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
          onClick={(e) => submitClientForm(e, inputValue, setInputValue)}
        >
          Send
        </button>
      </div>
    </form>
  );
};

const ClientChat = () => {
  const [chatMessages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('connected', userData);
    socket.on('receivedClientMessage', (message) => {
      setMessages((state) => [...state, message]);
    });
  }, []);

  return (
    <div className="firstContainer">
      ChatClient
      <div className="chatContainer">
        <MessageBox chat={chatMessages} />
        <div className="inputMessageContainer">
          <ClientFormList />
        </div>
      </div>
    </div>
  );
};

export default ClientChat;

ListItem.propTypes = {
  value: PropTypes.string.isRequired,
};

MessageBox.propTypes = {
  chat: PropTypes.instanceOf(Object).isRequired,
};
