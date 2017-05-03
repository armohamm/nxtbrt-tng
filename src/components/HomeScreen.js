import React from 'react';
import PropTypes from 'prop-types';

import Station from './Station';

export default function HomeScreen({stations}){
  const listItems = stations.map( (station,ix) => <Station key={ix} station={station} /> );
  return (
    <ul className="station-list">
      {listItems}
    </ul>
  );
}

HomeScreen.propTypes = {
  stations: PropTypes.array.isRequired
}

