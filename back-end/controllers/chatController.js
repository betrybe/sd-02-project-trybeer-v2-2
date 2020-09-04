const rescue = require('express-rescue');
const chatRegistration = require('../mongoModel/chatRegistration');

const registerMessage = async (userEmail, message) => {
  const registered = await chatRegistration.registerMessages(userEmail, message);
};

module.exports = {
  registerMessage,
};
