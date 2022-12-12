// there has to be unused next otherwise express logs errors by itself
// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      status: status,
      message: err.message || "Internal Server Error",
    },
  });
}

module.exports = {
  globalErrorHandler,
}