const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
/// ////////////////////////////
// мидлвэр, добавляющий айди юзера в каждый запрос. Пока хардкод
app.use((req, res, next) => {
  req.user = {
    _id: '62a719aca281917f18586770',
  };

  next();
});
/// ////////////////////////////
app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
