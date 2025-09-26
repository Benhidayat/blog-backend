const allowedOrigins = require('./allowedOrigins');
const CustomError = require('./customError');

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);

        callback(new CustomError('Not allowed by cors', 403));
    },
    credentials: true
};

module.exports = corsOptions;