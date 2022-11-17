const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  createUser,
} = require('../controllers/user');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = router;
