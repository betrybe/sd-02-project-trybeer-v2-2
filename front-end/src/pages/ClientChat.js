import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import PropTypes from 'prop-types';
import { MessageBox, ListItem } from './admin/AdminChat';
import checkLogin from '../services/checkLogin';
import './Chat.css';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);
const userData = JSON.parse(localStorage.getItem('user'));
const token = checkLogin();

const clientPostMessage = async (value) => axios({
  baseURL: 'http://localhost:3001/users/chat',
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  },
  data: { message: value, userData },
});

const submitClientForm = async (e, value, clearInput) => {
  e.preventDefault();
  await clientPostMessage(value);
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
