import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';

const ENDPOINT_ADMIN = 'http://localhost:5000/admin';
const socketAdmin = socketIOClient(ENDPOINT_ADMIN);

const submitForm = (e, value, clearInput, emailClient) => {
  const ENDPOINT_CLIENT = 'http://localhost:5000/';
  const socketClient = socketIOClient(ENDPOINT_CLIENT);

  e.preventDefault();
  const userData = JSON.parse(localStorage.getItem('user'));
  // socket.emit('handshake', userData);
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
            key={`${message}${chat.length}`}
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
          onClick={(e) => submitForm(e, inputValue, setInputValue, emailClient)}
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
