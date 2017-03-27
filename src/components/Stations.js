import React, {PropTypes} from 'react';

import Station from './Station';
import STATIONS from '../stations_data';

export default function Stations({stations=STATIONS}){
  const listItems = stations.map( (station,ix) => <Station key={ix} station={station} /> );
  return (
    <ul className="station-list">
      {listItems}
    </ul>
  );
}

Stations.propTypes = {
  stations: PropTypes.array
}

