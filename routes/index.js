const router = require('express').Router();

const { usersRoute } = require('./users');
const { moviesRoute } = require('./movies');
const { notFoundRoute } = require('./notFound');
const { verificationUserLogin, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { signUpValid, signInValid } = require('../validation/authValid');

router.post(
  '/signup',
  signUpValid,
  createUser,
);

router.post(
  '/signin',
  signInValid,
  verificationUserLogin,
);

router.use(auth);

router.use('/users', usersRoute);
router.use('/movies', moviesRoute);

router.use('*', notFoundRoute);

module.exports = router;
