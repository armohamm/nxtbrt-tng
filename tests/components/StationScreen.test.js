import React from 'react';
import {shallow} from 'enzyme';

import StationScreen from '../../src/components/StationScreen';

describe('StationScreen', function () {
  test('fetches etds', function () {
    const station = genericStation();

    const fetcherSpy = jest.fn();
    fetcherSpy.mockReturnValue(genericEtdResult());

    shallow(
      <StationScreen 
        station={station}
        etdFetcher={fetcherSpy}
      />
    );

    expect(fetcherSpy).toBeCalledWith(station);
  });

  test('initially has no etds', function () {
    const result = shallow(
      <StationScreen 
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
      <StationScreen 
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
