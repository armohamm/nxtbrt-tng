import React from 'react';
import {shallow,mount} from 'enzyme';

import App from '../../src/components/App';

describe('App', function () {
  describe('route /', function () {
    it('renders Stations',function () {
      const appComponent = mount(<App
        locationFeedSubscribe={dummyLocationSubscribe}
      />);

      const rootRoute = appComponent.find('Route').filterWhere(function (node) {
        return node.prop('path') === '/';
      });

      const stations = rootRoute.find('Stations');

      expect(stations).toBePresent();
      expect(stations).toHaveProp('stations');
    });
  });

  describe('route /s/:abbr', function () {
    it('renders a specific station');
    it('gracefully handles a bad abbr');
  });

  describe('geolocation', function () {
    it('updates stations list with location when it changes', function () {
      let locationCallback;
      function fakeLocationSubscribe(onLocationChange){
        locationCallback = onLocationChange;
      }

      const appComponent = mount(<App
        locationFeedSubscribe={fakeLocationSubscribe}
      />);

      const stationsComponent = appComponent.find('Stations');
      expect(stationsComponent).toBePresent();

      expect(stationsComponent).toHaveProp('currLocation',false);
      locationCallback('some-new-location');
      expect(stationsComponent).toHaveProp('currLocation','some-new-location');
    });
  });
});

function dummyLocationSubscribe(){
}
