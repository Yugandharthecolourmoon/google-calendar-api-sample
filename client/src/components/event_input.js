import React, {Component} from 'react';
import DateTime from 'react-datetime';
import Api from '../Api';

class EventInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: "",
      startTime: new Date().getTime(),
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
      if(!this.state.summary || this.state.summary.trim() === ''){
        alert("Event summary is required.");
        return;
      }
      const options = {
        summary: this.state.summary,
        date: this.state.startTime
      };
      Api.create(options, (event) => {
        this.setState({
          newEvent: event.summary,
          summary: "",
          hasSent: true
        });
        window.alert('New event added successfully.');
      });
    }
  }

  onFetchClick() {
      this.props.onFetchClick(this.state.startTime);
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Event Date</label>
                <DateTime utc={true} value={this.state.startTime} onChange={value => {
                  this.setState({startTime: (new Date(value)).getTime()})
                }}/>
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
                      onKeyPress={e => this.onPressEnter(e.key)}/>
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
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export default EventInput;
