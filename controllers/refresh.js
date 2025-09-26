const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const CustomError = require('../configs/customError');
const { fetchUserByRefreshToken } = require('../db/userQueries');
const { generateAccessToken } = require('../configs/jwtHandler');

const REFRESH_KEY = process.env.REFRESH_TOKEN_SECRET;

const handleRefreshToken = asyncHandler(async(req, res) => {
    const { cookies } = req;
    if (!cookies.jwt) throw new CustomError('Authentication required', 401);

    const refreshToken = cookies.jwt;

    const foundUser = await fetchUserByRefreshToken(refreshToken);
    if (!foundUser) throw new CustomError('Unauthorized', 403);

    jwt.verify(refreshToken, REFRESH_KEY, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) throw new CustomError('Unauthorized', 403);
        const accessToken = generateAccessToken(decoded);
        res.status(200).json({ accessToken });
    });

    
});

module.exports = handleRefreshToken;