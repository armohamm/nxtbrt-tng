import url from 'url';
import querystring from 'querystring';
import fetchMock from 'fetch-mock';
import {fetchEtds} from '../../src/lib/bartGateway';

import {ETD_RESPONSE} from '../fixtures';

describe('bartGateway', function () {

  afterEach(function () {
    fetchMock.restore();
  });

  test('fetches from the correct URL', function () {
    fetchMock.get('*',ETD_RESPONSE);

    const fakeStation = {
      abbr: 'some-abbr' 
    };

    return fetchEtds(fakeStation)
    .then(function () {
      const requestedUrl = url.parse(fetchMock.lastUrl());

      expect(requestedUrl).toHaveProperty('host','api.bart.gov');
      expect(requestedUrl).toHaveProperty('pathname','/api/etd.aspx');

      const query = querystring.parse(requestedUrl.query);
      expect(query).toHaveProperty('cmd','etd');
      expect(query).toHaveProperty('key');
      expect(query).toHaveProperty('orig',fakeStation.abbr);
    });
  });

  test('parses an XML response into a set of stations, sorted by etd', function () {
    fetchMock.get('*',ETD_RESPONSE);
    
    return fetchEtds({abbr:'blah'})
    .then(function (etds) {
      expect(etds).toBeInstanceOf(Array);

      const firstEtd = etds[0];
      expect(firstEtd).toHaveProperty('minutes',4);
      expect(firstEtd).toHaveProperty('lineColor','red');
      expect(firstEtd).toHaveProperty('dest.abbr','RICH');
    });
  });
});
