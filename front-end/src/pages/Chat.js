import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';
import './Chat.css';

const ENDPOINT = 'http://localhost:5000';
const socket = socketIOClient(ENDPOINT);

const submitForm = (e, value, clearInput) => {
  e.preventDefault();
  const userData = JSON.parse(localStorage.getItem('user'));
  socket.emit('handshake', userData)
  socket.emit('message', value);
  clearInput('');
};

const ListItem = ({ keyIndex, value }) => (
  <li key={`${value}${keyIndex}`}>{value}</li>
);

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setMessages] = useState([]);

  useEffect(() => {
    const { email, token } = JSON.parse(localStorage.getItem('user'))
    const fetchMessages = async(sentMessages) => await axios({
      method: 'get',
      url: `http://localhost:3001/messages/${email}`,
      headers: { Authorization: token}
    })
      .then(({ data: newMessages }) => {
        return setMessages(newMessages);
      })
      .catch((err) => {
        throw new Error(err.message, err.status);
      })

    socket.on('connect', (sentMessages) => {
      fetchMessages(sentMessages);
    });
  }, [chatMessages])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((state) => [...state, message]);
    })
  }, [])

  return (
    <div className="firstContainer">
    <div className="chatContainer">
      <div className="messagesBox">
        <ul id="message">
          {
            chatMessages.map((message, index) => <ListItem key={`${message}${index}`} keyIndex={index} value={message}/>)
          }
        </ul>
      </div>
      <div className="inputMessageContainer">
        <form action="">
          <div className="containerInput">
            <input className="messageInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </div>
          <div className="buttonContainer">
            <button onClick={(e) => submitForm(e, inputValue, setInputValue)}>Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Chat;

ListItem.propTypes = {
  keyIndex: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};
