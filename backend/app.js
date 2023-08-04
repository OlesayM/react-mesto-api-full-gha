require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const validation = require('./middlewares/validation');
const { login, createUser } = require('./controllers/users');
const middlewares = require('./middlewares/middlewares');
const ErrNotFound = require('./errors/ErrNotFound'); // 404
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors({
  origin: ' https://mesto.olesaym.nomoreparties.co ',
  credentials: true,
}));

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('База данных подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к Базе данных');
  });
app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validation.checkLogin, login);
app.post('/signup', validation.checkCreateUser, createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use(errorLogger);

app.use('*', auth, (req, res, next) => {
  next(new ErrNotFound('Страница не найдена'));
});
app.use(errors());
app.use(middlewares);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
