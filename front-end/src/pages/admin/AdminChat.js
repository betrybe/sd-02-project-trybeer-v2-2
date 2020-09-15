import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import PropTypes from 'prop-types';
import checkLogin from '../../services/checkLogin';
import AdminSideBar from '../../components/admin/AdminSideBar';

const ENDPOINT_CLIENT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT_CLIENT);
const userData = JSON.parse(localStorage.getItem('user'));
const token = checkLogin();
const keyStamp = () => Date.now();

const adminSubmitForm = async (e, value, clearInput, emailClient) => {
  e.preventDefault();
  await axios({
    baseURL: 'http://localhost:3001/users/admin/chat',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: { message: value, emailClient },
  });
  socket.emit('receivedMsg', { message: value, userData, emailClient });
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

const AdminChat = ({ location: { state: { email } } }) => {
  const [chatMessages, setChatMessages] = useState([]);

  socket.on(`${email}client`, (message) => {
    setChatMessages([...chatMessages, message]);
  });

  return (
    <div className="firstContainer">
      <AdminSideBar />
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

AdminChat.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
};
