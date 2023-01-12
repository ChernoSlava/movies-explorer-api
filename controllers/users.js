const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { message, errorNames, errorCodes } = require('../constants/constants');

module.exports.getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(message.users.notFoundControl);
      }
    })
    .catch((err) => {
      if (err.name === errorNames.CastError) {
        next(new BadRequestError(message.users.badRequestControl));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserData = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(message.users.notFoundControl);
      }
    })
    .catch((err) => {
      if (err.name === errorNames.ValidationError || err.name === errorNames.CastError) {
        next(new BadRequestError(message.users.badRequestControl));
      } else if (err.name === errorNames.MongoServerError) {
        next(new ConflictError(message.users.conflictControl));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((info) => {
      const user = info.toObject();
      delete user.password;
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === errorNames.ValidationError) {
        next(new BadRequestError(message.users.badRequestControl));
      } else if (err.name === errorNames.MongoError && err.code === errorCodes.Error11000) {
        next(new ConflictError(message.users.conflictControl));
      } else {
        next(err);
      }
    });
};

module.exports.verificationUserLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { JWT_SECRET } = req.app.get('config');

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
