import {orientationFeedSubscribe} from '../../src/lib/orientationFeed';

describe('orientationFeed', () => {
  it('adds an event listener', () => {
    const spyOrientation = {
      addEventListener: jest.fn()
    };

    orientationFeedSubscribe(dummyHandler,{orientation:spyOrientation});

    expect(spyOrientation.addEventListener).toHaveBeenCalledWith('change',expect.anything());
  });

  it('calls handler with orientation', () => {
    const spyOrientation = {
      addEventListener: jest.fn()
    };

    const spyHandler = jest.fn();

    orientationFeedSubscribe(spyHandler,{orientation:spyOrientation});

    const internalHandler = spyOrientation.addEventListener.mock.calls[0][1];
    expect(internalHandler).toBeDefined();

    except(spyHandler).not.toHaveBeenCalled();

    internalHandler(fakeOrientationEvent);

    except(spyHandler).toHaveBeenCalled();
  });
});

function dummyHandler(){
}
