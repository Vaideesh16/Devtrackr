const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');

const validate = (req, _res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  const errors = result.array().map((error) => ({
    field: error.path,
    message: error.msg
  }));

  const validationError = new AppError('Validation failed', 400);
  validationError.errors = errors;
  next(validationError);
};

module.exports = validate;
