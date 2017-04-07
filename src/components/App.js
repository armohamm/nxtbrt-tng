import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import Stations from './Stations';
import StationEtds from './StationEtds';

import * as stationsRepo from '../lib/stationsRepo';

export default class App extends Component {
  constructor(){
    super();
    this.renderStationsRoute = this.renderStationsRoute.bind(this);
    this.renderEtdsRoute = this.renderEtdsRoute.bind(this);
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
      <Stations stations={stationsRepo.allStations()} />
    );
  }

  renderEtdsRoute({match}){
    const station = stationsRepo.stationByAbbr(match.params.abbr);
    return (
      <StationEtds station={station}/>
    );
  }
}

