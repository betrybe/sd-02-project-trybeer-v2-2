const express = require('express');
const http = require('http').createServer(express());
const sockets = require('socket.io')(http);
const ChatService = require('../services/ChatService');

const newOnlineUser = async (userData, socketId) => {
  const { email } = userData;
  const serviceAnswer = await ChatService.newOnlineUser(email);
  if (serviceAnswer.error) return next(serviceAnswer);
  return res.status(200).json(serviceAnswer);
};

// const registerMessage = async (userEmail, message) => chatRegistration
//   .registerMessages(userEmail, message);

// const getMessages = rescue(async (req, res) => {
//   const { email } = req.user;
//   const messages = await chatRegistration.getMessages(email);
//   return res.status(200).send(messages);
// });

module.exports = {
  newOnlineUser,
  // registerMessage,
  // getMessages,
};
