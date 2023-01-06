const express = require('express');

const usersRoute = express.Router();

const { getUserData, updateUserData } = require('../controllers/users');

const { userUpdateValid } = require('../validation/userValid');

usersRoute.get(
  '/me',
  getUserData,
);

usersRoute.patch(
  '/me',
  userUpdateValid,
  updateUserData,
);

module.exports = { usersRoute };
