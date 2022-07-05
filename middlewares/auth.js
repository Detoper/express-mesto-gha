const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Необходима авторизация');
    err.name = 'NotCorrectError';
    throw err;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    err.message = 'Необходима авторизация';
    err.name = 'NotCorrectError';
    throw err;
  }
  req.user = payload;
  next();
};
