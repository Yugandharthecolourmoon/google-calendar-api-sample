const log4js = require("log4js");

// logger configuration
log4js.configure({
  appenders: {
    console: {type: 'console'},
    file: {type: 'dateFile', filename: 'logs/log4js.log'}
  },
  categories: {
    default: {appenders: ['file', 'console'], level: 'debug'}
  }
});

/**
 * To write debug log.
 * @param msg log message
 * @returns {Promise<void>}
 */
const debugLog = async (msg) => {
  const logger = log4js.getLogger();
  logger.level = 'debug';
  logger.debug(msg);
};

/**
 * To write trace log.
 * @param msg log message
 * @returns {Promise<void>}
 */
const traceLog = async (msg) => {
  const logger = log4js.getLogger();
  logger.level = 'trace';
  logger.trace(msg);
};

/**
 * To write info log.
 * @param msg log message
 * @returns {Promise<void>}
 */
const infoLog = async (msg) => {
  const logger = log4js.getLogger();
  logger.level = 'info';
  logger.info(msg);
};

/**
 * To write warning log.
 * @param msg log message
 * @returns {Promise<void>}
 */
const warnLog = async (msg) => {
  const logger = log4js.getLogger();
  logger.level = 'warn';
  logger.warn(msg);
};

/**
 * To write error log.
 * @param msg log message
 * @returns {Promise<void>}
 */
const errorLog = async (msg) => {
  const logger = log4js.getLogger();
  logger.level = 'error';
  logger.error(msg);
};

/**
 * To write fatal log.
 * @param msg log message
 * @returns {Promise<void>}
 */
const fatalLog = async (msg) => {
  const logger = log4js.getLogger();
  logger.level = 'fatal';
  logger.fatal(msg);
};

/**
 * Logger object to export.
 * @type {{warn: warnLog, trace: traceLog, debug: debugLog, error: errorLog, info: infoLog, fatal: fatalLog}}
 */
const logger = {
  debug: debugLog,
  trace: traceLog,
  info: infoLog,
  warn: warnLog,
  error: errorLog,
  fatal: fatalLog
};

module.exports = logger;
