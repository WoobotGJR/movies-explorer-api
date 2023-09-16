const router = require('express').Router();

const {
  logoutUser,
} = require('../controllers/users');

router.post('/logout', logoutUser);

module.exports = router;
