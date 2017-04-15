import React from 'react';

export default function Estimate({etd}){
  const mins = formatMinutes(etd.minutes);
  const label = `${etd.dest.name}: ${mins}`;
  const className = `etds-list__etd -line-${etd.lineColor}`;
  return (
    <li className={className}>
      {label}
    </li>
  );
}

function formatMinutes(minutes){
  switch(minutes){
    case 0:
      return 'now';
    case 1:
      return '1 min';
    default:
      return `${minutes} mins`;
  }
}
