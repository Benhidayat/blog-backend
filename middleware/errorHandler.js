const CustomError = require('../configs/customError');

const errorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
};

const notFoundError = (req, res, next) => {
    const error = new CustomError(`${req.originalUrl} does not exist in the server`, 404);
};

module.exports = {
    notFoundError,
    errorHandler
}