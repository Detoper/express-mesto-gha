const User = require('../models/user');

const getUsersController = (req, res, next) => {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getUserController = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      res.send({ data: user });
    })
    .catch(next);
};

const getMeController = (req, res, next) => {
  console.log(req.user._id);
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateUserController = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateUserAvatarController = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        const err = new Error('Объект не найден');
        err.name = 'CastError';
        throw err;
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUsersController,
  getUserController,
  updateUserController,
  updateUserAvatarController,
  getMeController,
};
