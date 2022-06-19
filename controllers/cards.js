const Card = require('../models/card');

function errProcessing(err) {
  if (err.name === 'ValidationError') {
    return {
      status: 400,
      message:
        'Название карточки должно быть от 2 до 30 символов, URL картинки обязательна',
    };
  }
  if (err.name === 'CastError') {
    return { status: 404, message: 'Запрашиваемый объект не найден' };
  }
  return { status: 500, message: 'Что-то пошло не так...' };
}

const getCardsController = (req, res) => {
  Card.find()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res
        .status(errProcessing(err).status)
        .send({ message: errProcessing(err).message });
    });
};

const createCardController = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: { card, message: 'Created' } }))
    .catch((err) => {
      res
        .status(errProcessing(err).status)
        .send({ message: errProcessing(err).message });
    });
};
// в 3-х роутах ниже добавил предварительный поиск по айди, но без него
// Монго и так выкидывает ошибку, если карточки нет. Обрабатываю её в блоке catch
// не вижу смысла в доп проверке, т.к это влияет на производительность
const deleteCardController = (req, res) => {
  Card.findById(req.params.cardId)
    .then(() => Card.findByIdAndRemove(req.params.cardId))
    .then((card) => {
      if (!card) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      res
        .status(errProcessing(err).status)
        .send({ message: errProcessing(err).message });
    });
};

const addLikeController = (req, res) => {
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
    .catch((err) => {
      res
        .status(errProcessing(err).status)
        .send({ message: errProcessing(err).message });
    });
};

const removeLikeController = (req, res) => {
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
    .catch((err) => {
      res
        .status(errProcessing(err).status)
        .send({ message: errProcessing(err).message });
    });
};

module.exports = {
  getCardsController,
  createCardController,
  deleteCardController,
  addLikeController,
  removeLikeController,
};
