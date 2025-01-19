const express = require('express');
const router = express.Router();
const { signup, verifyEmail, login, getProfile, getUserCounts, deleteUser,  forgotPassword, resetPassword } = require('../controllers/auth');  // Ensure you're importing the correct functions
const { authenticateUser } = require('../middlewares/authMiddleware');

router.post('/signup', signup);  // Correct usage of handler functions
router.post('/verify-email', verifyEmail);  // Correct usage of handler functions
router.post('/login', login);
router.post('/profile', authenticateUser, getProfile);
router.get('/buysellacc', getUserCounts);

router.post('/forgot-password', forgotPassword); // Forgot password route
router.post('/reset-password', resetPassword); 

// New route for deleting a user
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
