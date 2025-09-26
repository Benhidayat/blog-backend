const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET

const generateAccessToken = (user) => {
    const payload = {
        username: user.username,
        role: user.role
    }

    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '5m' });
};

const generateRefreshToken = (user) => {
    const payload = {
        username: user.username,
        role: user.role
    }

    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '1d' });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};