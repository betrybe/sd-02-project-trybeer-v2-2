const mongoClient = require('mongodb').MongoClient;

const connection = async () => mongoClient
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(process.env.DB_NAME));

module.exports = connection;
