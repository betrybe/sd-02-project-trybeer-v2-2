const mysqlx = require('@mysql/xdevapi');

const connection = () => mysqlx.getSession({
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  schema: process.env.SQL_SCHEMA,
});

module.exports = connection;
