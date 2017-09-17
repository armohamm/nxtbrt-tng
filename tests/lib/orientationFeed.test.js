import {orientationFeedSubscribe} from '../../src/lib/orientationFeed';

describe('orientationFeed', () => {
  it('adds an event listener', () => {
    const spyOrientation = {
      addEventListener: jest.fn()
    };

    orientationFeedSubscribe(dummyHandler,{orientation:spyOrientation});

    expect(spyOrientation.addEventListener).toHaveBeenCalledWith('change',expect.anything());
  });

  it('calls handler with the initial orientation type', () => {
    const fakeOrientation = {
      addEventListener(){},
      type: 'initial orientation type'
    };

    const spyHandler = jest.fn();

    orientationFeedSubscribe(spyHandler,{orientation:fakeOrientation});

    expect(spyHandler).toHaveBeenCalledWith('initial orientation type');
  });

  it('calls handler with new orientation type when orientation changes', () => {
    const spyOrientation = {
      addEventListener: jest.fn()
    };

    const spyHandler = jest.fn();

    orientationFeedSubscribe(spyHandler,{orientation:spyOrientation});

    const internalHandler = spyOrientation.addEventListener.mock.calls[0][1];
    expect(internalHandler).toBeDefined();

    const fakeOrientationEvent = {
      target: {
        type: 'fake orientation type'
      }
    };

    internalHandler(fakeOrientationEvent);

    expect(spyHandler).toHaveBeenCalledWith('fake orientation type');
  });

});

function dummyHandler(){
}
