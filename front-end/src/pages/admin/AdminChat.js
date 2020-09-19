import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import checkLogin from '../../services/checkLogin';
import AdminSideBar from '../../components/admin/AdminSideBar';

const ENDPOINT_CLIENT = 'http://localhost:5000/';
const socket = socketIOClient(ENDPOINT_CLIENT);
const userData = JSON.parse(localStorage.getItem('user'));
const keyStamp = () => Date.now();

export const requestChats = async (history) => {
  const token = checkLogin(history);
  const { data } = await axios({
    baseURL: 'http://localhost:3001/users/chat',
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return data;
};

const adminSubmitForm = async (e, value, clearInput, emailClient, history) => {
  const token = checkLogin(history);
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

export const MessageBox = ({ chat, chatHistory }) => (
  <div className="messagesBox">
    <ul>
      {
        (chatHistory.length === 0)
        || chatHistory.messages.map(({ sentMessage, chatName, time }) => (
          <ListItem
            key={`${sentMessage}${keyStamp() * Math.random()}`}
            value={`${new Date(time).toLocaleTimeString([], { timeStyle: 'short' })} - ${chatName}: ${sentMessage}`}
          />
        ))
      }
    </ul>
    <ul id="message">
      {
        chat.map((message) => (
          <ListItem
            key={`${message}${keyStamp() * Math.random()}`}
            value={`${new Date().toLocaleTimeString([], { timeStyle: 'short' })} - ${message}`}
          />
        ))
      }
    </ul>
  </div>
);

export const FormList = ({ emailClient, history }) => {
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
          onClick={(e) => adminSubmitForm(e, inputValue, setInputValue, emailClient, history)}
        >
          Send
        </button>
      </div>
    </form>
  );
};

const AdminChat = ({ location: { state: { email } }, history }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.on(`${email}client`, (message) => {
      setChatMessages((state) => [...state, message]);
    });
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      const allChats = await requestChats(history);
      setChats(allChats.find(({ email: emailChat }) => email === emailChat));
    };
    fetchChats();
  }, []);

  console.log(chatMessages);

  return (
    <div className="firstContainer">
      <AdminSideBar />
      <div className="chatContainer">
        <Link to="/admin/chats">
          {`Setinha  Coversando com ${email}`}
        </Link>
        <MessageBox chat={chatMessages} chatHistory={chats} />
        <div className="inputMessageContainer">
          <FormList emailClient={email} history={history} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(AdminChat);

ListItem.propTypes = {
  value: PropTypes.string.isRequired,
};

MessageBox.propTypes = {
  chat: PropTypes.instanceOf(Object).isRequired,
  chatHistory: PropTypes.instanceOf(Array).isRequired,
};

FormList.propTypes = {
  emailClient: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

AdminChat.defaultProps = {
  state: {},
};

AdminChat.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  state: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired,
};
