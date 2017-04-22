import React from 'react';
import {shallow} from 'enzyme';

import Estimate from '../../src/components/Estimate';

describe('Estimate', function () {
  test('has correct class names', function () {
    const etd = createEtd({
      lineColor: 'some-color'
    });
    const result = shallow(<Estimate etd={etd}/>);
    expect(result).toHaveClassName('etds-list__etd');
    expect(result).toHaveClassName('-line-some-color');
  });


  describe('label', function () {
    test('2 mins', function () {
      const etd = createEtd({
        minutes: 2,
        dest: {
          name: 'Morden'
        }
      });
      const result = shallow(<Estimate etd={etd}/>);
      expect(result).toHaveText('Morden: 2 mins');
    });

    test('1 min', function () {
      const etd = createEtd({
        minutes: 1,
        dest: {
          name: 'Morden'
        }
      });
      const result = shallow(<Estimate etd={etd}/>);
      expect(result).toHaveText('Morden: 1 min');
    });

    test('now', function () {
      const etd = createEtd({
        minutes: 0,
        dest: {
          name: 'Morden'
        }
      });
      const result = shallow(<Estimate etd={etd}/>);
      expect(result).toHaveText('Morden: now');
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
