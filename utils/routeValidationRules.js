const { Joi } = require('celebrate');

const { urlRegexPattern } = require('./config');

const createMovieValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(urlRegexPattern).required(),
    trailerLink: Joi.string().pattern(urlRegexPattern).required(),
    thumbnail: Joi.string().pattern(urlRegexPattern).required(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const deleteMovieValidation = {
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
};

const updateUserInfoValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  }),
};

const userLoginValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};

const userRegisterValidation = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30),
  }),
};

module.exports = {
  createMovieValidation,
  deleteMovieValidation,
  updateUserInfoValidation,
  userLoginValidation,
  userRegisterValidation,
};
