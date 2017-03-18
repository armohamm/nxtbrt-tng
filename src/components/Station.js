import React from 'react';

export default function Station({station}){
  return <li className="station">
      {station.name}
    </li>;
}
