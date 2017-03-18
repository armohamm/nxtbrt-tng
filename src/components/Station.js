import React, {PropTypes} from 'react';

export default function Station({station,onSelected}){
  return (
    <li className="station-list__station" onClick={()=>onSelected(station)}>
      {station.name}
    </li>
  );
}

Station.propTypes = {
  station: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired
}

