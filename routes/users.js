const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

const {
  updateUserInfoValidation,
} = require('../utils/routeValidationRules');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate(updateUserInfoValidation), updateUserInfo);

module.exports = router;
