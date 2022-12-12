const logger = require('../utils/logger')(__filename);

// there has to be unused next otherwise express logs errors by itself
// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  logger.error(err);
  res.status(status).json({
    error: {
      status: status,
      // do not leak info about interal errors
      message: status === 500 ?  "Internal Server Error" : err.message 
    },
  });
}

module.exports = {
  globalErrorHandler,
}