const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET; 

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded.username;
        req.role = decoded.role
        console.log(req.role)
        next();
    });
};

module.exports = verifyJWT;