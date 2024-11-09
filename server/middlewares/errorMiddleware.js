const errorHandler = require('../utils/errorHandler');

function errorMiddleware(err, req, res, next) {
    errorHandler(err, req, res, next);
}

module.exports = errorMiddleware;