const errProcessing = (err) => {
  if (err.name === 'ValidationError') {
    return {
      status: 400,
      message:
        'Длины строк должны быть от 2 до 30 символов, URL обязательна',
    };
  }
  if (err.name === 'NotCorrectError') {
    return {
      status: 401,
      message: err.message,
    };
  }
  if (err.name === 'ForbiddenError') {
    return {
      status: 403,
      message: 'Недостаточно прав для совершения действия',
    };
  }
  if (err.name === 'CastError') {
    return {
      status: 404,
      message: 'Запрашиваемый объект не найден',
    };
  }
  return {
    status: 500,
    message: 'Что-то пошло не так...',
  };
};

module.exports = { errProcessing };
