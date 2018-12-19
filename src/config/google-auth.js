const {google} = require('googleapis');
const logger = require('../core/logger');
const config = require('./google.config');
const credentials = require(`./${config.file}`);

// create JWT auth object with config credentials and scopes
const jwtAuth = new google.auth.JWT(credentials.client_email, null, credentials.private_key, config.scopes);

// Authorize the JWT object for verification
jwtAuth.authorize((err, tokens) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info("Successfully authorized with JWT!");
});

module.exports = jwtAuth;
