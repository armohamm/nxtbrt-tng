import {locationFeedSubscribe} from '../../src/lib/locationFeed';

describe('locationFeed', function () {
  it('starts a geolocation watch with the appropriate options', function () {
    const spyGeolocation = {
      watchPosition: jest.fn()
    };

    locationFeedSubscribe(dummyHandler,{geolocation:spyGeolocation});

    expect(spyGeolocation.watchPosition).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      {
        maximumAge: 300000 // 5 mins
      }
    );
  });

  it('passes position updates through to provided handler', function () {
    const spyGeolocation = {
      watchPosition: jest.fn()
    };
    const spyPositionHandler = jest.fn();

    locationFeedSubscribe(spyPositionHandler,{geolocation:spyGeolocation});
    const locationSuccessHandler = spyGeolocation.watchPosition.mock.calls[0][0];
    expect(locationSuccessHandler).toBeDefined();

    expect(spyPositionHandler).not.toHaveBeenCalled();

    const fakePosition = { coords:{} };
    locationSuccessHandler(fakePosition);

    expect(spyPositionHandler).toHaveBeenCalledWith(fakePosition);
  });

  it('logs and swallows location errors', function () {
    const spyGeolocation = {
      watchPosition: jest.fn(),
      clearWatch(){}
    };
    const spyConsole = {
      error: jest.fn()
    };
    const spyPositionHandler = jest.fn();

    locationFeedSubscribe(spyPositionHandler,{geolocation:spyGeolocation,console:spyConsole});
    const errorHandler = spyGeolocation.watchPosition.mock.calls[0][1];
    expect(errorHandler).toBeDefined();

    errorHandler('fake PositionError');

    expect(spyPositionHandler).not.toHaveBeenCalled();
    expect(spyConsole.error).toHaveBeenCalledWith(expect.any(String),'fake PositionError');
  });

  it('stops watching after an error', function () {
    const mockGeolocation = {
      watchPosition: jest.fn().mockReturnValue('the watch id'),
      clearWatch: jest.fn()
    };
    const dummyConsole = {
      error(){}
    };
    locationFeedSubscribe(dummyHandler,{geolocation:mockGeolocation,console:dummyConsole});

    const errorHandler = mockGeolocation.watchPosition.mock.calls[0][1];
    expect(errorHandler).toBeDefined();

    expect(mockGeolocation.clearWatch).not.toHaveBeenCalled();

    errorHandler();

    expect(mockGeolocation.clearWatch).toHaveBeenCalledWith('the watch id');
  });

  it("stops watching once report locations' accuracy gets within 500m", function () {
    const mockGeolocation = {
      watchPosition: jest.fn().mockReturnValue('the watch id'),
      clearWatch: jest.fn()
    };
    locationFeedSubscribe(dummyHandler,{geolocation:mockGeolocation});

    const successHandler = mockGeolocation.watchPosition.mock.calls[0][0];
    expect(successHandler).toBeDefined();

    successHandler({
      coords:{
        accuracy: 501
      }
    });

    expect(mockGeolocation.clearWatch).not.toHaveBeenCalled();

    successHandler({
      coords:{
        accuracy: 500
      }
    });

    expect(mockGeolocation.clearWatch).toHaveBeenCalledWith('the watch id');
  });
});

function dummyHandler(){
}
