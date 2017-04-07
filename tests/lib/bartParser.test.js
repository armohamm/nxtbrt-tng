import {parseEtds} from "../../src/lib/bartParser";

import {ETD_RESPONSE} from '../fixtures';

describe('bartParser#parseEtds', function () {
  const result = parseEtds(ETD_RESPONSE);

  test('it returns an array with the correct number of etds', function () {
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveProperty('length',9);
  });

  test('first etd looks correct', function () {
    const firstEtd = result[0];
    expect(firstEtd).toHaveProperty('minutes',7);
    expect(firstEtd).toHaveProperty('lineColor','red');
    expect(firstEtd).toHaveProperty('length',10);
    expect(firstEtd).toHaveProperty('dest');
    expect(firstEtd).toHaveProperty('dest.abbr','MLBR');
    expect(firstEtd).toHaveProperty('dest.name','Millbrae');
  });
  
});
