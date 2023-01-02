const express = require('express');
const { celebrate, Joi } = require('celebrate');

const usersRoute = express.Router();

const { getUserData, updateUserData } = require('../controllers/users');

usersRoute.get(
  '/users/me',
  getUserData,
);

usersRoute.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
    }),
  }),
  updateUserData,
);
