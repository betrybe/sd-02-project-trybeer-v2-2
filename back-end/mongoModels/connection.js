const mongoClient = require('mongodb').MongoClient;

const connection = () => mongoClient
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(process.env.DB_NAME))
  .catch((err) => {
    console.error(err);
  });

module.exports = connection;
