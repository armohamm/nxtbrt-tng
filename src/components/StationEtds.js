import React from 'react';
import {Link} from 'react-router-dom';

export default function StationEtds({station}){
  return (
    <section className="station-screen">
      <Link to="/">
        <h1 className="station-screen__title">
          {station.name}
        </h1>
      </Link>
    </section>
  );
}

