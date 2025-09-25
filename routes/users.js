const { Router } = require('express');
const getAllUsers = require('../controllers/users');

const usersRouter = Router();

usersRouter.get('/', getAllUsers);

module.exports = usersRouter;