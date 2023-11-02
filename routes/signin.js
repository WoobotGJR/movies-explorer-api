const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  loginUser,
} = require('../controllers/users');

const {
  userLoginValidation,
} = require('../utils/routeValidationRules');

router.post('/signin', celebrate(userLoginValidation), loginUser);

module.exports = router;
