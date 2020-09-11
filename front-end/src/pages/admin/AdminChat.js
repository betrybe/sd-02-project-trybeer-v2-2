import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';

const ENDPOINT_ADMIN = 'http://localhost:5000/admin';
const socketAdmin = socketIOClient(ENDPOINT_ADMIN);

const submitForm = (e, value, clearInput) => {
  const ENDPOINT_CLIENT = 'http://localhost:5000/';
  const socketClient = socketIOClient(ENDPOINT_CLIENT);

  e.preventDefault();
  console.log('pre emit');
  const userData = JSON.parse(localStorage.getItem('user'));
  // socket.emit('handshake', userData);
  socketClient.emit('sentClientMessage', { message: value, userData });
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

const AdminChat = () => {
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
    socketAdmin.on('receivedClientMessage', (message) => {
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
      Chat Admin
      <div className="chatContainer">
        <MessageBox chat={chatMessages} />
        <div className="inputMessageContainer">
          <FormList />
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
