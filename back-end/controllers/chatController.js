const ChatService = require('../services/ChatService');

const clientAdminMessage = async (userData) => {
  const { email } = userData;
  const serviceAnswer = await ChatService.newOnlineUser(email);
  return serviceAnswer;
};

// const registerMessage = async (userEmail, message) => chatRegistration
//   .registerMessages(userEmail, message);

// const getMessages = rescue(async (req, res) => {
//   const { email } = req.user;
//   const messages = await chatRegistration.getMessages(email);
//   return res.status(200).send(messages);
// });

module.exports = {
  clientAdminMessage,
  // registerMessage,
  // getMessages,
};
