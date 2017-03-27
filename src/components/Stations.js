import React, {PropTypes} from 'react';

import Station from './Station';

export default function Stations({stations}){
  const listItems = stations.map( (station,ix) => <Station key={ix} station={station} /> );
  return (
    <ul className="station-list">
      {listItems}
    </ul>
  );
}

Stations.propTypes = {
  stations: PropTypes.array.isRequired
}

