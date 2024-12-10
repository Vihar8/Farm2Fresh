const express = require('express');
const router = express.Router();
const { signup, verifyEmail } = require('../controllers/auth');  // Ensure you're importing the correct functions

router.post('/signup', signup);  // Correct usage of handler functions
router.post('/verify-email', verifyEmail);  // Correct usage of handler functions

module.exports = router;
