import * as stationsRepo from '../../src/lib/stationsRepo';

describe('stationsRepo', function () {
  describe('allStations()', function () {
    test('returns an array of stations', function () {
      const stations = stationsRepo.allStations();
      expect(stations).toBeInstanceOf(Array);
      stations.forEach( function(station){
        expect(station).toHaveProperty('name');
        expect(station).toHaveProperty('abbr');
        expect(station).toHaveProperty('latitude');
        expect(station).toHaveProperty('longitude');
      });
    });
  });

  describe('allStationsSortedByProximity', () => {
    it('returns a correctly sorted array of stations', () => {
      const coords = {
        latitude: 37.8411,
        longitude: -122.2749
      };
      const stations = stationsRepo.allStationsSortedByProximity(coords);
      expect(stations).toHaveLength( stationsRepo.allStations().length );
      expect(stations[0].abbr).toEqual('ASHB');
      expect(stations[1].abbr).toEqual('MCAR');
      expect(stations[2].abbr).toEqual('ROCK');
      expect(stations[3].abbr).toEqual('DBRK');
    });
  });

  describe('stationByAbbr', function () {
    test('returns undefined when station with specified abbr does not exist', function () {
      const result = stationsRepo.stationByAbbr('bad-abbr');
      expect(result).not.toBeDefined();
    });
    
    test('returns the specified station', function () {
      const station = stationsRepo.stationByAbbr('WOAK');
      expect(station).toBeDefined();
      expect(station).toHaveProperty('abbr','WOAK');
      expect(station).toHaveProperty('name','West Oakland');
      expect(station).toHaveProperty('latitude');
      expect(station).toHaveProperty('longitude');
    });

    test('abbr is case insensitive', function () {
      const station = stationsRepo.stationByAbbr('WOaK');
      expect(station).toBeDefined();
      expect(station).toHaveProperty('abbr','WOAK');
    });
  });
});
