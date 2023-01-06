const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');

const app = express();

const config = dotenv.config({
  path: path.resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common'),
}).parsed;
app.set('config', config);

app.use(express.json());

app.use(cors(
  {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
));

mongoose.connect(config.DB_movies, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(bodyParser.json());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
