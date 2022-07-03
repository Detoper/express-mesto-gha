const Card = require('../models/card');

const getCardsController = (req, res, next) => {
  Card.find()
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const createCardController = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: { card, message: 'Created' } }))
    .catch(next);
};

const deleteCardController = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      if (card.owner === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId);
      } else {
        const err = new Error('Нет прав');
        err.name = 'ForbiddenError';
        throw err;
      }
    })
    .then((card) => {
      if (!card) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      res.send({ data: card });
    })
    .catch(next);
};

const addLikeController = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ))
    .then((card) => {
      if (!card) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      res.send({ data: card });
    })
    .catch(next);
};

const removeLikeController = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(() => Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ))
    .then((card) => {
      if (!card) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCardsController,
  createCardController,
  deleteCardController,
  addLikeController,
  removeLikeController,
};
