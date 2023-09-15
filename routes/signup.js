const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  registerUser,
} = require('../controllers/users');

const {
  userRegisterValidation,
} = require('../utils/routeValidationRules');

router.post('/signup', celebrate(userRegisterValidation), registerUser);

module.exports = router;
