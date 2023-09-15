const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../utils/routeValidationRules');

router.get('/', getMovies);

router.post('/', celebrate(createMovieValidation), createMovie);

router.delete('/:_id', celebrate(deleteMovieValidation), deleteMovieById);

module.exports = router;
