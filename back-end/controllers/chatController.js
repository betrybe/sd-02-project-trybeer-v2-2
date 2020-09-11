const rescue = require('express-rescue');
const ChatService = require('../services/ChatService');

const newOnlineUser = rescue(async (req, res, next) => {
  const {
    id, name, email, role,
  } = req.user;
  const serviceAnswer = await ChatService.newOnlineUser(id, name, email, role);
  if (serviceAnswer.error) return next(serviceAnswer);
  return res.status(200).json(serviceAnswer);
});

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
