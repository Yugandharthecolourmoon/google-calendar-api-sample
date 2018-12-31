import React from 'react';

const EventListItem = ({ event, onRemove }) => {
  const deleteEvent = (event) => {
    if (window.confirm('Are you sure?')) {
      window.gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: event.id
      }).then(() => {
        onRemove(event.id);
        window.alert('Event deleted successfully.');
      }, error => {
        window.alert('Unable to delete event.');
      });
    }
  };

  const prepareAttendees = attendees => {
    if (attendees && attendees.length && attendees.length > 0) {
      let strAttendees = '';
      for (let i = 0; i < attendees.length; i++) {
        strAttendees += attendees[i].email + ' - ' + attendees[i].responseStatus + '\n';
      }
      return strAttendees;
    } else {
      return '-';
    }
  };

  return (
    <tr>
      <td>{event.start.date ? event.start.date : event.start.dateTime}</td>
      <td>{event.summary}</td>
      <td>{prepareAttendees(event.attendees)}</td>
      <td className="text-center">
        <button type="button" className="btn btn-outline-warning text-right" onClick={e => deleteEvent(event)}>Delete
          </button>
      </td>
    </tr>
  );
};

export default EventListItem;
