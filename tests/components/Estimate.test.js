import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';

import Estimate from '../../src/components/Estimate';


function render(component){
  const renderer = new ReactShallowRenderer();
  renderer.render(component);
  return renderer.getRenderOutput();
}

describe('Estimate', function () {
  test('has correct class names', function () {
    const etd = createEtd({
      lineColor: 'some-color'
    });
    const result = render(<Estimate etd={etd}/>);
    expect(result.props.className).toMatch('etds-list__etd');
    expect(result.props.className).toMatch('-line-some-color');
  });


  describe('label', function () {
    test('2 mins', function () {
      const etd = createEtd({
        minutes: 2,
        dest: {
          name: 'Morden'
        }
      });
      const result = render(<Estimate etd={etd}/>);
      expect(result.props.children).toBe('Morden: 2 mins');
    });

    test('1 min', function () {
      const etd = createEtd({
        minutes: 1,
        dest: {
          name: 'Morden'
        }
      });
      const result = render(<Estimate etd={etd}/>);
      expect(result.props.children).toBe('Morden: 1 min');
    });

    test('now', function () {
      const etd = createEtd({
        minutes: 0,
        dest: {
          name: 'Morden'
        }
      });
      const result = render(<Estimate etd={etd}/>);
      expect(result.props.children).toBe('Morden: now');
    });
  });
});

function createEtd(overrides={}){
  return Object.assign(
    {
      minutes: 10,
      dest: {
        name: 'blah'
      },
      lineColor: 'blah'
    },
    overrides
  );
}
