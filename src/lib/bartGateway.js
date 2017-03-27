const ETD_URL = "https://api.bart.gov/api/etd.aspx"
const API_KEY = "MW9S-E7SL-26DU-VV8V"

import * as stationsRepo from './stationsRepo';

export function fetchEtds(station){
  // yes, there are probably 413 npm modules to do this for me.
  const querySection = [
    'cmd=etd',
    `orig=${encodeURIComponent(station.abbr)}`,
    `key=${API_KEY}`
  ].join('&');

  const fullUrl = `${ETD_URL}?${querySection}`;

  return fetch(fullUrl)
    .then(parseXml)
    .then(parseEtds)
    .then(sortEtds);
}

function parseXml(response){
  return response.text().then(function (str) {
    return (new window.DOMParser()).parseFromString(str, "text/xml");
  });
}

function parseEtds(doc){
  return flatMapNodes(
    doc.getElementsByTagName('etd'),
    parseEtd
  );
}

function sortEtds(etds){
  return etds.sort( (a,b)=> a.minutes - b.minutes );
}

function parseEtd(etd){
  const destAbbr = pluckTextFromNode(etd, 'abbreviation');
  const destStation = stationsRepo.stationByAbbr(destAbbr);
  return mapNodes(etd.getElementsByTagName('estimate'), function(estimates){
    return {
      dest: destStation,
      minutes: parseMinutes(pluckTextFromNode(estimates,'minutes')),
      lineColor: pluckTextFromNode(estimates,'color').toLowerCase(),
      length: pluckTextFromNode(estimates,'length')
    };
  });
}

function mapNodes(nodes,fn){
  return Array.from(nodes).map(fn);
}

function flatMapNodes(nodes,fn){
  return Array.from(nodes).reduce(function(acc,val) {
    return acc.concat(fn(val));
  },[]);
}

function pluckTextFromNode(node, tagName){
  return node.getElementsByTagName(tagName)[0].textContent;
}
  
function parseMinutes(minutesString){
  const mins = parseInt(minutesString,10);
  return isNaN(mins) ? 0 : mins;
}

