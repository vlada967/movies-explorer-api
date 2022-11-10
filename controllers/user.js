const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const AuthorizedError = require('../errors/AuthorizedError');
const ConflictError = require('../errors/ConflictError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const getUser = (req, res, next) => User.find({})
  .then((user) => res.send({ data: user }))
  .catch((err) => { next(err); });

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  return User.findOneAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email: userEmail, name: userName, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name: userName, email: userEmail, password: hash,
      })
        .then(({
          name, _id, email, createdAt,
        }) => {
          res.send({
            name, _id, email, createdAt,
          });
        }).catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
          }
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Некорректные данные'));
          } else {
            next(err);
          }
        });
    });
};


const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new AuthorizedError('Необходима авторизация'));
    });
};

module.exports = {
  getUser, updateUser, createUser, login,
};
