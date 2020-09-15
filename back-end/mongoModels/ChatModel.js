const connection = require('./connection');

const messageTime = () => Date.now();

const newOnlineUser = async (id, name, email, role) => {
  const db = await connection();
  await db.collection('onlineUsers').insertOne({
    userId: id, name, email, role,
  });
};

const registerMessages = async (message, email) => {
  const db = await connection();
  await db.collection('messages').insertOne({
    email,
    messages: [
      {
        chatName: email,
        sentMessage: message,
        time: messageTime(),
      },
    ],
  });
};

const emailSchemaExist = async (email) => {
  const db = await connection();
  const modelAnswer = await db.collection('messages').findOne({ email }).catch(() => null);
  return modelAnswer;
};

const updateEmailMessage = async (email, message) => {
  const db = await connection();
  await db.collection('messages').updateOne(
    { email },
    { $push: { messages: { chatName: email, sentMessage: message, time: messageTime() } } },
  );
};

const updateAdminMessage = async (message, emailClient) => {
  const db = await connection();
  await db.collection('messages').updateOne(
    { email: emailClient },
    { $push: { messages: { chatName: 'Loja', sentMessage: message, time: messageTime() } } },
  );
};

const findClientByEmail = async (email) => {
  const db = await connection();
  const modelAnswer = db.collection('messages').findOne({ email });
  return modelAnswer;
};

const getAllChats = async () => {
  const db = await connection();
  const modelAnswer = await db.collection('messages')
    .aggregate([
      { $unwind: '$messages' },
      { $sort: { 'messages.time': 1 } },
      {
        $group: {
          _id: null,
        },
      },
    ]).toArray();
  return modelAnswer;
};

module.exports = {
  newOnlineUser,
  registerMessages,
  emailSchemaExist,
  updateEmailMessage,
  updateAdminMessage,
  findClientByEmail,
  getAllChats,
};
