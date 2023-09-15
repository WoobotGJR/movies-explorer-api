const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    },
  )
    .then((movie) => res.status(201).send({ data: movie }))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  const movieId = req.params._id;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм с таким id не найден'))
    .then((movie) => {
      if (movie.owner.valueOf() !== req.user._id) {
        throw new ForbiddenError('Доступ к ресурсу запрещён');
      }

      return movie.deleteOne().then(res.send({ data: movie })).catch(next);
    })
    .catch(next);
};
