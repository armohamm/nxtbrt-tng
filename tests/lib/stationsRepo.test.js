import * as stationsRepo from '../../src/lib/stationsRepo';

describe('stationsRepo', function () {
  describe('allStations()', function () {
    test('returns an array of stations', function () {
      const stations = stationsRepo.allStations();
      expect(stations).to.be.an('array');
      stations.forEach( function(station){
        expect(station).to.include.keys('name','abbr','lat','long');
      });
    });
  });
});
