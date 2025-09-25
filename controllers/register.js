const asyncHandler = require('../middleware/asyncHandler');
const CustomError = require('../configs/customError');
const bcrypt = require('bcrypt');
const {
    fetchUserByUsername,
    fetchUserByEmail,
    createUser,
} = require('../db/userQueries');

const register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) throw new CustomError('Username, email & password are required', 400);

    const duplicatedUser = await fetchUserByUsername(username);
    if (duplicatedUser) throw new CustomError('Username is already taken.', 409);

    const duplicatedEmail = await fetchUserByEmail(email);
    if (duplicatedEmail) throw new CustomError('Email is already registered', 409);

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(password, salt);
    
    // create user in db
    const user = await createUser(username, email, hashedPwd);

    const { password: pwd, ...otherInfo} = user

    res.status(201).json(otherInfo)

});

module.exports = register;