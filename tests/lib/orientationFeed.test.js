import {orientationFeedSubscribe} from '../../src/lib/orientationFeed';

describe('orientationFeed', () => {
  it('calls handler after it determines that the device has a gyro, then each time orientation changes', () => {
    const spyDetectGyro = createDetectGyroSpy();
    const fakeOrientation = createFakeOrientation();

    const spyHandler = jest.fn();

    orientationFeedSubscribe(spyHandler,{orientation:fakeOrientation.fake,detectGyro:spyDetectGyro.spy});


    expect(spyHandler).not.toHaveBeenCalled();


    fakeOrientation.simulateOrientationChange('1st-orientation');
    expect(spyHandler).not.toHaveBeenCalled();


    fakeOrientation.simulateOrientationChange('2nd-orientation');
    expect(spyHandler).not.toHaveBeenCalled();


    spyDetectGyro.simulateGyroDetection(true);
    expect(spyHandler).toHaveBeenCalledWith('2nd-orientation');


    fakeOrientation.simulateOrientationChange('3rd-orientation');
    expect(spyHandler).toHaveBeenCalledWith('3rd-orientation');
  });


  it('never calls handler if it determines that the device has no gyro', () => {
    const spyDetectGyro = createDetectGyroSpy();
    const fakeOrientation = createFakeOrientation();

    const spyHandler = jest.fn();

    orientationFeedSubscribe(spyHandler,{orientation:fakeOrientation.fake,detectGyro:spyDetectGyro.spy});


    expect(spyHandler).not.toHaveBeenCalled();


    fakeOrientation.simulateOrientationChange('1st-orientation');
    expect(spyHandler).not.toHaveBeenCalled();


    spyDetectGyro.simulateGyroDetection(false);
    expect(spyHandler).not.toHaveBeenCalled();


    fakeOrientation.simulateOrientationChange('2nd-orientation');
    expect(spyHandler).not.toHaveBeenCalled();
  });
});

function createDetectGyroSpy(){
  const spy = jest.fn();

  function simulateGyroDetection(hasGyro){
    expect(spy).toHaveBeenCalled();
    const handler = spy.mock.calls[0][0];
    expect(handler).toBeDefined();

    handler(hasGyro);
  }

  return {spy,simulateGyroDetection};
}

function createFakeOrientation(){
    const fakeOrientation = {
      addEventListener: jest.fn()
    };

  function simulateOrientationChange(newOrientationType){
    expect(fakeOrientation.addEventListener).toHaveBeenCalled();
    const handler = fakeOrientation.addEventListener.mock.calls[0][1];
    expect(handler).toBeDefined();

    // when orientation changes it's `type` field gets updated AND an event fires
    fakeOrientation.type = newOrientationType;
    
    const fakeOrientationEvent = {
      target: {
        type: newOrientationType
      }
    };
    handler(fakeOrientationEvent);
  }

  return {fake:fakeOrientation,simulateOrientationChange};
}

function dummyHandler(){
}
