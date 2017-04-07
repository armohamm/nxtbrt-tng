const ETD_URL = "https://api.bart.gov/api/etd.aspx"
const API_KEY = "MW9S-E7SL-26DU-VV8V"

import {parseEtds} from './bartParser';

export function fetchEtds(station){
  // yes, there are probably 413 npm modules to do this for me.
  const querySection = [
    'cmd=etd',
    `orig=${encodeURIComponent(station.abbr)}`,
    `key=${API_KEY}`
  ].join('&');

  const fullUrl = `${ETD_URL}?${querySection}`;

  return fetch(fullUrl)
    .then( response => response.text() )
    .then( parseEtds )
    .then( sortEtds );
}

function sortEtds(etds){
  return etds.sort( (a,b)=> a.minutes - b.minutes );
}
