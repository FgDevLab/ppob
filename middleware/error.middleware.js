const logger = require('../utils/logger.js');
const { ResponseFormatter } = require('../utils/response.js'); 

const errorMiddleware = (err, req, res, next) => {
    logger.error(err.message, { stack: err.stack });

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    return ResponseFormatter.error(res, err.message || 'An unexpected error occurred', statusCode, err.errors);
};

module.exports  = errorMiddleware;