import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Stations from './Stations';
import StationEtds from './StationEtds';

export default class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Route path="/" exact component={Stations} />
          <Route path="/s/:stationAbbr" render={()=>this.renderEtdsRoute()} />
        </div>
      </Router>
    );
  }

  renderEtdsRoute(){
    const fakeStation = {
      name: 'blah'
    };
    return (
      <StationEtds station={fakeStation}/>
    );
  }
}

