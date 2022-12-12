const morgan = require('morgan');
const logger = require('../utils/logger')();

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const successHandler = morgan('short', {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan('short', {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};