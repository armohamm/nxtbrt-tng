import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {fetchEtds} from '../lib/bartGateway';

export default class StationEtds extends Component{
  constructor(){
    super();
    this.state = {etds:false};
  }

  componentWillMount(){
    fetchEtds(this.props.station)
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
        <Link to="/">
          <h1 className="station-screen__title">
            {this.props.station.name}
          </h1>
        </Link>
        <div className="station-screen__body">
          <Body etds={this.state.etds}/>
        </div>
      </section>
    );
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

function Estimate({etd}){
  const label = `${etd.dest.name}: ${etd.minutes}`;
  const className = `etds-list__etd -line-${etd.lineColor}`;
  return (
    <li className={className}>
      {label}
    </li>
  );
}
