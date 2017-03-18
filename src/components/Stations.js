import React from 'react';
import {connect} from 'react-redux';

import Station from './Station';

import {selectStations} from '../ducks/station';

export default connect(mapStateToProps,mapDispatchToProps)(Stations);

function mapStateToProps(state) {
  return {
    stations: state.stations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onStationSelected(station){
      return dispatch(selectStations(station));
    }
  }
}

function Stations({stations, onStationSelected}){
  const listItems = stations.map( (station,ix) => <Station key={ix} station={station} onSelected={onStationSelected} /> );
  return (
    <ul className="station-list">
      {listItems}
    </ul>
  );
}

