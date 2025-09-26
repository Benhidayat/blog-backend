const { Router } = require('express');
const authRouters = Router();
const register = require('../controllers/register');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const handleRefreshToken = require('../controllers/refresh');

authRouters.post('/register', register);
authRouters.post('/login', login);
authRouters.get('/logout', logout);
authRouters.get('/refresh', handleRefreshToken);

module.exports = authRouters;