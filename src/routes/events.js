/**
 * This contains all of the events routes.
 */

const {google} = require('googleapis');
const googleAuth = require('../config/google-auth');
const calendar = google.calendar({version: 'v3', googleAuth});

/**
 * Index function is to get the list of events in the given day (Only one day).
 * It fetches all of the events present on that day from the user account.
 * By default it uses the IST timezone.
 *
 * @param req HTTP Request object
 * @param res HTTP Response object
 * @param next Function
 * @returns {*}
 */
const index = (req, res, next) => {
  const options = {
    auth: googleAuth,
    calendarId: 'primary',
    timeMin: req.body.date + 'T00:00:00+05:30',
    timeMax: req.body.date + 'T23:59:59+05:30',
    singleEvents: true,
    orderBy: 'startTime',
  };
  // Fetch event list
  return calendar.events.list(options, (err, response) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json(response.data.items ? response.data.items : []);
  });
};

/**
 * Insert function creates the new event on the given date and time.
 * It takes the summary and event date as inputs then creates the event in user account.
 * By default it takes "800 Howard St., San Francisco, CA 94103" as location and "Asia/Kolkata" as timezone.
 *
 * @param req HTTP Request object
 * @param res HTTP Response object
 * @param next Function
 * @returns {*}
 */
const insert = (req, res, next) => {
  if (!req.body.summary) {
    return res.status(500).json({msg: 'Invalid request'});
  }
  if (!req.body.date) {
    return res.status(500).json({msg: 'Invalid request'});
  }
  const options = {
    auth: googleAuth,
    calendarId: 'primary',
    resource: {
      summary: req.body.summary,
      location: '800 Howard St., San Francisco, CA 94103',
      description: 'Sample description.',
      start: {
        dateTime: new Date(req.body.date).toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: new Date(req.body.date).toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      recurrence: [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      attendees: [],
      reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', minutes: 24 * 60},
          {method: 'popup', minutes: 10},
        ],
      },
    }
  };
  // insert new event
  return calendar.events.insert(options, (err, response) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json(response.data);
  });
};

/**
 * Remove function deletes the event from google calendar.
 * It takes event id as input and removes the event.
 *
 * @param req HTTP Request object
 * @param res HTTP Response object
 * @param next Function
 * @returns {*}
 */
const remove = (req, res, next) => {
  const options = {
    auth: googleAuth,
    calendarId: 'primary',
    eventId: req.params.id
  };
  // delete the event
  return calendar.events.delete(options, (err, response) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({msg: "Deleted successfully."});
  });
};

module.exports = {
  events: index,
  insert: insert,
  delete: remove
};
