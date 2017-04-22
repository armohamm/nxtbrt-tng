import React from 'react';
import {shallow,mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import StationEtds from '../../src/components/StationEtds';

describe('StationEtds', function () {
  it('has header for station', function () {
    const station = {
      name: 'The Station'
    };

    const result = mount(
      <BrowserRouter>
        <StationEtds 
          station={station}
          etdFetcher={genericEtdResult}
        />
      </BrowserRouter>
    );

    const title = result.find('a.station-screen__title');
    expect(title).toBePresent();
    expect(title).toHaveText(station.name);
  });

  test('fetches etds', function () {
    const station = genericStation();

    const fetcherSpy = jest.fn();
    fetcherSpy.mockReturnValue(genericEtdResult());

    shallow(
      <StationEtds 
        station={station}
        etdFetcher={fetcherSpy}
      />
    );

    expect(fetcherSpy).toBeCalledWith(station);
  });

  test('initially has no etds', function () {
    const result = shallow(
      <StationEtds 
        station={genericStation()} 
        etdFetcher={genericEtdResult}
      />
    );

    expect(result).toHaveState('etds',false);
  });

  test('displays fetched etds', function () {
    const station = genericStation();
    const fetchedEtds = [];

    const eventualFetch = Promise.resolve(fetchedEtds);
    function fakeFetcher(){
      return eventualFetch;
    }

    const result = shallow(
      <StationEtds 
        station={station} 
        etdFetcher={fakeFetcher}
      />
    );

    return eventualFetch.then(function () {
      expect(result).toHaveState('etds',fetchedEtds);
    });
  });

  test('reports failure to fetch');
});

function genericStation(){
  return {
    name: 'Station Name'
  };
}

function genericEtdResult(){
  return Promise.resolve([]);
}
