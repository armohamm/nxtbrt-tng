import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import Stations from './Stations';
import StationScreen from './StationScreen';

import * as stationsRepo from '../lib/stationsRepo';
import * as locationFeed from '../lib/locationFeed';

export default class App extends Component {
  constructor(){
    super();
    this.renderStationsRoute = this.renderStationsRoute.bind(this);
    this.renderEtdsRoute = this.renderEtdsRoute.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);

    this.state = {
      currLocation: false
    };
  }

  componentWillMount(){
    const locationFeedSubscribe = this.props.locationFeedSubscribe || locationFeed.locationFeedSubscribe;
    locationFeedSubscribe(this.handleLocationChange);
  }

  render(){
    return (
      <Router>
        <div>
          <Route path="/" exact render={this.renderStationsRoute} />
          <Route path="/s/:abbr" render={this.renderEtdsRoute} />
        </div>
      </Router>
    );
  }

  renderStationsRoute(){
    return (
      <Stations 
        stations={stationsRepo.allStations()} 
        currLocation={this.state.currLocation}
      />
    );
  }

  renderEtdsRoute({match}){
    const station = stationsRepo.stationByAbbr(match.params.abbr);
    return (
      <StationScreen station={station}/>
    );
  }

  handleLocationChange(newLocation){
    this.setState({currLocation:newLocation});
  }
}

