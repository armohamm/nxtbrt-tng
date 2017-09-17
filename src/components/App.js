import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import HomeScreen from './HomeScreen';
import SystemMap from './SystemMap';
import StationScreen from './StationScreen';

import * as stationsRepo from '../lib/stationsRepo';
import * as locationFeed from '../lib/locationFeed';
import {orientationFeedSubscribe} from '../lib/orientationFeed';

export default class App extends Component {
  constructor(){
    super();
    this.renderHomeRoute = this.renderHomeRoute.bind(this);
    this.renderStationRoute = this.renderStationRoute.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);

    this.state = {
      currLocation: false
    };
  }

  componentWillMount(){
    const locationFeedSubscribe = this.props.locationFeedSubscribe || locationFeed.locationFeedSubscribe;
    locationFeedSubscribe(this.handlePositionChange);
    
    this.props.orientationFeedSubscribe(this.handleOrientationChange);
  }

  render(){
    if( this.state.deviceOrientation === 'landscape' ){
      return <SystemMap />;
    }

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
    const stations = 
      this.state.currLocation ?
        this.props.stationsRepo.allStationsSortedByProximity(this.state.currLocation)
      :
        this.props.stationsRepo.allStations();

    return (
      <HomeScreen 
        stations={stations} 
        currLocation={this.state.currLocation}
      />
    );
  }

  renderStationRoute({match}){
    const station = this.props.stationsRepo.stationByAbbr(match.params.abbr);
    return (
      <StationScreen station={station}/>
    );
  }

  handlePositionChange(newPosition){
    this.setState({currLocation:newPosition.coords});
  }

  handleOrientationChange(newOrientationType){
    const deviceOrientation = newOrientationType.split('-')[0];
    this.setState({deviceOrientation});
  }
}

App.defaultProps = {
  stationsRepo,
  orientationFeedSubscribe
}

