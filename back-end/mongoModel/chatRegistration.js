const connection = require('./connection');

const registerMessages = async (userEmail, message) => {
  const addMessageForUser = await connection()
    .then((db) => db.collection('chat').updateOne(
      {
        email: userEmail,
      },
      {
        $push: { messages: message },
      },
      {
        upsert: true,
      },
    ));

  return addMessageForUser;
};

const getMessages = async (userEmail) => {
  const [{ messages }] = await connection()
    .then((db) => db.collection('chat').find(
      {
        email: userEmail,
      }
    ).toArray())
    .catch((err) => {
      throw new Error(err.message, err.status);
    });
  return messages;
};

module.exports = {
  registerMessages,
  getMessages,
};
