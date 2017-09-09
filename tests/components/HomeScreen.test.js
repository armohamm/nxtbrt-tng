import React from 'react';
import {shallow} from 'enzyme';

import HomeScreen from '../../src/components/HomeScreen';

describe('HomeScreen', function () {
  it('renders a list of stations', () => {
    const stations = [{name:'a'},{name:'b'},{name:'c'}];
    const component = shallow( <HomeScreen stations={stations} /> );
    expect(component.find('Station')).toHaveLength(3);
    expect(component.find('Station').at(0)).toHaveProp('station',stations[0]);
  });
});
