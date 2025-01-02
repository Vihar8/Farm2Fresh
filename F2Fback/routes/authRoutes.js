const express = require('express');
const router = express.Router();
const { signup, verifyEmail, login, getProfile, getUserCounts } = require('../controllers/auth');  // Ensure you're importing the correct functions
const { authenticateUser } = require('../middlewares/authMiddleware');

router.post('/signup', signup);  // Correct usage of handler functions
router.post('/verify-email', verifyEmail);  // Correct usage of handler functions
router.post('/login', login);
router.post('/profile', authenticateUser, getProfile);
router.get('/buysellacc', getUserCounts)
module.exports = router;
