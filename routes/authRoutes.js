const express = require('express');
const { register, login, getUser } = require('../controllers/authController'); 
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// User route
router.get('/user', getUser);

module.exports = router;
