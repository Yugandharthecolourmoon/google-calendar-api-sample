/**
 * Error handlers are to handle non existed routes and any errors that occurs in application.
 */
const logger = require('./logger');

/**
 * A route for all non existed routes. This helps to catch all the routes which are not registered and handle in proper way.
 * @param req HTTP request object
 * @param res HTTP response object
 * @param next Function
 * @returns {*}
 */
const error404 = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.error(ip + ' - ' + req.url + ' - No route found.');
  const err = new Error('No route was found');
  err.status = 404;
  return next(err);
};

/**
 * Error handler catches all the application errors and send response to client.
 * @param err Error object
 * @param req HTTP request object
 * @param res HTTP response object
 * @param next Function
 * @returns {*|Response|createServer.NextHandleFunction|never|Promise<any>}
 */
const errorHandler = (err, req, res, next) => {
  logger.fatal(err);
  const msg = err.message || "Internal server error";
  return res.status(err.status || 500).json(msg);
};

module.exports = {
  error404: error404,
  handler: errorHandler
};
