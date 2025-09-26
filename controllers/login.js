const bcrypt = require('bcrypt');
const asyncHandler = require('../middleware/asyncHandler');
const CustomError = require('../configs/customError');
const {
    fetchUserByUsername,
    updateUserRefreshToken
} = require('../db/userQueries');
const {
    generateAccessToken,
    generateRefreshToken,
} = require('../configs/jwtHandler');

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) throw new CustomError('Username & password are required', 400);

    // check if the username exist
    const foundUser = await fetchUserByUsername(username);
    if (!foundUser) throw new CustomError('Username does not exist', 401);

    const matchPwd = bcrypt.compareSync(password, foundUser.password);
    if (!matchPwd) throw new CustomError('Password is incorrect', 401);

    const accessToken = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);

    const user = await updateUserRefreshToken(foundUser.id, refreshToken);
    const { password: pwd, refreshToken: token, ...other } = user;

    // store refreshToken in http-only cookie
    res.cookie(
        'jwt',
        refreshToken,
        {
            httpOnly: true,
            secure: false, // on development only
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        }
    );
    
    res.status(200).json({ other, accessToken })
});

module.exports = login;