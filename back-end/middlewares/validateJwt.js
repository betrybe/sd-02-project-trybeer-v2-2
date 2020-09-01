const jwt = require('jsonwebtoken');
const { users } = require('../models');

const jwtSecret = process.env.JWT_SECRET;

const loginJwt = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    next({ error: true, message: 'Token not found', code: 'invalid_data' });
  }
  try {
    const validToken = jwt.verify(token, jwtSecret);
    const { data: { email } } = validToken;
    const userExist = await users.findOne({
      where: { email },
      attributes: { exclude: ['published', 'updated'] },
    });
    if (!userExist) {
      next({ error: true, message: 'User does not exist', code: 'invalid_data' });
    }
    const { dataValues: { password, ...noPass } } = userExist;
    req.user = noPass;
    next();
  } catch (err) {
    next({ error: true, message: err.message, code: 'unauthorized' });
  }
};

module.exports = {
  loginJwt,
};