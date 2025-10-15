const { Router } = require('express');
const getAllUsers = require('../controllers/users');
const verifyRole = require('../middleware/verifyRole');
const verifyJWT = require('../middleware/verifyJWT');
const ROLES_LIST = require('../configs/roles_list');
const asyncHandler = require('../middleware/asyncHandler');
const { deleteUser } = require('../db/userQueries');

const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await deleteUser(parseInt(id));
    res.status(200).json(user)

}));

module.exports = usersRouter;