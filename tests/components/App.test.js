import React from 'react';
import {shallow,mount} from 'enzyme';

import App from '../../src/components/App';

describe('App', function () {
  describe('route /', function () {
    it('renders HomeScreen',function () {
      const fakeStations = [{},{},{},{}]
      const fakeStationsRepo = {
        allStations(){ return fakeStations; }
      };

      const appComponent = mount(<App
        locationFeedSubscribe={dummyLocationSubscribe}
        stationsRepo={fakeStationsRepo}
      />);

      const rootRoute = appComponent.find('Route').filterWhere(function (node) {
        return node.prop('path') === '/';
      });

      const stations = rootRoute.find('HomeScreen');
      expect(stations).toBePresent();
    });
  });

  describe('route /s/:abbr', function () {
    it('renders a specific station');
    it('gracefully handles a bad abbr');
  });

  describe('geolocation', function () {
    it('shows station list sorted by proximity, iff location is availabe', () => {
      let locationCallback;
      function fakeLocationSubscribe(onLocationChange){
        locationCallback = onLocationChange;
      }

      const unsortedStations = [{},{},{}];
      const sortedStations = [{},{}];

      const fakeStationsRepo = {
        allStations(){ return unsortedStations; },
        allStationsSortedByProximity(){ return sortedStations; }
      };

      const appComponent = mount(<App
        locationFeedSubscribe={fakeLocationSubscribe}
        stationsRepo={fakeStationsRepo}
      />);

      const stationsComponent = appComponent.find('HomeScreen');
      expect(stationsComponent).toBePresent();

      expect(stationsComponent).toHaveProp('stations',unsortedStations);

      const fakePosition = {coords:{}};
      locationCallback(fakePosition);

      expect(stationsComponent).toHaveProp('stations',sortedStations);
    });
  });
});

function dummyLocationSubscribe(){
}
