const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const router = require('express').Router();
const { regexForUrl } = require('../utils/constants');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexForUrl),
    trailerLink: Joi.string().required().pattern(regexForUrl),
    thumbnail: Joi.string().required().pattern(regexForUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.objectId(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId(),
  }),
}), deleteMovie);

module.exports = router;
