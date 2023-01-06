const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { message } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: message.users.emailNoValidModel,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((info) => {
      if (!info) {
        return Promise.reject(new UnauthorizedError(message.users.unauthorizedModel));
      }

      return bcrypt.compare(password, info.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(message.users.unauthorizedModel));
          }
          const user = info.toObject();
          delete user.password;
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
