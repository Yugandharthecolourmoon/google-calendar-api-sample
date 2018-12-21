/**
 * This contains the google service account file and the scopes to get the authority of google account.
 * file - Service account json file
 * scopes - Array of scopes for authority
 * @type {{file: string, scopes: string[]}}
 */
const config = {
  type: 'service-account',// service-account or oauth2-client
  service_account_file: 'service-account.json',
  oauth2_client_file: 'oauth2-client.json',
  attendees: ['yugandhar@thecolourmoon.com'],
  scopes: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ]
};

module.exports = config;
