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
        orientationFeedSubscribe={dummyOrientationSubscribe}
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
        orientationFeedSubscribe={dummyOrientationSubscribe}
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

  describe('orientation', () => {
    it('renders regular app when orientation is portrait', () => {
      let orientationCallback;
      function fakeOrientationFeedSubscribe(onOrientationChange){
        orientationCallback = onOrientationChange;
      }
      const appComponent = mount(<App
        orientationFeedSubscribe={fakeOrientationFeedSubscribe}
        locationFeedSubscribe={dummyLocationSubscribe}
      />);

      expect(appComponent.find('HomeScreen')).toBePresent();
      expect(appComponent.find('SystemMap')).not.toBePresent();

      orientationCallback('portrait-primary');

      expect(appComponent.find('HomeScreen')).toBePresent();
      expect(appComponent.find('SystemMap')).not.toBePresent();
    });

    it('displays system map when orientation is landscape', () => {
      let orientationCallback;
      function fakeOrientationFeedSubscribe(onOrientationChange){
        orientationCallback = onOrientationChange;
      }
      const appComponent = mount(<App
        orientationFeedSubscribe={fakeOrientationFeedSubscribe}
        locationFeedSubscribe={dummyLocationSubscribe}
      />);

      orientationCallback('landscape-secondary');

      expect(appComponent.find('HomeScreen')).not.toBePresent();
      expect(appComponent.find('SystemMap')).toBePresent();
    });
    
  });
});

function dummyLocationSubscribe(){
}

function dummyOrientationSubscribe(){
}
