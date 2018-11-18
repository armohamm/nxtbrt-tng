import haversine from 'haversine';
import RAW_STATIONS from './raw_stn.json';

const STATIONS = RAW_STATIONS.root.stations.station.map( (raw)=> {
  return {
    name: raw.name,
    abbr: raw.abbr,
    latitude: raw.gtfs_latitude,
    longitude: raw.gtfs_longitude
  };
});

export function allStations(){
  return STATIONS.slice(0);
}

export function allStationsSortedByProximity(coords){
  return allStations().sort( function(a,b){
    return haversine(coords,a) - haversine(coords,b);
  });
}

export function stationByAbbr(targetAbbr){
  targetAbbr = targetAbbr.toUpperCase();
  return allStations().find( (station)=> station.abbr === targetAbbr );
}
