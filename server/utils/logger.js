const winston = require('winston');
const { resolve } =  require('path');

const config = require('../../config');

const { transports, format } = winston;

const { LOG_LEVEL, NODE_ENV } = config;

const logFormatter = NODE_ENV === 'development'
  ? format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf((meta) => {
      const { level, message, timestamp, namespace, stack, ...restMeta } = meta;
      const displayNamespace = namespace ? `[${namespace}] -` : '';
      const stackMessage = stack ? `\n${stack}` : '';
      const otherMetaMessage = Object.keys(restMeta).length > 0 ? `\n${JSON.stringify(restMeta)}` : '';
      return `${timestamp} ${displayNamespace} ${level}: ${message} ${otherMetaMessage}${stackMessage}`;
    })
  )
  // depends how we want to log in production we can talk about it
  : format.combine(winston.format.timestamp(), winston.format.json());
const logger = winston.createLogger({
  level: LOG_LEVEL || NODE_ENV === 'development' ? 'debug' : 'info',
  format: logFormatter,
  transports: [
    new transports.Console({
      silent: NODE_ENV === 'test',
    }),
  ],
});

module.exports = (filename) => {
  if (filename) {
    const root = resolve('./');
    const filePath = filename.replace(root, '');
    return logger.child({ namespace: filePath });
  }
  return logger;
};
