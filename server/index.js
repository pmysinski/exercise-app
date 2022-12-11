const app = require('./app');
const config = require('../config')
const logger = require('./utils/logger')(__filename);


const server = app.listen(config.PORT, () => {
  logger.info(`listening on port ${config.PORT}`);
});

const signals = {
  'SIGINT': 2,
  'SIGTERM': 15
};

function shutdown(signal, value) {
  server.close(function () {
    console.log('server stopped by ' + signal);
    process.exit(128 + value);
  });
}

Object.keys(signals).forEach(function (signal) {
  process.on(signal, function () {
    shutdown(signal, signals[signal]);
  });
});

