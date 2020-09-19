const connection = require('./connection');

const messageTime = () => Date.now();

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
  const modelAnswer = await db.collection('messages').findOne({ email });
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
  return db.collection('messages').updateOne(
    { email: emailClient },
    { $push: { messages: { chatName: 'Loja', sentMessage: message, time: messageTime() } } },
  );
};

/* const findClientByEmail = async (email) => {
  const db = await connection();
  const modelAnswer = db.collection('messages').findOne({ email });
  return modelAnswer;
}; */

const getAllChats = async () => {
  const db = await connection();
  const modelAnswer = await db.collection('messages')
    .aggregate([
      { $unwind: '$messages' },
      { $sort: { 'messages.time': 1 } },
      { $group: { _id: '$email', messages: { $push: '$messages' } } },
      { $project: { _id: 0, messages: 1, email: '$_id' } },
    ]).toArray();
  return modelAnswer;
};

module.exports = {
  registerMessages,
  emailSchemaExist,
  updateEmailMessage,
  updateAdminMessage,
  getAllChats,
};
