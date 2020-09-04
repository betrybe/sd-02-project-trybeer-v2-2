const connection = require('./connection');

const registerMessages = async (userEmail, message) => {
  const addMessageForUser =  await connection()
    .then((db) => db.collection('chat').updateOne(
      {
        email: userEmail,
      },
      {
        $push: { messages:message }
      },
      {
        upsert: true
      }
    ));

    return addMessageForUser;
}

module.exports = {
  registerMessages,
};
