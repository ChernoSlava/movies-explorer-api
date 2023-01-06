const { celebrate, Joi } = require('celebrate');

const { validUrlLink, validRuName, validEnName } = require('../middlewares/regularExpression');

const movieCreateValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(validUrlLink).uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().pattern(validUrlLink).uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().pattern(validUrlLink).uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().pattern(validRuName).required(),
    nameEN: Joi.string().pattern(validEnName).required(),
  }),
});

const movieDeleteValid = celebrate({
  params: Joi.object({
    _id: Joi.string().hex().length(24).required(),
  }).required(),
});

module.exports = {
  movieCreateValid,
  movieDeleteValid,
};
