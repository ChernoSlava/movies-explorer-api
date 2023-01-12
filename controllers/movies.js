const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const { message, errorNames } = require('../constants/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((newMovie) => {
      res.send(newMovie);
    })
    .catch((err) => {
      if (err.name === errorNames.ValidationError) {
        next(new BadRequestError(message.movies.badRequestControl));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const paramsMovieId = req.params._id;

  const id = req.user._id;

  Movie.findById(paramsMovieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(message.movies.notFoundControl);
      }
      if (movie.owner.toString() !== id) {
        throw new ForbiddenError(message.movies.forbiddenControl);
      } else {
        return movie.remove();
      }
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === errorNames.CastError) {
        next(new BadRequestError(message.movies.badRequestControl));
      } else {
        next(err);
      }
    });
};
