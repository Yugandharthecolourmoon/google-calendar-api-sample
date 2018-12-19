import React from 'react';
import Api from '../Api';

const EventListItem = ({event}) => {

  const deleteEvent = (event) => {
    if (window.confirm('Are you sure?')) {
      Api.destroy(event.id, (event) => {
        console.log(event);
        window.alert('Event deleted successfully.');
      });
    }
  };

  return (
      <tr>
        <td>{event.start.date ? event.start.date : event.start.dateTime}</td>
        <td>{event.summary}</td>
        <td>{event.location}</td>
        <td className="text-center">
          <button type="button" className="btn btn-outline-warning text-right" onClick={e => deleteEvent(event)}>Delete
          </button>
        </td>
      </tr>
  );
};

export default EventListItem;
