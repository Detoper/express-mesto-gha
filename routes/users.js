const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsersController,
  getUserController,
  updateUserController,
  updateUserAvatarController,
  getMeController,
} = require('../controllers/users');

router.get('/users', (req, res) => {
  getUsersController(req, res);
});
router.get('/users/me', (req, res) => {
  getMeController(req, res);
});
router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  (req, res) => {
    getUserController(req, res);
  },
);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), (req, res) => {
  updateUserController(req, res);
});

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), (req, res) => {
  updateUserAvatarController(req, res);
});

module.exports = router;
