const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCardsController,
  createCardController,
  deleteCardController,
  addLikeController,
  removeLikeController,
} = require('../controllers/cards');

router.get('/cards', (req, res) => {
  getCardsController(req, res);
});

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), (req, res) => {
  createCardController(req, res);
});

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    postId: Joi.string().hex().length(24),
  }),
}), (req, res) => {
  deleteCardController(req, res);
});

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    postId: Joi.string().hex().length(24),
  }),
}), (req, res) => {
  addLikeController(req, res);
});

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), (req, res) => {
  removeLikeController(req, res);
});

module.exports = router;
