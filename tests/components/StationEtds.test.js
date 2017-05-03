import React from 'react';
import {shallow,mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import StationEtds from '../../src/components/StationEtds';
import createEtd from '../generators/etd';

describe('StationEtds', function () {
  it('has header for station', function () {
    const station = {
      name: 'The Station'
    };

    const result = renderEtds({station});

    const title = result.find('a.station-screen__title');
    expect(title).toBePresent();
    expect(title).toHaveText(station.name);
  });

  it('shows loading treatment when there are no etds', function () {
    const result = renderEtds({etds:false});

    const loadingSpinner = result.find('.loading__spinner');
    expect(loadingSpinner).toBePresent();
  });

  it('shows etd list', function () {
    const etds = [
      createEtd(),
      createEtd(),
      createEtd()
    ];
    const result = renderEtds({etds});

    const loadingSpinner = result.find('.loading__spinner');
    expect(loadingSpinner).not.toBePresent();

    const etdItems = result.find('.etds-list__etd');
    expect(etdItems).toHaveLength(3);
  });
});

function renderEtds({station=genericStation(),etds=false}){
  return mount(
    <BrowserRouter>
      <StationEtds 
        station={station}
        etds={etds}
      />
    </BrowserRouter>
  );
}

function genericStation(){
  return {
    name: 'Station Name'
  };
}
