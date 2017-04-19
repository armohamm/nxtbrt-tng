import React from 'react';
import {mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';

import StationEtds from '../../src/components/StationEtds';

describe('StationEtds', function () {
  it('renders loading treatment initially', function () {
    const dummyEtdFetcher = function(){ 
      return Promise.resolve({});
    };
    const station = {
      name: 'The Station'
    };
    const result = renderStationsEtds({station});

    const loading = result.find('.station-screen');
    expect(loading.exists());
    //console.log(result);
  });

  xtest('fetches etds', function () {
  });
});

function renderStationsEtds(props){
  return mount(
    <BrowserRouter>
      <StationEtds {...props} />
    </BrowserRouter>
  );
}
