const express = require('express');
const router = express.Router();
const { signup, verifyEmail, login, getProfile } = require('../controllers/auth');  // Ensure you're importing the correct functions
const { authenticateUser } = require('../middlewares/authMiddleware');

router.post('/signup', signup);  // Correct usage of handler functions
router.post('/verify-email', verifyEmail);  // Correct usage of handler functions
router.post('/login', login);
router.post('/profile', authenticateUser, getProfile);
module.exports = router;
