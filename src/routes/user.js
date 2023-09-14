const { Router } = require('express');
const {
  registerUser,
  verifyEmail,
  loginUser,
} = require('../controllers/user.controller');
const {
  validateEmail,
  validateUsername,
  validatePassword,
} = require('../middlewares/register.validation');

const routes = new Router();

// Register a new user
routes.post('/register', validateEmail, validateUsername, validatePassword, registerUser);

// Verify user's email
routes.put('/verify', validateEmail, verifyEmail);

// User login
routes.post('/login', validateEmail, loginUser);

module.exports = routes;
