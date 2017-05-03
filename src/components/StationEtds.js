import React from 'react';
import {Link} from 'react-router-dom';

import Estimate from './Estimate';

export default function StationEtds({station,etds}){
  return (
    <section className="station-screen">
      <Header station={station}/>
      <div className="station-screen__body">
        <Body etds={etds}/>
      </div>
    </section>
  );
}

function Header({station}){
  return (
    <Link to="/" className="station-screen__title">
      {station.name}
    </Link>
  );
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
