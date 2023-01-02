const router = require('express').Router();

// const { celebrate, Joi } = require('celebrate');

const { usersRoute } = require('./users');
const { moviesRoute } = require('./movies');
const { notFoundRoute } = require('./notFound');
// const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
// const { validUrlLink } = require('../middlewares/regularExpression');

router.use(auth);

router.use('/users', usersRoute);
router.use('/movies', moviesRoute);

router.use('*', notFoundRoute);

module.exports = router;
