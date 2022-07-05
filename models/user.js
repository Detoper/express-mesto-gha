const mongoose = require('mongoose');
const validator = require('validator');

const { pattern } = require('../utils/linkPattern');
// описание схемы пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return pattern.test(v);
      },
      message: () => 'URL неверна',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: () => 'Почта не соответсвует модели почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// Создание модели
module.exports = mongoose.model('user', userSchema);
