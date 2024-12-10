const express = require('express');
const signup = require('../controller/auth.js'); 
const authRoutes = express.Router();

authRoutes.post('/signup', signup);

module.exports = authRoutes;
