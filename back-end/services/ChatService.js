const ChatModel = require('../mongoModels/ChatModel');

const errorMsgNotSaved = { error: true, message: 'Message not saved', code: 'bad_request' };

const clientAdminMessage = async (message, email) => {
  const existEmail = await ChatModel.emailSchemaExist(email);
  if (!existEmail) {
    return ChatModel.registerMessages(message, email).catch(() => {
      throw errorMsgNotSaved;
    });
  }
  return ChatModel.updateEmailMessage(email, message).catch(() => {
    throw errorMsgNotSaved;
  });
};

const adminClientMessage = async (message, emailClient) => ChatModel
  .updateAdminMessage(message, emailClient).catch(() => {
    throw errorMsgNotSaved;
  });

const getAllChats = async () => {
  const modelAnswer = await ChatModel.getAllChats().catch(() => {
    const error = { error: true, message: 'Messages not found', code: 'not_found' };
    throw error;
  });
  return modelAnswer;
};

module.exports = {
  clientAdminMessage,
  adminClientMessage,
  getAllChats,
};
