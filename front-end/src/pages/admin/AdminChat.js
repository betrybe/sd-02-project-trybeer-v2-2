import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import PropTypes from 'prop-types';
import checkLogin from '../../services/checkLogin';

const ENDPOINT_ADMIN = 'http://localhost:5000/admin';
const ENDPOINT_CLIENT = 'http://localhost:5000/';
const socketAdmin = socketIOClient(ENDPOINT_ADMIN);
const socketClient = socketIOClient(ENDPOINT_CLIENT);
const userData = JSON.parse(localStorage.getItem('user'));
const token = checkLogin();
const keyStamp = () => Date.now();

const adminSubmitForm = async (e, value, clearInput, emailClient) => {
  e.preventDefault();
  const requestAnswer = await axios({
    baseURL: 'http://localhost:3001/users/admin/chat',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: { message: value, userData, emailClient },
  });
  console.log(requestAnswer);
  socketClient.emit('sentClientMessage', { message: value, userData, emailClient });
  clearInput('');
};

export const ListItem = ({ value }) => (
  <li>{value}</li>
);

export const MessageBox = ({ chat }) => (
  <div className="messagesBox">
    <ul id="message">
      {
        chat.map((message) => (
          <ListItem
            key={`${message}${keyStamp()}`}
            value={message}
          />
        ))
      }
    </ul>
  </div>
);

export const FormList = ({ emailClient }) => {
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
          onClick={(e) => adminSubmitForm(e, inputValue, setInputValue, emailClient)}
        >
          Send
        </button>
      </div>
    </form>
  );
};

const AdminChat = ({ email = 'cliente@cliente.com' }) => {
  const [chatMessages, setMessages] = useState([]);

  useEffect(() => {
    socketAdmin.on('receivedClientMessage', (message) => {
      setMessages((state) => [...state, message]);
    });
  }, []);

  return (
    <div className="firstContainer">

      Chat Admin
      <div className="chatContainer">
        <MessageBox chat={chatMessages} />
        <div className="inputMessageContainer">
          <FormList emailClient={email} />
        </div>
      </div>
    </div>
  );
};

export default AdminChat;

ListItem.propTypes = {
  // keyIndex: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

MessageBox.propTypes = {
  chat: PropTypes.instanceOf(Object).isRequired,
};

FormList.propTypes = {
  emailClient: PropTypes.string.isRequired,
};

AdminChat.defaultProps = {
  email: 'cliente@cliente.com',
};

AdminChat.propTypes = {
  email: PropTypes.string,
};
