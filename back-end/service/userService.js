const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const jwtSecret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '300m',
  algorithm: 'HS256',
};

const loginUser = async (email, paramPassword) => {
  const result = await userModel.getUserByEmail(email);
  if (!result) {
    return { error: true, message: 'E-mail not found.', code: 'unauthorized' };
  }
  if (result.password !== paramPassword) {
    return { error: true, message: 'The password does not match.', code: 'unauthorized' };
  }
  const { id, password, ...userInfo } = result;
  const token = jwt.sign({ data: userInfo }, jwtSecret, jwtConfig);
  userInfo.token = token;
  return userInfo;
};

const createUser = async (userInfo) => {
  const { name, email, password, role } = userInfo;
  const result = await userModel.getUserByEmail(email);
  if (result) {
    return { error: true, message: 'E-mail already in database.', code: 'already_exists' };
  }
  const stringRole = role === 'true' ? 'administrator' : 'client';
  const modelInfo = { name, email, password, stringRole };
  const createdUser = await userModel.createUser(modelInfo);
  return createdUser;
};

const updateUserById = async (id, name) => {
  const userExists = await userModel.getUserById(id);
  if (!userExists) {
    return { error: true, message: 'User not found.', code: 'unauthorized' };
  }
  const result = await userModel.updateUserById(id, name);
  return result;
};

module.exports = {
  loginUser,
  createUser,
  updateUserById,
};
