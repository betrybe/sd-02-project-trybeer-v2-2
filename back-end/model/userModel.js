const connection = require('./connection');

const getUserBy = async (paramKey, paramValue) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT u.id, u.name, u.email, u.password, u.role
    FROM users AS u
    WHERE u.${paramKey} = ?;`,
  )
    .bind(paramValue)
    .execute()
    .then((results) => results.fetchAll()[0] || []);

  if (!result.length) return null;
  const [id, name, email, password, role] = result;

  return { id, name, email, password, role };
};

const createUser = async (modelInfo) => {
  const { name, email, password, stringRole } = modelInfo;
  const session = await connection();
  const id = await session.sql(
    `INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?);`,
  )
    .bind(name)
    .bind(email)
    .bind(password)
    .bind(stringRole)
    .execute()
    .then((result) => result.getAutoIncrementValue());
  return { id, name, email, role: stringRole };
};

const getUserById = async (userId) => getUserBy('id', userId);

const getUserByEmail = async (email) => getUserBy('email', email);

const updateUserById = async (paramId, paramName) => {
  const session = await connection();
  await session.sql(
    `UPDATE users
    SET name = ?
    WHERE id = ?;`,
  )
    .bind(paramName)
    .bind(paramId)
    .execute();
  return { id: paramId, name: paramName };
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  updateUserById,
};
