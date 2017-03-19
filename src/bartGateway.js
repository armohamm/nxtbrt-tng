const ETD_URL = "https://api.bart.gov/api/etd.aspx"
const API_KEY="MW9S-E7SL-26DU-VV8V"

export function fetchEtds(station){
  // yes, there are probably 413 npm modules to do this for me.
  const querySection = [
    'cmd=etd',
    `orig=${encodeURIComponent(station.abbr)}`,
    `key=${API_KEY}`
  ].join('&');

  const fullUrl = `${ETD_URL}?${querySection}`;

  return fetch(fullUrl);
}
