const STATION_SELECTED='nxtbrt/station/selected';

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

export function selectStations(station) {
  return {
    type: STATION_SELECTED,
    station: station
  };
}
