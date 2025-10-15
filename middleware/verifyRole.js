const verifyRole = (role) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401);
        const theRole = role;        
        const result = role === theRole;
        if (!result) return res.sendStatus(403);
        next();
    };
};

module.exports = verifyRole;