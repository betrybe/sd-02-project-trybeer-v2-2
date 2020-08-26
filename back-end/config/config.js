require('dotenv').config();

module.exports = {
  development: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: 'project_trybeer_v2',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: 'project_trybeer_v2',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: 'project_trybeer_v2',
    host: 'localhost',
    dialect: 'mysql',
  },
};
