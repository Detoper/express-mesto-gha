const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const PORT = 3000;
const app = express();
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const {
  createUserController,
  loginController,
} = require('./controllers/auth');
const auth = require('./middlewares/auth');
const { errProcessing } = require('./errors/err');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }).unknown(true),
}), createUserController);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), loginController);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
// обработка celebrate
app.use(errors());
// централизованная обработка
app.use((err, req, res, next) => {
  const errObj = errProcessing(err);
  res
    .status(errObj.status)
    .send({ message: errObj.message });
});

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
