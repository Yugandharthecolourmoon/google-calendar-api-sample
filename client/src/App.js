import React, {Component} from 'react';
import './App.css';
import Api from './Api';

import EventList from './components/event_list';
import EventInput from './components/event_input';

class App extends Component {
  constructor(props) {
    super(props);
    this.loadEvents = this.loadEvents.bind(this);
    this.state = {
      events: [],
      hasBeenModified: false
    };
    this.loadEvents();
  }

  loadEvents(newDate) {
    if (!newDate) {
      newDate = new Date();
    }
    Api.index(newDate, events => {
      console.log(events);
      this.setState({events, shouldReload: false});
    });
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  render() {
    return (
        <div className="App">
          <EventInput onFetchClick={newDate => this.loadEvents(newDate)}/>
          <EventList events={this.state.events} onClick={this.forceUpdateHandler}/>
        </div>
    );
  }
}

export default App;
