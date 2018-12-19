const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandlers = require('./core/error-handlers-middleware');
const routes = require('routes');

// init application with configuration
const app = express();
// Disable unnecessary headers of express-js
app.disable('etag');
app.disable('x-powered-by');
// User logger for development
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Routes mapping
app.use('/api', routes);
app.use(errorHandlers.error404);
app.use(errorHandlers.handler);

module.exports = app;
