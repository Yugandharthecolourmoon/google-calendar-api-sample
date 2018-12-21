const { google } = require('googleapis');
const logger = require('../core/logger');
const config = require('./google.config');

let auth;
if (config.type == 'service-account') {
  const credentials = require(`./${config.service_account_file}`);
  // create JWT auth object with config credentials and scopes
  auth = new google.auth.JWT(credentials.client_email, null, credentials.private_key, config.scopes);
  // Authorize the JWT object for verification
  auth.authorize((err, tokens) => {
    if (err) {
      logger.error(err);
      return;
    }
    logger.info("Successfully authorized with JWT!");
  });
} else if (config.type == 'oauth2-client') {
  const credentials = require(`./${config.oauth2_client_file}`);
  auth = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    'http://localhost:3001'
  );
  auth.getAccessToken((err, tokens) => {
    if (err) {
      logger.error(err);
      return;
    }
    auth.credentials = { access_token: tokens.access_token }
    callback(auth);
  });
}

// event attendees
const attendees = [];
config.attendees.forEach(attendee => {
  attendees.push({'email': attendee});
});

module.exports = {
  googleAuth: auth,
  attendees: attendees
};
