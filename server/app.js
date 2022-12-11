const express = require('express');
const helmet = require('helmet');

const morgan = require('./middlewares/morgan');
const routesV1 = require('./routes/v1');
const db = require('../db');


const app = express();


const serverContext = { app, db };

serverContext.models = require('./models')(serverContext);

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(helmet());
app.use(express.json());

app.use('/api/v1', routesV1(serverContext));


module.exports = app;