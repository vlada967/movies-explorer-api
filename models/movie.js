const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        if (!isURL(value)) {
          return false;
        }
        return value;
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        if (!isURL(value)) {
          return false;
        }
        return value;
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        if (!isURL(value)) {
          return false;
        }
        return value;
      },
    },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
