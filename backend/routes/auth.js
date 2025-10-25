const express = require('express');
const auth = require('../middleware/auth');
const { register, login, getMe, getAllUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.get('/users', auth, getAllUsers);

module.exports = router;
