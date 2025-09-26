const verifyRole = (role) => {
    return (req, res, next) => {
        console.log('verify role started')
        if (!req?.role) return res.sendStatus(401);
        const theRole = role;
        console.log(theRole);
        console.log(req.role);
        
        const result = role === theRole;
        console.log(result);
        if (!result) return res.sendStatus(403);
        next();
    };
};

module.exports = verifyRole;