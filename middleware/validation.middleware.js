const { ResponseFormatter } = require('../utils/response.js');
const logger = require('../utils/logger.js');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true
    });

    if (error) {
      const errors = error.details.reduce((acc, curr) => {  
        acc[curr.context.key] = curr.message;
        return acc;
      }, {});

      logger.warn('Validation failed', {
        path: req.path,
        errors,
        body: req.body
      });

      return ResponseFormatter.validation(res, errors);
    }

    next();
  };
};


module.exports = {validate}