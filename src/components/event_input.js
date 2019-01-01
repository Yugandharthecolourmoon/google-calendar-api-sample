import React, { Component } from 'react';
import DateTime from 'react-datetime';
import * as moment from 'moment';
import 'moment-timezone';
import Utils from '../Utils';

class EventInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: "",
      startTime: new Date(),
      hasSent: false,
      newEvent: ""
    }
  }

  typingEvent(summary) {
    this.setState({
      summary,
      hasSent: false
    });
  }

  onPressEnter(key) {
    if (key === "Enter") {
      if (!this.state.summary || this.state.summary.trim() === '') {
        alert("Event summary is required.");
        return;
      }
      const offset = Utils.getTimezone();
      const eventDate = moment(this.state.startTime).format('YYYY-MM-DDTHH:mm:ss') + offset;
      window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: {
          summary: this.state.summary,
          start: {
            dateTime: eventDate,
            timeZone: moment.tz.guess()
          },
          end: {
            dateTime: eventDate,
            timeZone: moment.tz.guess()
          },
          recurrence: [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 10 },
            ],
          },
        }
      }).then(event => {
        this.setState({
          newEvent: event.summary,
          summary: "",
          hasSent: true
        });
        this.props.onFetchClick(this.state.startTime);
        window.alert('New event added successfully.');
      }, error => {
        console.log(error);
        window.alert('Unable to create event.');
      })
    }
  }

  onFetchClick() {
    this.props.onFetchClick(this.state.startTime);
  }

  onSignoutClick() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label>Event Date</label>
              <DateTime value={this.state.startTime} onChange={value => {
                this.setState({ startTime: new Date(value) })
              }} />
            </div>
          </div>
          <div className="col-md-7">
            <div className="form-group">
              <label>Event summary</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your new task and press enter."
                  value={this.state.summary}
                  onChange={e => this.typingEvent(e.target.value)}
                  onKeyPress={e => this.onPressEnter(e.key)} />
              </div>
            </div>
          </div>
          <div className="col-md-2 text-right">
            <div className="form-group">
              <label className="col-md-12">&nbsp;</label>
              <button type="button" className="btn btn-success" onClick={e => this.onPressEnter("Enter")}>
                Add Event
                </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 p-3">
            <button type="button" className="btn btn-primary" onClick={e => this.onFetchClick()}>
              Refresh and Fetch Events
              </button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={e => this.onSignoutClick()}>
              Signout
              </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EventInput;
