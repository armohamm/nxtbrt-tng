import {locationFeedSubscribe} from '../../src/lib/locationFeed';

xdescribe('locationFeed', function () {
  describe('feed subscription', function () {
    it('starts a geolocation watch', function () {
      const spyGeolocation = {
        watchPosition: jest.fn()
      };

      locationFeedSubscribe(dummyCallback,spyGeolocation);

      expect(spyGeolocation.watchPosition).toHaveBeenCalled();
    });
  });
});

function dummyCallback(){
}
