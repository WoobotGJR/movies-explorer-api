require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { errorLogger } = require('express-winston');
const { default: helmet } = require('helmet');
const cors = require('./middlewares/cors');

const { requestLogger } = require('./middlewares/logger');

const loginRoute = require('./routes/signin');
const registerRoute = require('./routes/signup');
const moviesRoute = require('./routes/movies');
const usersRoute = require('./routes/signin');

const { dataBaseUrl, PORT } = require('./utils/config');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect(dataBaseUrl, {
  useNewUrlParser: true,
});

const app = express();

app.use(cors);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use('/', loginRoute);
app.use('/', registerRoute);

app.use('/movies', auth, moviesRoute);
app.use('/users', auth, usersRoute);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorHandler);

app.listen(PORT);
