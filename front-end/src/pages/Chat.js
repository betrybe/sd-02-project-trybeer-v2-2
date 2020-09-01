import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';
import './Chat.css';

const ENDPOINT = 'http://localhost:5000';
const socket = socketIOClient(ENDPOINT);

const submitForm = (e, value, clearInput) => {
  e.preventDefault();
  socket.emit('message', value);
  clearInput('');
};

const ListItem = ({ keyIndex, value }) => (
  <li key={`${value}${keyIndex}`}>{value}</li>
);

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((state) => [...state, msg]);
    });
  }, []);

  return (
    <div className="firstContainer">
      <div className="chatContainer">
        <div className="messagesBox">
          <ul id="message">
            {
            messages.map((message, index) => <ListItem key={`${message}${index}`} keyIndex={index} value={message} />)
          }
          </ul>
        </div>
        <div className="inputMessageContainer">
          <form action="">
            <div className="containerInput">
              <input className="messageInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </div>
            <div className="buttonContainer">
              <button type="button" onClick={(e) => submitForm(e, inputValue, setInputValue)}>Send</button>
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
