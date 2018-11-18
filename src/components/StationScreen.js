import React, {Component} from 'react';

import {fetchEtds} from '../lib/bartGateway';

import StationEtds from './StationEtds';

// Container component
export default class StationScreenContainer extends Component{
  constructor(){
    super();
    this.state = {etds:false};
  }

  componentWillMount(){
    return this.fetchEtds()
      .then( (etds)=> {
        this.setState({ etds });
      });
  }

  render(){
    return (
      <StationEtds 
        station={this.props.station}
        etds={this.state.etds}
        />
    );
  }

  fetchEtds(){
    const fetcher = this.props.etdFetcher || fetchEtds;
    return fetcher(this.props.station);
  }
}
