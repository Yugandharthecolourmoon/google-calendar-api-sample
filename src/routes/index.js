/**
 * This contains all of the express routes and its mappings with controllers.
 */

const router = require('express').Router();
const events = require('./events');

// Events routes
router.get('/events', events.events);
router.post('/events', events.events);
router.post('/event', events.insert);
router.delete('/event/:id', events.delete);

module.exports = router;
