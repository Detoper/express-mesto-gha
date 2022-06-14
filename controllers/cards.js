const Card = require("../models/card");

function errProcessing(err) {
  if (err.name === "ValidationError") {
    return {status: 400, message: "Некорректные входные данные"}
  } if (err.name === "CastError") {
    return {status: 404, message: "Запрашиваемый объект не найден"}
  } else return {status: 500, message: "Что-то пошло не так..."}
}

const getCardsController = (req, res) => {
  Card.find()
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

const createCardController = (req, res) => {
  const { name, link } = req.body;
  owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

const deleteCardController = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

const addLikeController = (req, res) => {
  console.log(req.params.cardId);
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

const removeLikeController = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

module.exports = {
  getCardsController,
  createCardController,
  deleteCardController,
  addLikeController,
  removeLikeController,
};
