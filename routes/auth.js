const { Router } = require('express');
const register = require('../controllers/register');

const authRouters = Router();

authRouters.post('/register', register);

module.exports = authRouters;