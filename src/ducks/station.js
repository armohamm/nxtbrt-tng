import * as BartGateway from '../bartGateway';

const STATION_SELECTED='nxtbrt/station/STATION_SELECTED';
const ETDS_AVAILABLE='nxtbrt/station/ETDS_AVAILABLE';

export default function reducer(state={},action={}) {
  switch(action.type){
    case STATION_SELECTED: 
      return Object.assign(
        {},
        state,
        {selectedStation:action.station}
      );
    default: 
      return state;
  }
}

function stationSelected(station) {
  return {
    type: STATION_SELECTED,
    station
  };
}

function etdsAvailable(station,etds) {
  return {
    type: ETDS_AVAILABLE,
    station,
    etds
  };
}

export function selectStations(station) {
  return function(dispatch){
    dispatch( stationSelected(station) );

    return BartGateway.fetchEtds(station)
    .then(function (etds) {
      dispatch( etdsAvailable(station,etds) );
    });
  };
}
