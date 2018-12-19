/**
 * This contains the google service account file and the scopes to get the authority of google account.
 * file - Service account json file
 * scopes - Array of scopes for authority
 * @type {{file: string, scopes: string[]}}
 */
const config = {
  file: 'colourmoon-demo-225906-02dad4d71539.json',
  scopes: ['https://www.googleapis.com/auth/calendar']
};

module.exports = config;
