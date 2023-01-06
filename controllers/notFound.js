const NotFoundError = require('../errors/NotFoundError');

const { message } = require('../constants/constants');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError(message.notFound.notFound));
};
