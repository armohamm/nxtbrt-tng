import { combineReducers } from 'redux';

import stations from '../ducks/stations';
import station from '../ducks/station';

export default combineReducers({
  station,
  stations
});
