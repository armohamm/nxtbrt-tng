import * as stationsRepo from './stationsRepo';

export function parseEtds(str){
  return parseEtdsFromXmlDoc(
    parseXml(str)
  );
}

const domParser = new window.DOMParser();

function parseXml(str){
  return domParser.parseFromString(str, "text/xml");
}

function parseEtdsFromXmlDoc(doc){
  return flatMapNodes(
    doc.getElementsByTagName('etd'),
    parseEtdNode
  );
}
function parseEtdNode(etd){
  const destAbbr = pluckTextFromNode(etd, 'abbreviation');
  const destStation = stationsRepo.stationByAbbr(destAbbr);
  return mapNodes(etd.getElementsByTagName('estimate'), function(estimates){
    return {
      dest: destStation,
      minutes: parseMinutes(pluckTextFromNode(estimates,'minutes')),
      lineColor: pluckTextFromNode(estimates,'color').toLowerCase(),
      length: parseInt(pluckTextFromNode(estimates,'length'),10)
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
