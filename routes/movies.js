const express = require('express');

const moviesRoute = express.Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { movieCreateValid, movieDeleteValid } = require('../validation/movieValid');

moviesRoute.get('/', getMovies);
moviesRoute.post(
  '/',
  movieCreateValid,
  createMovie,
);
moviesRoute.delete(
  '/:_id',
  movieDeleteValid,
  deleteMovie,
);

module.exports = { moviesRoute };
