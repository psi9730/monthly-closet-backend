const constant = require('../config/constants');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || constant.INTERNER_SERVER_ERROR;
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};
