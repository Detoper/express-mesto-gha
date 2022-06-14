const User = require("../models/user");

function errProcessing(err) {
  if (err.name === "ValidationError") {
    return {status: 400, message: "Некорректные входные данные"}
  } if (err.name === "CastError") {
    return {status: 404, message: "Запрашиваемый объект не найден"}
  } else return {status: 500, message: "Что-то пошло не так..."}
}

const getUsersController = (req, res) => {
  console.log(req.user._id);
  User.find()
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

const getUserController = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

const createUserController = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

const updateUserController = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // пользователь не будет создан
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

const updateUserAvatarController = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, 
      runValidators: true, 
      upsert: false,
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(errProcessing(err).status).send({ message: errProcessing(err).message }));
};

module.exports = {
  getUsersController,
  getUserController,
  createUserController,
  updateUserController,
  updateUserAvatarController,
};
