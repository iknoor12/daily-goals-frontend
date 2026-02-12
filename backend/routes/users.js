const express = require('express');
const {
  registerUser,
  loginUser,
  getUser
} = require('../controllers/usersController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUser);

module.exports = router;
