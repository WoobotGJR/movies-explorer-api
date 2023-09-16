const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

module.exports.getCurrentUser = (req, res, next) => {
  const currentUserId = req.user._id;

  User.findById(currentUserId)
    .orFail(new NotFoundError('Пользователь с данным id не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
      next();
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь с данным id не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', // cгенерирован единожды с помощью node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 604800000, // длительность - 1 неделя
          httpOnly: true,
          sameSite: 'none',
        })
        .send({ message: 'Authorized' });
    })
    .catch(next);
};

module.exports.registerUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send(
        {
          data: {
            name: user.name,
            email: user.email,
            _id: user._id,
          },
        },
      ))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь с данным email уже зарегистрирован'));
        } else {
          next(err);
        }
      }))
    .catch(next);
};

// https://expressjs.com/ru/api.html#res.clearCookie
module.exports.logoutUser = (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.send({
      message: 'Logged out',
    });
  } catch (err) {
    next(err);
  }
};
