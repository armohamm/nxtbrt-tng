import React from 'react';

export default function Station({station}){
  return (
    <li className="station-list__station">
      {station.name}
    </li>
  );
}
