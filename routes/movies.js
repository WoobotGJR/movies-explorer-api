const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getMovies,
  saveMovie,
  deleteMovieById,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../utils/routeValidationRules');

router.get('/', getMovies);

router.post('/', celebrate(createMovieValidation), saveMovie);

router.delete('/:_id', celebrate(deleteMovieValidation), deleteMovieById);

module.exports = router;
