const { Router } = require('express');
const getAllUsers = require('../controllers/users');
const verifyRole = require('../middleware/verifyRole');
const ROLES_LIST = require('../configs/roles_list');

const usersRouter = Router();

usersRouter.get('/',verifyRole(ROLES_LIST.user), getAllUsers);

module.exports = usersRouter;