import React from 'react';
import STATIONS from '../stations_data'
import Stations from './Stations'

export default function App(){
  return (
    <div className="app">
      <Stations stations={STATIONS} />
    </div>
  );
}
