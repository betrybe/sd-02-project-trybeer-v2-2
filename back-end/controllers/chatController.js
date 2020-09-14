const rescue = require('express-rescue');
const ChatService = require('../services/ChatService');

const clientAdminMessage = rescue(async (req, res) => {
  const { message, userData: { email } } = req.body;
  await ChatService.clientAdminMessage(message, email);
  return res.status(200).end();
});

const adminClientMessage = rescue(async (req, res) => {
  const { message, emailClient } = req.body;
  await ChatService.adminClientMessage(message, emailClient);
  return res.status(200).end();
});

// const registerMessage = async (userEmail, message) => chatRegistration
//   .registerMessages(userEmail, message);

// const getMessages = rescue(async (req, res) => {
//   const { email } = req.user;
//   const messages = await chatRegistration.getMessages(email);
//   return res.status(200).send(messages);
// });

module.exports = {
  clientAdminMessage,
  adminClientMessage,
  // registerMessage,
  // getMessages,
};
