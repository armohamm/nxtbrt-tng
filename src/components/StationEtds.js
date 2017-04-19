import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {fetchEtds} from '../lib/bartGateway';
import Estimate from './Estimate';

export default class StationEtds extends Component{
  constructor(){
    super();
    this.state = {etds:false};
  }

  componentWillMount(){
    this.fetchEtds()
      .then( (etds)=> {
        this.setState({ etds });
      })
      .catch( function(err){
        console.error(err); // TODO: handle catch
      });
  }

  render(){
    return (
      <section className="station-screen">
        <Link to="/" className="station-screen__title">
          {this.props.station.name}
        </Link>
        <div className="station-screen__body">
          <Body etds={this.state.etds}/>
        </div>
      </section>
    );
  }

  fetchEtds(){
    // TODO
    return Promise.reject('slime');
  }
}

function Body({etds}){
  if( !etds ){
    return <Loading/>;
  }

  const items = etds.map( (etd,ix) => <Estimate key={ix} etd={etd} /> );
  return (
    <ul className="etds-list">
      {items}
    </ul>
  );
}

function Loading(){
  return (
    <div className="loading__spinner"/>
  );
}
