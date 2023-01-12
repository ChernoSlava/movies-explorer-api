const message = {
  users: {
    notFoundControl: 'Пользователь с указанным _id не найден',
    badRequestControl: 'Переданы некорректные данные для пользователя',
    conflictControl: 'Пользователь с такой почтой уже существует',
    unauthorizedModel: 'Неправильная почта или пароль',
    emailNoValidModel: 'Неверный адресс электронной почты',

  },
  movies: {
    notFoundControl: 'Кино с таким id не найдена',
    badRequestControl: 'Переданы некорректные данные для кино',
    forbiddenControl: 'Нет прав на удаление этого кино',
    imageNoValidModel: 'Возникла ошибка с валидацией url постера фильма',
    trailerLinkNoValidModel: 'Возникла ошибка с валидацией url трейлера фильма',
    thumbnailMiniNoValidModel: 'Возникла ошибка с валидацией url миниатюрного изображения постера фильма',
  },
  notFound: {
    notFound: 'Ресурс не найден',
  },
  auth: {
    unauthorized: 'Необходима авторизация',
  },
};

const errorNames = {
  CastError: 'CastError',
  ValidationError: 'ValidationError',
  MongoServerError: 'MongoServerError',
  MongoError: 'MongoError',
};

const errorCodes = {
  Error11000: 11000,
  Error500: 500,
};

const errorHandler = 'На сервере произошла ошибка';

module.exports = {
  message,
  errorNames,
  errorCodes,
  errorHandler,
};
