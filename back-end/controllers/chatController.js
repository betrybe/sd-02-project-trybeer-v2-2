const rescue = require('express-rescue');
const chatRegistration = require('../mongoModel/chatRegistration');

const registerMessage = async (userEmail, message) => chatRegistration
  .registerMessages(userEmail, message);

const getMessages = rescue(async (req, res) => {
  const { email } = req.user;
  const messages = await chatRegistration.getMessages(email);
  return res.status(200).send(messages);
});

module.exports = {
  registerMessage,
  getMessages,
};
