import React from 'react';
import systemMapImage from '../images/BART_cc_map.png';

export default function SystemMap(){
  return (
    <img className="system-map__img" src={systemMapImage} alt="BART System Map" />
  );
}
