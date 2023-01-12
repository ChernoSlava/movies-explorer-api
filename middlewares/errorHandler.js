const { errorHandler, errorCodes } = require('../constants/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === errorCodes.Error500 ? errorHandler : message,
  });

  next();
};
