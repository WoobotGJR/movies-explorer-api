const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // console.log(err);
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
