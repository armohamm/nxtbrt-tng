import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import HomeScreen from './HomeScreen';
import StationScreen from './StationScreen';

import * as stationsRepo from '../lib/stationsRepo';
import * as locationFeed from '../lib/locationFeed';

export default class App extends Component {
  constructor(){
    super();
    this.renderHomeRoute = this.renderHomeRoute.bind(this);
    this.renderStationRoute = this.renderStationRoute.bind(this);
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
          <Route path="/" exact render={this.renderHomeRoute} />
          <Route path="/s/:abbr" render={this.renderStationRoute} />
        </div>
      </Router>
    );
  }

  renderHomeRoute(){
    return (
      <HomeScreen 
        stations={stationsRepo.allStations()} 
        currLocation={this.state.currLocation}
      />
    );
  }

  renderStationRoute({match}){
    const station = stationsRepo.stationByAbbr(match.params.abbr);
    return (
      <StationScreen station={station}/>
    );
  }

  handleLocationChange(newLocation){
    this.setState({currLocation:newLocation});
  }
}

