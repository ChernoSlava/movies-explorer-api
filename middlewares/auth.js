const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Необходима авторизация');
  } else {
    const token = authorization.replace('Bearer ', '');
    const { JWT_SECRET } = req.app.get('config');

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
      req.user = { _id: payload._id };
      next();
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
    }
  }
};
