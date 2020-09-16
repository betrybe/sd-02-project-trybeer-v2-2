import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MessageBox, ListItem } from './admin/AdminChat';
import checkLogin from '../services/checkLogin';
import './Chat.css';

const ENDPOINT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT);

const clientPostMessage = async (value, history, userData) => {
  const token = checkLogin(history);

  return axios({
    baseURL: 'http://localhost:3001/users/chat',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: { message: value, userData },
  });
};

const submitClientForm = async (e, value, clearInput, history, userData) => {
  e.preventDefault();
  await clientPostMessage(value, history, userData);
  socket.emit('receivedMsg', { message: value, userData });
  clearInput('');
};

const ClientFormList = ({ history, userData }) => {
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
          onClick={(e) => submitClientForm(e, inputValue, setInputValue, history, userData)}
        >
          Send
        </button>
      </div>
    </form>
  );
};

const ClientChat = ({ history }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    socket.on(`${userData.email}client`, (message) => {
      setChatMessages((state) => [...state, message]);
    });
  }, []);

  return (
    <div className="firstContainer">
      <div className="chatContainer">
        <MessageBox chat={chatMessages} />
        <div className="inputMessageContainer">
          <ClientFormList history={history} userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(ClientChat);

ListItem.propTypes = {
  value: PropTypes.string.isRequired,
};

MessageBox.propTypes = {
  chat: PropTypes.instanceOf(Object).isRequired,
};

ClientFormList.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  userData: PropTypes.instanceOf(Object).isRequired,
};

ClientChat.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
