const express = require('express');
require('express-async-errors');
const helmet = require('helmet');

const morgan = require('./middlewares/morgan');
const { globalErrorHandler } = require('./middlewares/error-handlers');
const routesV1 = require('./routes/v1');
const db = require('../db');

const app = express();

const models = require('./models')(db);
const services = require('./services')(models);

const serverContext = { app, db, models, services };

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(helmet());
app.use(express.json());

app.use('/api/v1', routesV1(serverContext));
app.use(globalErrorHandler);

module.exports = app;