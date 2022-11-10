const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { regexForEmail } = require('../utils/constants');
const {
  getUser, updateUser,
} = require('../controllers/user');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(regexForEmail),
    name: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
