import React, { Component } from 'react';
import * as moment from 'moment';
import './App.css';
import Utils from './Utils';

import EventList from './components/event_list';
import EventInput from './components/event_input';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadEvents = this.loadEvents.bind(this);
    this.state = {
      events: [],
      hasBeenModified: false,
      isSignedIn: false,
      isPageLoaded: false,
      msg: 'Loading...'
    };
    //this.loadEvents();
    setTimeout(() => {
      window.gapi.load('client:auth2', {
        callback: () => {
          this.initClient();
          this.setState({ isPageLoaded: true });
        },
        onerror: () => {
          this.setState({ msg: 'gapi.client failed to load!' });
          this.setState({ isPageLoaded: true });
        },
        timeout: 5000, // 5 seconds.
        ontimeout: () => {
          this.setState({ msg: 'gapi.client could not load in a timely manner!' });
          this.setState({ isPageLoaded: true });
        }
      });
    }, 5000);
  }

  initClient() {
    window.gapi.client.init({
      apiKey: 'AIzaSyBIPmDnaGfxGZ-8sKhR6a2VQRZUyz_MXLM',
      clientId: '771418243410-n0noh0esdafks1bm0odaill4hc3btksu.apps.googleusercontent.com',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar"
    }).then(() => {
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
        this.updateSigninStatus(isSignedIn);
      });
      // Handle the initial sign-in state.
      this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    }, error => {
      this.setState({ msg: JSON.stringify(error, null, 2) });
    });
  }

  updateSigninStatus(isSignedIn) {
    this.setState({ isSignedIn: isSignedIn });
    if (isSignedIn) {
      this.loadEvents(new Date());
    }
  }

  loadEvents(newDate) {
    if (!newDate) {
      newDate = new Date();
    }
    const date = moment(newDate).format("YYYY-MM-DD");
    const offset = Utils.getTimezone();
    window.gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: date + 'T00:00:00' + offset,
      timeMax: date + 'T23:59:59' + offset,
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    }).then(response => {
      var events = response.result.items;
      this.setState({ events, shouldReload: false });
    });
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  signInClick() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  render() {
    return (
      <div className="App">
        {this.state.isPageLoaded === true ?
          <div className="container">
            {this.state.isSignedIn === true ?
              <div className="container">
                <EventInput onFetchClick={newDate => this.loadEvents(newDate)} />
                <EventList events={this.state.events} onUpdate={() => this.forceUpdateHandler()} />
              </div>
              :
              <div className="container text-center">
                <button className="btn btn-danger" onClick={this.signInClick}>Singin with Google</button>
              </div>
            }
          </div>
          :
          <h2>{this.state.msg}</h2>
        }
      </div>
    );
  }
}

export default App;
