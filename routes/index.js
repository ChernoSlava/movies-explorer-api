const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { usersRoute } = require('./users');
const { moviesRoute } = require('./movies');
const { notFoundRoute } = require('./notFound');
const { verificationUserLogin, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  verificationUserLogin,
);

router.use(auth);

router.use('/users', usersRoute);
router.use('/movies', moviesRoute);

router.use('*', notFoundRoute);

module.exports = router;
