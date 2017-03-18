import React from 'react';

import Station from './Station';

export default function Stations({stations}){
  const listItems = stations.map( (station) => <Station station={station}/> );
  return (
    <ul className="station-list">
      {listItems}
    </ul>
  );
}
