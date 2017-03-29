import url from 'url';
import querystring from 'querystring';
import fetchMock from 'fetch-mock';
import {fetchEtds} from '../../src/lib/bartGateway';

describe('bartGateway', function () {
  afterEach(function () {
    fetchMock.restore();
  });

  test('fetches from the correct URL', function () {
    fetchMock.get('*',genericXmlResponse());

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

  function genericXmlResponse() {
    return '<xml>blah</xml>';
  }
});
