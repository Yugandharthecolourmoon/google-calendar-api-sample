import React from 'react';
import EventListItem from './event_list_item';

const EventList = ({ events, onUpdate }) => {
  const removeEvent = id => {
    let index = -1;
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === id) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      events.splice(index, 1);
    }
    EventListItems = [];
    mapEvents();
    onUpdate();
  }
  let EventListItems = [];
  const mapEvents = () => {
    EventListItems = events.map(event => {
      return (
        <EventListItem key={event.id} event={event} onRemove={removeEvent} />
      );
    });
  }
  mapEvents();
  const NoEventList = <tr>
    <td className="text-center" colSpan={4}>No events found.</td>
  </tr>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Event date</th>
                  <th>Summary</th>
                  <th>Attendees</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {EventListItems.length > 0 ? EventListItems : NoEventList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
